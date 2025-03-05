import { useState, MouseEvent } from 'react';
import type { Editor } from '@tiptap/react';

const useEditorLinkState = () => {
  const [linkUrl, setLinkUrl] = useState('');
  const [hasPreviousUrl, setHasPreviousUrl] = useState(false);
  const [openInNewTab, setOpenInNewTab] = useState(true);

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
