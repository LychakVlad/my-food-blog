import '@styles/global.css';
import { Children } from 'react';

export const metadata = {
  title: "Cook's Compass",
  description: 'Navigating the Culinary World',
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <div className="main">
          <div className="gradient" />
        </div>
        <main className="app">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
