import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import PageLink from './PageLink';
import AnchorLink from './AnchorLink';
import Image from 'next/image';

const NavBar = () => {
  const { user, isLoading } = useUser();

  return (
    <div className="z-50 relative" data-testid="navbar">
      <nav className="container mx-auto px-2 flex items-center justify-between py-4">
        <div className="flex items-center">
          <PageLink href="/" className="text-xl md:text-3xl font-bold text-white" testId="navbar-home">
            WeatherApp
          </PageLink>
        </div>
        <div
        >
          <ul className="md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {user && (
              <>
                <li>
                  <PageLink href="/csr" className="text-gray-700 hover:text-gray-900" testId="navbar-csr">
                    Client-side Rendered
                  </PageLink>
                </li>
                <li>
                  <PageLink href="/ssr" className="text-gray-700 hover:text-gray-900" testId="navbar-ssr">
                    Server-side Rendered
                  </PageLink>
                </li>
                <li>
                  <PageLink href="/external" className="text-gray-700 hover:text-gray-900" testId="navbar-external">
                    External API
                  </PageLink>
                </li>
              </>
            )}
            {!isLoading && !user && (
              <li>
                <AnchorLink
                  href="/api/auth/login"
                  className="text-white text-lg md:text-2xl font-bold bg-gray-600 px-4 py-2 rounded-md md:hover:bg-blue-400"
                  testId="navbar-login"
                >
                  Join
                </AnchorLink>
              </li>
            )}
            {user && (
              <li className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <Image
                    src={user.picture}
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                    data-testid="navbar-picture"
                  />
                  <span>{user.name}</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <ul className="absolute right-0 mt-2 bg-white shadow-lg rounded-md text-gray-700">
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <PageLink href="/profile" testId="navbar-profile">
                      Profile
                    </PageLink>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <AnchorLink href="/api/auth/logout" testId="navbar-logout">
                      Log out
                    </AnchorLink>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
