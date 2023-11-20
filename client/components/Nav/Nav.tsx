'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import logoPic from '/assets/icons/logo.svg';

const Nav = () => {
  const { data: session } = useSession();
  const [toggleDropdown, setToggleDropdown] = useState(false);

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
          src={logoPic}
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
            {
              <Link href="/login" className="black_btn">
                Log in
              </Link>
            }
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
