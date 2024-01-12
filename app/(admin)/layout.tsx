import "../globals.css";
import type { Metadata } from "next";
import { K2D } from "next/font/google";
import Layout from "@/components/defaultLayout";

const inter = K2D({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Next.js Backoffice",
  description: "Next.js Backoffice",
  icons: {
    icon: '/admin/favicon.ico',
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="mytheme" lang="en">
      <body className={inter.className}>
        <>
          <div>
            <Layout>{children}</Layout>
          </div>
        </>
      </body>
    </html>
  );
}
