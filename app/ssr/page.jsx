'use client';

import React from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Highlight from '../../components/Highlight';
import Spinner from '../../components/Spinner';

const SSRPage = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <Spinner />;
  if (!user) return <p>You must be logged in to view this page.</p>;

  return (
    <>
      <div className="mb-5" data-testid="ssr">
        <h1 data-testid="ssr-title">Server-side Rendered Page</h1>
        <div data-testid="ssr-text">
          <p>
            You can protect a server-side rendered page by wrapping it with <code>withPageAuthRequired</code>. Only
            logged-in users will be able to access it. If the user is logged out, they will be redirected to the login
            page instead.
          </p>
        </div>
      </div>
      <div className="result-block-container" data-testid="ssr-json">
        <div className="result-block">
          <h6 className="muted">User</h6>
          <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
        </div>
      </div>
    </>
  );
};

export default SSRPage;
