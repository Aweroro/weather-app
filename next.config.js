module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'openweathermap.org',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.auth0.com',
        pathname: '/**',
      },
    ],
  },
  poweredByHeader: false,
};
