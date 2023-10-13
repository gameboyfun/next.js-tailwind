import { useEffect, useState, useRef } from "react";
import Footer from "./footer";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import { useStore } from "../app/store";
import Link from "next/link";
import nav from "@/nav";
import Header from "./header";
import { NavItem } from "@/models/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const getMe = useStore((state) => state.getMe);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

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
                        {/* level 1 + children */}
                        <summary className="hover:bg-primary">
                          <FontAwesomeIcon icon={data.icon} />
                          {data.name}
                        </summary>
                        <ul>
                          {data.children.map((data: NavItem) => {
                            if (data?.children) {
                              return (
                                <li key={data.url}>
                                  <details>
                                    <summary className="hover:bg-primary">
                                      <FontAwesomeIcon icon={data.icon} />
                                      {data.name}
                                    </summary>
                                    <ul>
                                      {data.children.map((data) => {
                                        return (
                                          <li
                                            key={data.url}
                                            className={
                                              pathname.includes(data.url)
                                                ? `bg-primary-focus hover:bg-primary rounded-md`
                                                : `hover:bg-primary rounded-md`
                                            }
                                          >
                                            <Link href={data.url}>
                                              <FontAwesomeIcon
                                                icon={data.icon}
                                              />
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
                              // level 2 no children
                              return (
                                <li
                                  key={data.url}
                                  className={
                                    pathname.includes(data.url)
                                      ? `bg-primary-focus hover:bg-primary rounded-md`
                                      : `hover:bg-primary rounded-md`
                                  }
                                >
                                  <Link href={data.url}>
                                    <FontAwesomeIcon icon={data.icon} />
                                    {data.name}
                                  </Link>
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
                    // level 1 no children
                    <li
                      key={data.url}
                      className={
                        data.url === pathname ||
                        (data.url !== `/` && pathname.includes(data.url))
                          ? `bg-primary-focus hover:bg-primary rounded-md`
                          : `hover:bg-primary rounded-md`
                      }
                    >
                      <Link href={data.url}>
                        <FontAwesomeIcon icon={data.icon} />
                        {data.name}
                      </Link>
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
