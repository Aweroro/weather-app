'use client';
import './globals.css';
import NavBar from '../components/NavBar';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='lg:fixed w-full'>
        <UserProvider>
          <div className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <Image
                src="/assets/bg-image6.jpg"
                alt="Background"
                className="w-full h-full"
                fill
              />
            </div>
          <main id="app" className="flex flex-col min-h-screen">
            <NavBar />
              <div className="flex-grow mt-24">{children}</div>
          </main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
