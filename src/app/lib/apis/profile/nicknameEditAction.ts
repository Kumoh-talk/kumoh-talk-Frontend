import { FormEvent } from 'react';
import { patchUserNickname } from './myProfile';

export default async function nicknameEditAction(
  e: FormEvent<HTMLFormElement>
) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const newNickname = formData.get('nickname')?.toString().trim() || '';

  if (!newNickname) {
    return;
  }

  const response = await patchUserNickname(newNickname);
  window.location.reload();
}
