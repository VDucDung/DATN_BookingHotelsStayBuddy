"use client";

import './globals.css';
import 'antd/dist/reset.css';
import { Inter } from "next/font/google";
import Providers from '@/redux/provider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ToastProvider from '@/components/toast';
import AppHeader from '@/components/header';
import AppFooter from '@/components/footer';
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from '@/reactQuery/reactQueryClient';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
            <Providers>
            <QueryClientProvider client={queryClient}>
                <div className="flex flex-col min-h-screen">
                  <AppHeader />
                  <main className='flex-grow'>
                    {children}
                  </main>
                  <AppFooter />
                </div>
              </QueryClientProvider>
            </Providers>
          </GoogleOAuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
