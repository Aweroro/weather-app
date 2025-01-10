
import React from 'react';
import Image from 'next/image';
import {getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(
    async function MainPage() {
      //const { user } = await getSession();
      return (
        <div>
          Hey
        </div>
      );
    },
    { returnTo: '/main' }
  );
