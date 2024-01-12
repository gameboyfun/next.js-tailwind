"use client";
import axiosInstance from "../../../axiosInstance";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginModel, LoginResponse } from "@/models/login";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import Swal from "sweetalert2";
import { useStore } from "../../store";
import { AxiosError, AxiosResponse } from "axios";
import { Button, Input } from "@nextui-org/react";
import { faEnvelope, faKey } from "@fortawesome/free-solid-svg-icons";
import SwalModal from "@/public/constants/sweetAlertConfig";

export default function Login() {
  const router = useRouter();
  const login = useStore((state) => state.login);
  const [formData, setFormData] = useState<LoginModel>({
    email: "",
    password: "",
  });
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const validateEmail = (value: string) =>
    value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

  const isInvalid = useMemo(() => {
    if (formData.email === "") return false;

    return validateEmail(formData.email) ? false : true;
  }, [formData.email]);

  const checkToken = () => {
    if (localStorage.getItem("accessToken")) {
      router.push("/");
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState: LoginModel) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const showPassword = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShow((prev) => !prev);
  };

  const onLogin = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    login(formData)
      .then((response: AxiosResponse<LoginResponse>) => {
        if (response) {
          router.push("/");
        }
      })
      .catch((error: AxiosError<any>) => {
        setIsLoading(false);
        SwalModal({
          title: "เกิดข้อผิดพลาด",
          text: error.response?.data?.message,
          icon: "error",
        })();
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      <div className="loginPage flex justify-center items-center">
        <div className="shadow-2xl p-5 border border-form rounded max-w-[400px] bg-white flex flex-col items-center">
          <Image
            src="/admin/logo.jpg"
            width={500}
            height={500}
            alt="Picture of the author"
            className="w-3/4 mb-5"
            priority={true}
          />
          <form className="w-full" onSubmit={onLogin}>
            <Input
              variant="bordered"
              color={isInvalid ? "danger" : "primary"}
              className="w-full mb-2"
              name="email"
              placeholder="อีเมล"
              onChange={handleInput}
              value={formData.email || ""}
              required
              startContent={
                <FontAwesomeIcon className="text-secondary" icon={faEnvelope} />
              }
              type="email"
              isRequired
              isInvalid={isInvalid}
              errorMessage={isInvalid && "กรุณากรอกอีเมลให้ถูกต้อง"}
            />
            <Input
              variant="bordered"
              color="primary"
              className="w-full mb-2"
              name="password"
              placeholder="รหัสผ่าน"
              onChange={handleInput}
              value={formData.password || ""}
              startContent={
                <FontAwesomeIcon className="text-secondary" icon={faKey} />
              }
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={showPassword}
                >
                  <FontAwesomeIcon icon={show ? faEye : faEyeSlash} />
                </button>
              }
              type={show ? "text" : "password"}
              isRequired
            />
            <Button
              type="submit"
              radius="full"
              color="primary"
              className="w-full"
              isLoading={isLoading}
              isDisabled={formData.email && formData.password ? false : true}
            >
              เข้าสู่ระบบ
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
