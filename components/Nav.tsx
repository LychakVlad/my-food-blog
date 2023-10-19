'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

type ProviderResponse = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState<ProviderResponse>(null);
  const [toggleDropdown, settoggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response: ProviderResponse = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  const handleSignOutClick = async () => {
    try {
      console.log('lol');
      const response = await signOut();
      return response;
    } catch (error) {
      console.log(`Failed to sign out, ${error}`);
    }
  };

  return (
    <nav className="flex-between w-full mb-5 mt-5 ">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src={'/assets/icons/logo.svg'}
          width={36}
          height={36}
          className="rounded-full"
          alt="logo"
        ></Image>
        <p className="logo_text"> Cook's Compass</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-recipe" className="black_btn">
              Create new recipe
            </Link>
            <button
              type="button"
              onClick={handleSignOutClick}
              className="outline_btn"
            >
              Sign out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
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
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            {' '}
            <Image
              src={session?.user.image}
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
