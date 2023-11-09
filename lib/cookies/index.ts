import Cookie from 'js-cookie';

type Req = { headers: { cookie: string } };

export const setCookie = (key: string, value: string) => {
  Cookie.set(key, value, {
    sameSite: 'strict',
    expires: 1
  });
};

export const getCookie = (key: string, req?: Req): string => {
  const cookieFromServer = getCookieFromServer(key);
  const cookieBrowser = Cookie.get(key) || '';
  return cookieFromServer ? cookieFromServer : cookieBrowser;
};

const getCookieFromServer = (key: string, req?: Req) => {
  if (!req) {
    return undefined;
  }
  const rawCookie = req.headers.cookie
    .split(';')
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split('=')[1];
};
