import { useState, useEffect, MouseEvent } from 'react';
import { getMetadata } from '../../apis/post/getMetadata';
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

  const deleteLinkPreviewNodes = (targetUrl: string) => {
    editor.commands.command(({ tr, state, dispatch }) => {
      let deleted = false;

      state.doc.descendants((node, pos) => {
        if (
          node.type.name === 'linkPreviewNode' &&
          node.attrs.requestedUrl === targetUrl
        ) {
          if (dispatch) {
            tr.delete(pos, pos + node.nodeSize);
          }
          deleted = true;
        }
      });

      return deleted;
    });
  };

  const insertLinkPreview = async () => {
    try {
      const linkPreview = {
        type: 'linkPreviewNode',
        attrs: {
          isLoading: true,
          requestedUrl: linkUrl,
        },
      };

      editor.commands.insertContent(linkPreview);

      const ogData = await getMetadata(linkUrl);
      if (!ogData) return;

      editor.commands.updateAttributes('linkPreviewNode', {
        ...ogData,
        isLoading: false,
      });
    } catch (error) {
      console.error(error);
      deleteLinkPreviewNodes(linkUrl);
    }
  };

  const setLink = (e: MouseEvent, callback?: () => void) => {
    e.preventDefault();

    const isTextSelected = editor.state.selection.empty;

    if (isTextSelected) {
      setLinkWithText();
    } else {
      setLinkAtText();
    }

    insertLinkPreview();

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
