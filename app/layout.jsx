'use client';
import './globals.css';
import NavBar from '../components/NavBar';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <UserProvider>
          <div className="fixed inset-0 -z-10">
            <Image
              src="/assets/bg-image6.jpg"
              alt="Background"
              className="object-cover w-full h-full"
              fill
            />
          </div>
          <main id="app" className="relative flex flex-col min-h-screen">
            <NavBar />
            <div className="flex-grow mt-4">{children}</div>
          </main>
        </UserProvider>
      </body>
    </html>
  );
}
