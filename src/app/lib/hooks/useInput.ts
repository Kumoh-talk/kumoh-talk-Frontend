import { useState, useCallback, ChangeEvent } from 'react';

function useInput<T extends { [key: string]: any }>(): [ T, (e: ChangeEvent<HTMLInputElement>) => void ] {
  const [ content, setContent ] = useState<T>({} as T);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContent(content => ({ ...content, [name]: value }));
  }, []);

  return [ content, onChange ];
}

export default useInput;
