"use client";
import { useEffect, useState } from "react";
import { useStore } from "../store";
import axiosInstance from "@/axiosInstance";
import { profileModel } from "@/models/profile";

export default function Profile() {
  const getMe = useStore((state) => state.getMe);
  const [user, setUser] = useState<profileModel | null>(null);

  useEffect(() => {
    return () => {
      axiosInstance.get("/api/auth/me").then((response) => {
        setUser(response.data);
      });
    };
  }, []);

  return (
    <div className="max-w-none prose overflow-x-auto mb-3 pt-2">
      <h2 className="border-b-2 pb-2 mb-2">ข้อมูลเจ้าหน้าที่</h2>
      <div className="lg:w-1/2 flex flex-row flex-wrap">
        <div className="w-full lg:w-1/2">
          <h4 className="font-extrabold">ชื่อ</h4>
          <div className="break-words">{user?.firstName || "-"}</div>
        </div>
        <div className="w-full lg:w-1/2">
          <h4>นามสกุล</h4>
          <div className="break-words">{user?.lastName || "-"}</div>
        </div>
        <div className="w-full lg:w-1/2">
          <h4>อีเมล</h4>
          <div className="break-words">{user?.email || "-"}</div>
        </div>
        <div className="w-full lg:w-1/2">
          <h4>เบอร์โทร</h4>
          <div className="break-words">{user?.tel || "-"}</div>
        </div>
        <div className="w-full">
          <h4>ตำแหน่ง</h4>
          <div className="break-words">{user?.position?.name || "-"}</div>
        </div>
        <div className="w-full">
          <h4>กลุ่มผู้ใช้งาน</h4>
          <div className="break-words">{user?.roleGroup?.name || "-"}</div>
        </div>
      </div>
    </div>
  );
}
