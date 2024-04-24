import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { UserStoreProvider } from "@/entities/user";

import "./globals.css";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const AppLayout = dynamic(() => import("@/widgets/layouts/app-layout"));

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <UserStoreProvider>
          <AppLayout>{children}</AppLayout>
        </UserStoreProvider>

        <div id="portal"></div>
      </body>
    </html>
  );
}
