"use client";
import axiosInstance from "../../axiosInstance";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Login } from "@/models/login";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import { useStore } from "../store";

export default function Login() {
  const router = useRouter();
  const login = useStore((state) => state.login);
  const [formData, setFormData] = useState<Login>({
    email: null,
    password: null,
  });
  const [show, setShow] = useState<Boolean>(false);

  const checkToken = () => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState: Login) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const showPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow(!show);
  };

  const onLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(formData)
      .then((response: any) => {
        if (response) {
          router.push("/");
        }
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
      checkToken();
    };
  }, []);

  return (
    <div className="loginPage flex justify-center items-center">
      <div className="shadow-2xl p-5 border border-form rounded max-w-[400px]">
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            width={500}
            height={500}
            alt="Picture of the author"
            className="w-3/4 mb-2"
          />
        </div>
        <form onSubmit={onLogin}>
          <input
            type="email"
            className="input input-bordered w-full mb-2 focus:input-primary bg-white"
            name="email"
            onChange={handleInput}
            required
            placeholder="อีเมล"
          />
          <div className="input-group">
            <input
              type={show ? "text" : "password"}
              placeholder="รหัสผ่าน"
              className="input input-bordered w-full mb-2 focus:input-primary focus:border-r-1 border-r-0 bg-white"
              name="password"
              required
              onChange={handleInput}
            />
            <button
              type="button"
              className="btn btn-square btn-outline border-l-0 border-[#D1CFCD] hover:bg-white hover:border-[#D1CFCD] hover:text-black"
              onClick={showPassword}
            >
              <FontAwesomeIcon icon={!show ? faEyeSlash : faEye} />
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block rounded-full"
          >
            เข้าสู่ระบบ
          </button>
        </form>
      </div>
    </div>
  );
}
