'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    console.log(isUserLoggedIn);
    setProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        Logo
        <p className="logo_text"> Cook's Compass</p>
      </Link>
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-recipe" className="black_btn">
              Create new recipe
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/profile.svg"
                width={36}
                height={36}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                ></button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {isUserLoggedIn ? (
          <div className="flex">
            {' '}
            <Image
              src="/assets/images/profile.svg"
              width={36}
              height={36}
              className="rounded-full"
              alt="profile"
              onClick={() => settoggleDropdown((prev) => !prev)}
            />
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-recipe"
                  className="dropdown_link"
                  onClick={() => settoggleDropdown(false)}
                >
                  Create recipe
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    settoggleDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
