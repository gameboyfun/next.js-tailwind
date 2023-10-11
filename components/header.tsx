import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowRightFromBracket,
  faBars,
  faXmark,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useStore } from "../app/store";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { HeaderPropModel } from "@/models/header";

export default function Header({
  sidebarOpen,
  toggleSidebar,
}: HeaderPropModel) {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const logout = useStore((state) => state.logout);

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

  return (
    <nav className="bg-primary pr-2">
      <div className="flex items-center h-[100px] shadow-md">
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
                <Link href={"/change-password"}>
                  <FontAwesomeIcon icon={faKey} /> เปลี่ยนรหัสผ่าน
                </Link>
              </li>
              <li>
                <a onClick={onLogout}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> ออกจากระบบ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
