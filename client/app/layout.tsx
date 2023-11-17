import React from 'react';
import Nav from '../components/Nav/Nav';
import Provider from '../components/Provider/Provider';
import '../styles/global.css';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';
import { authOptions } from './api/auth/[...nextauth]/route';

export const metadata: Metadata = {
  title: "Cook's Compass",
  description: 'Navigating the Culinary World',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="h-full">
      <body suppressHydrationWarning={true} className="h-full scroll-smooth">
        <Provider session={session}>
          <main className="app h-full">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
