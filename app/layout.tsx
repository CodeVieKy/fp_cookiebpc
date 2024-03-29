import './globals.scss';
import { Roboto_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { ReactNode } from 'react';
import { getUserBySessionToken } from '../database/users';
import style from './layout.module.scss';
import { LogoutButton } from './LogoutButton';

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: { default: 'Cookie Byte | NoTime', template: '%s | NoTime' },
  description: 'Crumble your own Cookie',
};

type Props = {
  children: ReactNode;
};

export default async function RootLayout({ children }: Props) {
  // 1. get the session token from the cookie
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en" className={robotoMono.className}>
      <body style={{ backgroundColor: 'rgb(0, 31, 57)' }}>
        <nav className={style.navigator}>
          <div>
            <Link href="/">home</Link>
            <div>
              <Link href="/baker">Baker</Link>
            </div>
          </div>
          <div>
            {user ? (
              <>
                <div>{user.username}</div>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link href="/register">register</Link>
                <Link href="/login">login</Link>
              </>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
