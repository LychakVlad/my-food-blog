import { FC, PropsWithChildren } from 'react';
import Nav from '../components/Nav';
import Provider from '../components/Provider';
import '../styles/global.css';

export const metadata = {
  title: "Cook's Compass",
  description: 'Navigating the Culinary World',
};

const RootLayout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
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
};

export default RootLayout;
