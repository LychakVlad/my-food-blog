import React, { FC, PropsWithChildren } from 'react';
import Nav from '../components/Nav';
import Provider from '../components/Provider';
import '../styles/global.css';
import { SessionProvider } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Cook's Compass",
  description: 'Navigating the Culinary World',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let session;

  async function getSessionFunction() {
    session = await getServerSession();
  }

  getSessionFunction();

  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
