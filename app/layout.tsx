import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar/Navbar';

export const metadata: Metadata = {
  title: 'MOTIONVERSE | We Make Brands Move',
  description:
    'Premium creative video advertising agency. We create cinematic brand commercials, product ads, and corporate films.',
  keywords: [
    'video advertising agency',
    'brand commercials',
    'product ads',
    'corporate films',
    'motion graphics',
    'cinematic ads',
    'creative agency',
    'video production',
    'brand storytelling',
    'MOTIONVERSE',
  ],
  openGraph: {
    title: 'MOTIONVERSE | We Make Brands Move',
    description:
      'Premium creative video advertising agency. We create cinematic brand commercials, product ads, and corporate films.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOTIONVERSE | We Make Brands Move',
    description:
      'Premium creative video advertising agency. We create cinematic brand commercials, product ads, and corporate films.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
