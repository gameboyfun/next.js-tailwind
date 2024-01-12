import "../../globals.css";
import type { Metadata } from "next";
import { K2D } from "next/font/google";

const inter = K2D({
  subsets: ["latin"],
  weight: "400",
});

// export const metadata: Metadata = {
//   title: "DTN | Service",
//   description: "DTN Backoffice",
//   icons: {
//     icon: '/admin/favicon.ico',
//   },
// };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    {children}
    </>
  );
}
