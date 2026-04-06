import './global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

const siteUrl = 'https://open-swaggo.andrianprasetya.com';
const siteName = 'OPEN SWAGGO';
const siteDescription =
  'Beautiful OpenAPI documentation for Go web frameworks. Supports Chi, Gin, Echo, Fiber, and net/http.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
  },
  title: {
    default: 'OPEN SWAGGO — OpenApi for Go',
    template: '%s | OPEN SWAGGO',
  },
  description: siteDescription,
  keywords: [
    'OpenAPI',
    'Swagger',
    'Go',
    'Golang',
    'API documentation',
    'Scalar',
    'Chi',
    'Gin',
    'Echo',
    'Fiber',
    'net/http',
    'open-swag-go',
  ],
  authors: [{ name: 'Andrian Prasetya' }],
  creator: 'Andrian Prasetya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: 'OPEN SWAGGO — OpenApi for Go',
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPEN SWAGGO — OpenApi for Go',
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
