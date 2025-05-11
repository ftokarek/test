import { Outfit } from 'next/font/google';
import './globals.css';
import { AppContextProvider } from '@/context/AppContext';
import { Toaster } from 'react-hot-toast';
import GridBackground from '@/components/GridBackground';
import { ClerkProvider } from '@clerk/nextjs';
import { Analytics } from '@vercel/analytics/next';

const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '500'] });

export const metadata = {
  title: 'NeuroSphere - AI Marketplace',
  description: 'Decentralized AI Marketplace on Solana',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} antialiased text-gray-700`}
          suppressHydrationWarning={true}
        >
          <Toaster />
          <AppContextProvider>
            <GridBackground className="min-h-screen fixed inset-0 -z-10">
              <div className="hidden"></div>
            </GridBackground>
            <Analytics />
            {children}
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
