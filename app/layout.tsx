"use client";
import "./globals.css";
import type { Metadata } from "next";
import { K2D } from "next/font/google";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import Layout from "@/components/defaultLayout";

const inter = K2D({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "DTN Backoffice",
  description: "DTN Backoffice",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentPage = usePathname();

  return (
    <html data-theme="mytheme" lang="en">
      <body className={inter.className}>
        <>
          {currentPage === "/login" ? (
            <div>
              {children}
              <Footer />
            </div>
          ) : (
            <>
              <div>
                <Layout>{children}</Layout>
              </div>
            </>
          )}
        </>
      </body>
    </html>
  );
}
