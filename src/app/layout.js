import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

import { getGlobalData } from "@/data/loaders";
import { Header } from "@/components/custom/Header";
import { BottomNav } from "@/components/custom/BottomNav";
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Diggin",
  description: "Dig your own hole",
};

export default async function RootLayout({
  children,
}) {
  const globalData = await getGlobalData();
  console.dir(globalData, { depth: null });
  return (
    <html lang="en">
      <body className="bg-black">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
            <Header data={globalData.header} />
            <div className="lg:border w-full max-w-screen-lg mx-auto">{children}</div>
            <BottomNav></BottomNav>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

