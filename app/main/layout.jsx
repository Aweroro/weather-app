'use client'
import NavBar from '../../components/NavBar';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function RootLayout({ children }) {
  return (
      <div className="h-full">
        <UserProvider>
          <div className="fixed inset-0 -z-10">
            <Image
              src="/assets/bg-image3.jpg"
              alt="Background"
              className="w-full h-full"
              fill
            />
          </div>
          <main id="app" className="relative flex flex-col min-h-screen">
            <div className="flex-grow mt-4 md:mt-12">{children}</div>
          </main>
        </UserProvider>
      </div>
  );
}
