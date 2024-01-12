import "../globals.css";
import type { Metadata } from "next";
import { K2D } from "next/font/google";
import Footer from "@/components/footer";

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

export default function FullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html data-theme="mytheme" lang="en">
      <body className={inter.className}>
        <>
          <div>
            {children}
            <Footer />
          </div>
        </>
      </body>
    </html>
  );
}
