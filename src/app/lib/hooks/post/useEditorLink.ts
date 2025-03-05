import { useState, useEffect, MouseEvent } from 'react';
import type { Editor } from '@tiptap/react';

const useEditorLinkState = (editor: Editor) => {
  const [linkUrl, setLinkUrl] = useState('');
  const [hasPreviousUrl, setHasPreviousUrl] = useState(false);
  const [openInNewTab, setOpenInNewTab] = useState(true);

  useEffect(() => {
    const attributes = editor.getAttributes('link') || {};

    setLinkUrl(attributes.href || '');
    setHasPreviousUrl(!!attributes.href);
    setOpenInNewTab(!!attributes.target);
  }, [editor]);

  return { linkUrl, setLinkUrl, hasPreviousUrl, openInNewTab, setOpenInNewTab };
};

const useEditorLinkActions = (
  editor: Editor,
  linkUrl: string,
  openInNewTab: boolean
) => {
  const setLink = (e: MouseEvent) => {
    e.preventDefault();

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

  return { setLink };
};

export { useEditorLinkState, useEditorLinkActions };
