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
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const setUpProviders = async () => {
      const response: ProviderResponse = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  }, []);

  const handleToggle = () => {
    setToggleDropdown(!toggleDropdown);
  };

  const handleSignOutClick = async () => {
    try {
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
        <p className="logo_text sm:block hidden"> Cook's Compass</p>
      </Link>
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex ">
            <Link href="/create-recipe" className="black_btn mr-4">
              Create new recipe
            </Link>
            <Link href="/profile" className="black_btn mr-4">
              Profile
            </Link>
            <button
              type="button"
              onClick={handleSignOutClick}
              className="outline_btn"
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <Link href="/sign-up" className="black_btn mr-4">
              Sign up
            </Link>
            <Link href="/login" className="black_btn">
              Log in
            </Link>
          </>
        )}
      </div>
      <div className="sm:hidden flex relative ">
        {session?.user ? (
          <div className="flex">
            <div onClick={handleToggle}>Menu</div>
            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/create-recipe"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  Create recipe
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    signOut();
                  }}
                  className="mt-4 w-full black_btn"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers && (
              <Link href="/login" className="black_btn">
                Log in
              </Link>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
