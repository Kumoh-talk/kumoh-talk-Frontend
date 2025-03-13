export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );

  return JSON.parse(jsonPayload) as {
    USER_ID: number;
    USER_ROLE: 'ROLE_GUEST' | 'ROLE_USER' | 'ROLE_ACTIVE_USER' | 'ROLE_ADMIN';
    iat: number;
    exp: number;
  };
};

export const getCookie = (cookies: string, cookieName: string) => {
  const cookieArray = cookies?.split(';') || [];
  for (const cookie of cookieArray) {
    const [name, value] = cookie.trim().split('=');
    if (name === cookieName) {
      return decodeURIComponent(value);
    }
  }
  return null;
};
