import { useState, useCallback, ChangeEvent } from 'react';

type ContentType = { [key: string]: any };

function useInputs<T extends ContentType>(initialContent: T) {
  const [content, setContent] = useState<T>(initialContent);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setContent((content) => ({ ...content, [name]: value }));
    },
    [content]
  );

  const reset = useCallback(() => setContent(initialContent), [initialContent]);

  return [content, onChange, reset] as const;
}

export default useInputs;
