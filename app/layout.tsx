import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Kolibrie Studio',
  description: 'Kolibrie: a small studio for scroll-stopping reels, films and motion.',
  openGraph: {
    title: 'Kolibrie Studio',
    description: 'Kolibrie: a small studio for scroll-stopping reels, films and motion.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kolibrie Studio',
    description: 'Kolibrie: a small studio for scroll-stopping reels, films and motion.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
