/** @type {import('next').NextConfig} */
const nextConfig = {
  // Completely block Supabase at the Next.js level
  async rewrites() {
    return [
      // Redirect all Supabase calls to a mock endpoint
      {
        source: '/rest/v1/:path*',
        destination: '/api/mock-supabase/:path*'
      },
      {
        source: '/auth/v1/:path*', 
        destination: '/api/mock-auth/:path*'
      },
      {
        source: '/storage/v1/:path*',
        destination: '/api/mock-storage/:path*'
      }
    ];
  },
  
  async headers() {
    return [
      {
        // Apply to all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "connect-src 'self' localhost:* 127.0.0.1:*",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "default-src 'self'",
              "img-src 'self' data: https:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'"
            ].join('; ')
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ];
  },
  
  // Webpack configuration to completely remove Supabase
  webpack: (config, { isServer }) => {
    // Add alias to replace Supabase imports with mocks
    config.resolve.alias = {
      ...config.resolve.alias,
      '@supabase/supabase-js': false,
      '@supabase/auth-helpers-nextjs': false,
      '@supabase/auth-helpers-react': false,
      '@supabase/auth-helpers-shared': false,
      '@supabase/postgrest-js': false,
      '@supabase/realtime-js': false,
      '@supabase/storage-js': false,
      '@supabase/gotrue-js': false,
    };
    
    // Define plugin to replace Supabase modules
    config.plugins.push(
      new (require('webpack').DefinePlugin)({
        'process.env.NEXT_PUBLIC_SUPABASE_URL': JSON.stringify(''),
        'process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY': JSON.stringify(''),
        'process.env.SUPABASE_URL': JSON.stringify(''),
        'process.env.SUPABASE_ANON_KEY': JSON.stringify(''),
        'process.env.SUPABASE_SERVICE_ROLE_KEY': JSON.stringify(''),
      })
    );
    
    return config;
  },
  
  // Environment variable overrides
  env: {
    NEXT_PUBLIC_SUPABASE_URL: '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: '',
    SUPABASE_URL: '',
    SUPABASE_ANON_KEY: '',
    SUPABASE_SERVICE_ROLE_KEY: '',
    NEXT_PUBLIC_DISABLE_SUPABASE: 'true',
    NEXT_PUBLIC_BLOCK_EXTERNAL_APIS: 'true'
  },
  
  // Additional configurations
  experimental: {
    // Disable any features that might cause issues
    optimizeCss: false,
    optimizePackageImports: []
  }
};

module.exports = nextConfig;
