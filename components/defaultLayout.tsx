import { useEffect, useState, useRef } from "react";
import Footer from "./footer";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useStore } from "../app/store";
import Link from "next/link";
import nav from "@/nav";
import Header from "./header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getMe = useStore((state) => state.getMe);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    return () => {
      getMe().catch((error: any) => {});
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Header sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (hidden on mobile and tablet) */}
        <aside
          className={`bg-white text-black ${
            sidebarOpen ? "w-[280px] shadow-md" : "w-0"
          } transition-width duration-300 ease-in-out overflow-y-auto`}
        >
          {/* Sidebar content */}
          <div className="flex flex-col">
            {/* Add your sidebar links here */}
            <ul className="menu w-full">
              {nav.items.map((data) => {
                if (data?.children) {
                  return (
                    <li key={data.url}>
                      <details>
                        <summary>{data.name}</summary>
                        <ul>
                          {data.children.map((data) => {
                            if (data?.children) {
                              return (
                                <li key={data.url}>
                                  <details>
                                    <summary>{data.name}</summary>
                                    <ul>
                                      {data.children.map((data) => {
                                        return (
                                          <li key={data.url}>
                                            <Link href={data.url}>
                                              {data.name}
                                            </Link>
                                          </li>
                                        );
                                      })}
                                    </ul>
                                  </details>
                                </li>
                              );
                            } else {
                              return (
                                <li key={data.url}>
                                  <Link href={data.url}>{data.name}</Link>
                                </li>
                              );
                            }
                          })}
                        </ul>
                      </details>
                    </li>
                  );
                } else {
                  return (
                    <li key={data.url}>
                      <Link href={data.url}>{data.name}</Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex flex-col flex-1 items-center overflow-y-auto">
          {/* Add your page content here */}
          <div className="container p-4 flex-grow">{children}</div>
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}
