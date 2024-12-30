'use client';

import './globals.css';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <div className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 -z-10">
              <img
                src="/assets/bg-image1.jpg"
                alt="Background"
                className="w-full h-full"
              />
            </div>
          <main id="app" className="flex flex-col min-h-screen">
            <NavBar />
              <div className="flex-grow mt-5">{children}</div>
            {/* <Footer /> */}
          </main>
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
