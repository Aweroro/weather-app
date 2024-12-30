'use client';

import React, { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import PageLink from './PageLink';
import AnchorLink from './AnchorLink';

const MainNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isLoading } = useUser();
  const toggle = () => {
    setIsOpen(!isOpen);
    console.log('Menu is open:', !isOpen);
  }

  return (
    <div className="z-10" data-testid="navbar">
      <nav className="container mx-auto flex items-center justify-between py-4">
        <div className="flex items-center">
          <PageLink href="/" className="text-3xl font-bold text-white" testId="navbar-home">
            WeatherApp
          </PageLink>
        </div>
        <button
          onClick={toggle}
          className="md:hidden text-gray-600 focus:outline-none"
          data-testid="navbar-toggle"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } absolute top-full left-0 w-full md:static md:block md:w-auto`}
        >
          <ul className="md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <PageLink href="/" className="text-white text-lg relative group" testId="navbar-home">
                Home
                <span className='absolute -bottom-2 left-0 block w-0 h-0.5 bg-blue-500 transition-all duration-500 group-hover:w-full'></span>
              </PageLink>
            </li>
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
                  className="text-white text-lg bg-gray-600 px-4 py-2 rounded-md hover:bg-blue-700"
                  testId="navbar-login"
                >
                  Log in
                </AnchorLink>
              </li>
            )}
            {user && (
              <li className="relative">
                <button className="flex items-center space-x-2 focus:outline-none">
                  <img
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

export default MainNavBar;
