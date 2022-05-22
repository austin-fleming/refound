import type { ReactNode } from 'react';
import { Header } from '../header';
import { NotificationRail } from '../notification-rail';

export const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main className='w-full bg-white min-h-screen' id='main-content'>
      {children}
    </main>
  </>
);
