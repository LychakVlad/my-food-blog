import Nav from '@components/Nav';
import '@styles/global.css';

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
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
