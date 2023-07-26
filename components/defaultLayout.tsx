import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "./footer";
import axiosInstance from "@/axiosInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useStore } from "../app/store";
import Link from "next/link";
import nav from "@/nav";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const getMe = useStore((state) => state.getMe);
  const logout = useStore((state) => state.logout);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const onLogout = (e: React.SyntheticEvent) => {
    e.preventDefault();
    logout()
      .then((response: any) => {
        router.push("/login");
      })
      .catch((error: any) => {
        Swal.fire({
          title: `เกิดข้อผิดพลาด`,
          text: error.response?.data?.message,
          icon: "error",
          confirmButtonText: `ตกลง`,
        });
      });
  };

  useEffect(() => {
    return () => {
      getMe().catch((error: any) => {});
    };
  }, []);

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <nav className="bg-primary pr-2">
        <div className="flex items-center h-[100px]">
          <a className="hidden lg:block btn btn-link no-underline hover:no-underline normal-case text-xl text-primary bg-white hover:bg-white h-full w-[280px] rounded-none px-0">
            <img
              src="/logo.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </a>
          <button
            className="text-white focus:outline-none mx-4"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon
              icon={sidebarOpen ? faXmark : faBars}
              className="fa-lg transition-transform duration-300"
            />
          </button>
          <div className="flex-none ml-auto">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost avatar">
                <div className="w-10 rounded-full">
                  <img src={user?.imageProfile} />
                </div>
                <span className="text-white">
                  {`${user?.firstName || ""} ${user?.lastName || ""}`}
                </span>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href={"/profile"}>
                    <FontAwesomeIcon icon={faUser} /> ข้อมูลผู้ใช้งาน
                  </Link>
                </li>
                <li>
                  <a onClick={onLogout}>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} />{" "}
                    ออกจากระบบ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (hidden on mobile and tablet) */}
        <aside
          className={`bg-white text-black ${
            sidebarOpen ? "w-[280px]" : "w-0"
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
