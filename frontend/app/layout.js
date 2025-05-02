import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import GridBackground from "@/components/GridBackground";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "NeuroSphere - AI Marketplace",
  description: "Decentralized AI Marketplace on Solana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased text-gray-700`}>
        <Toaster />
        <AppContextProvider>
          <GridBackground className="min-h-screen fixed inset-0 -z-10">
            <div className="hidden"></div>
          </GridBackground>
          {children}
        </AppContextProvider>
      </body>
    </html>
  );
}
