import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Providers from './Providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'INT308 Quiz App',
  description: 'Responsive quiz app generated from JSON question banks.'
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
