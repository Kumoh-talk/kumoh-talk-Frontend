import { useState } from 'react';

const useEditorLinkState = () => {
  const [linkUrl, setLinkUrl] = useState('');
  const [hasPreviousUrl, setHasPreviousUrl] = useState(false);
  const [openInNewTab, setOpenInNewTab] = useState(true);

  return { linkUrl, setLinkUrl, hasPreviousUrl, openInNewTab, setOpenInNewTab };
};

export { useEditorLinkState };
