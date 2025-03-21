import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { parseJwt } from '@/app/lib/apis/auth';

type UserRole =
  | 'ROLE_GUEST'
  | 'ROLE_USER'
  | 'ROLE_ACTIVE_USER'
  | 'ROLE_SEMINAR_WRITER'
  | 'ROLE_ADMIN';

interface CheckRoleProps {
  allowedRoles: UserRole[];
  shouldRedirect?: boolean;
  redirectTo?: string;
  onRoleMatched?: () => void;
  onRoleMismatch?: () => void;
}

const checkUserRole = ({
  allowedRoles,
  shouldRedirect = true,
  redirectTo = '/',
  onRoleMatched,
  onRoleMismatch,
}: CheckRoleProps) => {
  const accessToken = cookies().get('accessToken')?.value;

  if (!accessToken) {
    onRoleMismatch?.();

    if (shouldRedirect) {
      redirect('/');
    }

    return;
  }

  const userRole = parseJwt(accessToken).USER_ROLE;

  if (!allowedRoles.includes(userRole)) {
    onRoleMismatch?.();

    if (shouldRedirect) {
      redirect(redirectTo);
    }

    return;
  }

  onRoleMatched?.();
};

export default checkUserRole;
