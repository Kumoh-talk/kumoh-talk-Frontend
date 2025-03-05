import { useState, useEffect, MouseEvent } from 'react';
import type { Editor } from '@tiptap/react';

const useEditorLinkState = (editor: Editor) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [hasPreviousUrl, setHasPreviousUrl] = useState(false);
  const [openInNewTab, setOpenInNewTab] = useState(false);

  useEffect(() => {
    const attributes = editor.getAttributes('link') || {};

    setLinkUrl(attributes.href || '');
    setHasPreviousUrl(!!attributes.href);
    setOpenInNewTab(attributes.target === '_blank');
  }, [editor]);

  return { linkUrl, setLinkUrl, hasPreviousUrl, openInNewTab, setOpenInNewTab };
};

const useEditorLinkActions = (
  editor: Editor,
  linkUrl: string,
  openInNewTab: boolean
) => {
  const setLinkAtText = () => {
    const attrs = {
      href: linkUrl,
      target: openInNewTab ? '_blank' : '_self',
      rel: 'noopener noreferrer',
    };

    editor.chain().focus().extendMarkRange('link').setLink(attrs).run();
  };

  const setLinkWithText = () => {
    const attrs = {
      href: linkUrl,
      target: openInNewTab ? '_blank' : '_self',
      rel: 'noopener noreferrer',
    };

    const content = {
      type: 'text',
      text: linkUrl,
      marks: [
        {
          type: 'link',
          attrs,
        },
      ],
    };

    editor.chain().focus().insertContent(content).run();
  };

  const setLink = (e: MouseEvent, callback?: () => void) => {
    e.preventDefault();

    const isTextSelected = editor.state.selection.empty;

    if (isTextSelected) {
      setLinkWithText();
    } else {
      setLinkAtText();
    }

    if (callback) {
      callback();
    }
  };

  const unsetLink = (e: MouseEvent, callback?: () => void) => {
    e.preventDefault();

    editor.chain().focus().extendMarkRange('link').unsetLink().run();

    if (callback) {
      callback();
    }
  };

  return { setLink, unsetLink };
};

export { useEditorLinkState, useEditorLinkActions };
