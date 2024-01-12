"use client";
import { Key, useEffect, useState } from "react";
import { useStore } from "../../store";
import axiosInstance from "@/axiosInstance";
import { profileModel } from "@/models/profile";
import { SelectModel } from "@/models/select";
import { Status } from "@/models/common";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import NumberInput from "@/components/common/numberInput";

export default function Profile() {
  const getMe = useStore((state) => state.getMe);
  const [user, setUser] = useState<profileModel | null>(null);
  const [statusOption, setStatusOption] = useState<SelectModel<string>[]>(
    Object.keys(Status)
      .filter((v) => isNaN(Number(v)))
      .map((key) => ({
        text: key,
        value: Status[key as keyof typeof Status].toString(),
      }))
  );
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    // setQuery((prevState: queryEulaModel) => ({
    //   ...prevState,
    //   page: 1,
    //   [fieldName]: fieldValue,
    // }));
  };
  const handleAutocompleteSelectionChange = (
    fieldName: string,
    selectedKey: Key
  ) => {
    // setQuery((prevState: queryEulaModel) => ({
    //   ...prevState,
    //   [fieldName]: selectedKey,
    // }));
  };

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
        <div className="w-full">
          <h4>สถานะ</h4>
          <Autocomplete
            size="md"
            variant="bordered"
            color="primary"
            label="สถานะ"
            className="md:min-w-1/5 md:w-1/5 w-full myautocomplete rounded-xl shadow-md"
            onSelectionChange={(key: Key) =>
              handleAutocompleteSelectionChange("status", key)
            }
            onChange={handleInput}
            // selectedKey={FormData.status?.toString()}
            name="status"
            aria-label="status"
            defaultItems={statusOption}
          >
            {(status) => (
              <AutocompleteItem
                key={status.value || ""}
                textValue={status.text || ""}
                id={status.text}
              >
                <div className="!leading-7">{status.text}</div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className="w-full">
          <h4>number input</h4>
          <NumberInput
              name="score"
              // propValue={formData.score}
              variant="bordered"
              color="primary"
              className="w-full md:w-1/2 rounded-xl mb-2"
              onChange={handleInput}
              decimal={0}
              // isInvalid={formSubmit && !formData.score}
              // errorMessage={formSubmit && !formData.score && `กรุณากรอกคะแนนแสดงผล`}
            />
        </div>
      </div>
    </div>
  );
}
