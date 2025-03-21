import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

interface CheckLoginProps {
  shouldRedirect?: boolean;
  redirectTo?: string;
  onLoggedIn?: () => void;
  onLoggedOut?: () => void;
}

const checkLogin = ({
  shouldRedirect = false,
  redirectTo = '/',
  onLoggedIn,
  onLoggedOut,
}: CheckLoginProps) => {
  const isLoggedIn = !!cookies().get('accessToken')?.value;

  if (!isLoggedIn) {
    onLoggedOut?.();

    if (shouldRedirect) {
      redirect(redirectTo);
    }

    return false;
  }

  onLoggedIn?.();

  return true;
};

export default checkLogin;
