import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <div className="navbar bg-primary h-[100px] p-0 pr-2">
      <div className="flex-1 h-full">
        <a className="hidden lg:block btn btn-link no-underline hover:no-underline normal-case text-xl text-primary bg-white hover:bg-white h-full w-[280px] rounded-none px-0">
          <img
            src="/logo.png"
            alt="logo"
            className="w-full h-full object-contain"
          />
        </a>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <FontAwesomeIcon icon={faBars} className="fa-xl" />
        </label>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a>
                <FontAwesomeIcon icon={faUser} /> ข้อมูลผู้ใช้งาน
              </a>
            </li>
            <li>
              <a>
                <FontAwesomeIcon icon={faArrowRightFromBracket} /> ออกจากระบบ
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
