'use client';

import { UserInfo, UserInfoResponse } from '@/app/lib/types/user/userInfo';
import { createContext, useEffect, useState } from 'react';

export const userInfoContext = createContext<UserInfoResponse>({
  success: 'false',
  data: {
    id: 0,
    provider: 'GOOGLE',
    nickname: '',
    name: '',
    profileImageUrl: '',
    role: 'ROLE_GUEST',
    createdAt: '',
    updatedAt: '',
  },
});

export interface Props {
  children: React.ReactNode;
}

async function getUserInfo({
  setState,
}: {
  setState: React.Dispatch<React.SetStateAction<UserInfoResponse>>;
}) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${API_URL}/api/v1/users/me`);
    const result = await response.json();

    if (response.ok && 'success' in result && 'data' in result) {
      setState({ success: 'true', data: result.data });
    } else {
      console.error('Failed to fetch data: ', result);
      setState({ success: 'false', data: {} as UserInfo });
    }
  } catch (error) {
    console.error('Error fetching data: ', error);
    setState({ success: 'false', data: {} as UserInfo });
  }
}

export function UserInfoProvider({ children }: Props) {
  const [state, setState] = useState<UserInfoResponse>({
    success: 'false',
    data: {} as UserInfo,
  });

  useEffect(() => {
    getUserInfo({ setState });
  }, [setState]);

  return (
    <userInfoContext.Provider
      value={{ success: state.success, data: state.data }}
    >
      {children}
    </userInfoContext.Provider>
  );
}
