import type { ReactNode } from 'react';
import { Header } from '../header';

export const Layout = ({ children }: { children: ReactNode }) => (
<>
    <Header/>
    <main className='w-full bg-white' id='main-content'>
      {children}
    </main>
</>
);