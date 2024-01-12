"use client";
import axiosInstance from "@/axiosInstance";
import { PaginationModel } from "@/models/pagination";
import { queryLogsModel } from "@/models/logs";
import {
  faEye,
  faPenToSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AxiosError } from "axios";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Pagination,
  Tooltip,
} from "@nextui-org/react";
import { SelectModel } from "@/models/select";
import SwalModal from "@swalConfig/sweetAlertConfig";
import { eventMethodStatus } from "@/models/common";
export default function Logs() {
  const router = useRouter();
  const urlParam = useSearchParams();
  const [page, setPage] = useState<PaginationModel>({
    page: Number(urlParam.get("page")) || 1,
    size: 0,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const fields = ["ชื่อ", "กลุ่ม", "เมนู", "กิจกรรม", "วันที่และเวลา", ""];
  const [query, setQuery] = useState<queryLogsModel>({
    page: Number(urlParam.get("page")) || 1,
    query: urlParam.get("query") || "",
    userId: urlParam.get("userId") || "",
    userGroupId: urlParam.get("userGroupId") || "",
    menuId: urlParam.get("menuId") || "",
    eventType: urlParam.get("eventType") || "",
    startDate: urlParam.get("startDate") || null,
    endDate: urlParam.get("endDate") || null,
  });
  const [searchInput, setSearchInput] = useState(urlParam.get("query") || "");
  const [startDate, setStartDate] = useState(urlParam.get("startDate") || null);
  const [endDate, setEndDate] = useState(urlParam.get("endDate") || null);
  const [staffOption, setStaffOption] = useState<SelectModel<string>[]>([]);
  const [groupOption, setGroupOption] = useState<SelectModel<string>[]>([]);
  const [menuOption, setMenuOption] = useState<SelectModel<string>[]>([]);
  const [displayTime, setDisplayTime] = useState(false);

  const [eventOption, setEventOption] = useState<SelectModel<string>[]>(
    Object.keys(eventMethodStatus)
      // .filter((v) => isNaN(String(v)))
      .map((key) => ({
        text: key,
        value:
          eventMethodStatus[key as keyof typeof eventMethodStatus].toString(),
      }))
  );

  const handleDisplayTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Boolean(e.target.checked) === false) {
      setStartDate(null);
      setEndDate(null);
    }

    setDisplayTime(Boolean(e.target.checked));
  };

  useEffect(() => {
    handleRouteChange(query);
    fetchData(query);
    getMenu();
    getStaffgroup();
    getStaffUser();
  }, [
    query.page,
    query.query,
    query.userId,
    query.userGroupId,
    query.menuId,
    query.eventType,
    query.startDate,
    query.endDate,
  ]);

  const getMenu = async () => {
    let params = {
      size: 50,
    };
    await axiosInstance
      .get(`/api/menus`, { params })
      .then((response) => {
        let menus = response.data.map((data: any) => {
          return { text: data.name, value: data.id };
        });
        setMenuOption(menus);
      })
      .catch((error: AxiosError<any>) => {
        setLoading(false);
        SwalModal({
          title: "เกิดข้อผิดพลาด",
          text: error.response?.data?.message,
          icon: "error",
        })();
      });
  };
  const getStaffUser = async () => {
    let params = {
      size: 50,
    };
    await axiosInstance
      .get(`/api/staff-users`, { params })
      .then((response) => {
        let menus = response.data.entities.map((data: any) => {
          return { text: data?.firstName + data?.lastName, value: data.id };
        });
        setStaffOption(menus);
      })
      .catch((error: AxiosError<any>) => {
        setLoading(false);
        SwalModal({
          title: "เกิดข้อผิดพลาด",
          text: error.response?.data?.message,
          icon: "error",
        })();
      });
  };
  const getStaffgroup = async () => {
    let params = {
      size: 50,
    };
    await axiosInstance
      .get(`/api/staff-groups`, { params })
      .then((response) => {
        let groups = response.data.entities.map((data: any) => {
          return { text: data.name, value: data.id };
        });
        setGroupOption(groups);
      })
      .catch((error: AxiosError<any>) => {
        setLoading(false);
        SwalModal({
          title: "เกิดข้อผิดพลาด",
          text: error.response?.data?.message,
          icon: "error",
        })();
      });
  };
  const fetchData = async (query: queryLogsModel) => {
    setLoading(true);
    const params = {
      page: query.page,
      query: query.query || null,
      userId: query.userId || null,
      userGroupId: query.userGroupId || null,
      menuId: query.menuId || null,
      eventType: query.eventType || null,
      startDate: query.startDate ? moment(query.startDate).format() : null,
      endDate: query.endDate ? moment(query.endDate).format() : null,
    };
    await axiosInstance
      .get(`/api/logs`, {
        params,
      })
      .then((response) => {
        if (
          Number(urlParam.get("page")) > 1 &&
          response.data.entities.length < 1
        ) {
          setQuery((prevState: queryLogsModel) => ({
            ...prevState,
            page: Number(urlParam.get("page")) - 1,
          }));
          return;
        }
        setItems(response.data.entities);
        setPage(response.data.page_information);
        setQuery((prevState: queryLogsModel) => ({
          ...prevState,
          page: response.data.page_information.page,
          size: response.data.page_information.size,
        }));
        setLoading(false);
      })
      .catch((error: AxiosError<any>) => {
        setLoading(false);
        SwalModal({
          title: "เกิดข้อผิดพลาด",
          text: error.response?.data?.message,
          icon: "error",
        })();
      });
  };

  const handleRouteChange = (query: queryLogsModel) => {
    router.replace(
      `?page=${query.page || 1}${query.query ? `&query=${query.query}` : ``}${
        query.userId ? `&userId=${query.userId}` : ``
      }${query.userGroupId ? `&userGroupId=${query.userGroupId}` : ``}${
        query.menuId ? `&menuId=${query.menuId}` : ``
      }${query.eventType ? `&eventType=${query.eventType}` : ``}${
        query.startDate ? `&startDate=${query.startDate}` : ``
      }${query.endDate ? `&endDate=${query.endDate}` : ``}`
    );
  };

  const onDelete = (id: number) => {
    SwalModal({
      title: "ลบรายการกิจกรรม?",
      icon: "warning",
      showCancelButton: true,
      onConfirm: () => onConfirm(id),
    })();
  };

  const onConfirm = (id: number) => {
    axiosInstance
      .delete(`/api/${id}`)
      .then((response) => {
        SwalModal({
          title: "ลบสำเร็จ",
          icon: "success",
          onConfirm: () => fetchData(query),
        })();
      })
      .catch((error: AxiosError<any>) => {
        SwalModal({
          title: "เกิดข้อผิดพลาด",
          text: error.response?.data?.message,
          icon: "error",
        })();
      });
  };
  const getEventThaiNames = (value: string) => {
    switch (value) {
      case "GET":
        return "เรียกดู";
      case "PATCH":
        return "อัพเดท";
      case "POST":
        return "สร้าง";
      case "DELETE":
        return "ลบ";
      default:
        return "-";
    }
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setQuery((prevState: queryLogsModel) => ({
      ...prevState,
      page: 1,
      [fieldName]: fieldValue,
    }));
  };

  const enterInput = (query: string, startDate: string, endDate: string) => {
    if (startDate && endDate && startDate > endDate) {
      SwalModal({
        title: "เกิดข้อผิดพลาด",
        text: `วันที่เริ่มต้นมากกว่าวันที่สิ้นสุด`,
        icon: "error",
      })();
      return;
    }
    setQuery((prevState: queryLogsModel) => ({
      ...prevState,
      page: 1,
      query: query,
      startDate: startDate,
      endDate: endDate,
    }));
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;

    if (fieldName === "query") {
      setSearchInput(e.target.value);
    } else if (fieldName === "startDate") {
      setStartDate(e.target.value);
    } else if (fieldName === "endDate") {
      setEndDate(e.target.value);
    }
  };

  const handleAutocompleteSelectionChange = (
    fieldName: string,
    selectedKey: Key
  ) => {
    setQuery((prevState: queryLogsModel) => ({
      ...prevState,
      [fieldName]: selectedKey,
    }));
  };

  return (
    <div>
      <div className="prose max-w-none card rounded-lg bg-white shadow-md p-4 flex flex-row items-center mb-3">
        <h2 className="my-0 text-primary inline">บันทึกการใช้งานระบบ</h2>
      </div>
      <div className="flex flex-row flex-wrap mb-3">
        <div className="w-full md:w-1/4 px-1 mb-2">
          <Input
            isClearable
            type="text"
            label="ค้นหา"
            variant="bordered"
            color="primary"
            placeholder="ค้นหาด้วยชื่อ"
            value={searchInput}
            name="query"
            className="w-full rounded-xl shadow-md"
            onChange={onChangeSearchInput}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                const query = event.target as HTMLInputElement;
                const startDate = document.getElementsByName(
                  "startDate"
                )[0] as HTMLInputElement;
                const endDate = document.getElementsByName(
                  "endDate"
                )[0] as HTMLInputElement;
                enterInput(query.value, startDate.value, endDate.value);
              }
            }}
            onClear={() => setSearchInput("")}
          />
        </div>
        <div className="md:w-1/4 w-full px-1 mb-2">
          <Autocomplete
            size="md"
            variant="bordered"
            color="primary"
            label="เจ้าหน้าที่"
            className="w-full myautocomplete rounded-xl shadow-md"
            onSelectionChange={(key: Key) =>
              handleAutocompleteSelectionChange("userId", key)
            }
            onChange={handleInput}
            selectedKey={query.userId?.toString()}
            name="userId"
            aria-label="userId"
            defaultItems={staffOption}
          >
            {(staff) => (
              <AutocompleteItem
                key={staff.value || ""}
                textValue={staff.text || ""}
                id={staff.text}
              >
                <div className="!leading-7">{staff.text}</div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className="md:w-1/4 w-full px-1 mb-2">
          <Autocomplete
            size="md"
            variant="bordered"
            color="primary"
            label="กลุ่มเจ้าหน้าที่"
            className="w-full myautocomplete rounded-xl shadow-md"
            onSelectionChange={(key: Key) =>
              handleAutocompleteSelectionChange("userGroupId", key)
            }
            onChange={handleInput}
            selectedKey={query.userGroupId?.toString()}
            name="userGroupId"
            aria-label="userGroupId"
            defaultItems={groupOption}
          >
            {(group) => (
              <AutocompleteItem
                key={group.value || ""}
                textValue={group.text || ""}
                id={group.text}
              >
                <div className="!leading-7">{group.text}</div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className="md:w-1/4 w-full px-1 mb-2">
          <Autocomplete
            size="md"
            variant="bordered"
            color="primary"
            label="เมนู"
            className="w-full myautocomplete rounded-xl shadow-md"
            onSelectionChange={(key: Key) =>
              handleAutocompleteSelectionChange("menuId", key)
            }
            onChange={handleInput}
            selectedKey={query.menuId?.toString()}
            name="menuId"
            aria-label="menuId"
            defaultItems={menuOption}
          >
            {(menu) => (
              <AutocompleteItem
                key={menu.value || ""}
                textValue={menu.text || ""}
                id={menu.text}
              >
                <div className="!leading-7">{menu.text}</div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        <div className="md:w-1/4 w-full px-1 mb-2 flex items-end">
          <Autocomplete
            size="md"
            variant="bordered"
            color="primary"
            label="กิจกรรม"
            className="w-full myautocomplete rounded-xl shadow-md"
            onSelectionChange={(key: Key) =>
              handleAutocompleteSelectionChange("eventType", key)
            }
            onChange={handleInput}
            selectedKey={query.eventType?.toString()}
            name="eventType"
            aria-label="eventType"
            defaultItems={eventOption}
          >
            {(event) => (
              <AutocompleteItem
                key={event.value || ""}
                textValue={event.text || ""}
                id={event.text}
              >
                <div className="!leading-7">{event.text}</div>
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
        {/* <div className="md:w-1/4 w-full px-1 mb-2">
          <Input
            type="datetime-local"
            label="วันที่เริ่ม"
            variant="bordered"
            color="primary"
            placeholder="ค้นหาด้วยชื่อ Client"
            value={startDate ? startDate.toString().slice(0, 16) : ""}
            name="startDate"
            className="w-full rounded-xl shadow-md"
            onChange={onChangeSearchInput}
            max={endDate ? endDate.toString().slice(0, 16) : ""}
          />
        </div>
        <div className="md:w-1/4 w-full px-1 mb-2">
          <Input
            type="datetime-local"
            label="วันที่สิ้นสุด"
            variant="bordered"
            color="primary"
            placeholder="ค้นหาด้วยชื่อ Client"
            value={endDate ? endDate.toString().slice(0, 16) : ""}
            name="endDate"
            className="w-full rounded-xl shadow-md"
            onChange={onChangeSearchInput}
            min={startDate ? startDate.toString().slice(0, 16) : ""}
          />
        </div> */}
        <div className="md:w-1/4 w-full px-1 mb-2 flex">
          <Button
            isIconOnly
            className="w-full md:w-16 bg-[#FF7B01] text-white shadow-md md:h-auto"
            onClick={() => {
              const query = document.getElementsByName(
                "query"
              )[0] as HTMLInputElement;
              const startDate = document.getElementsByName(
                "startDate"
              )[0] as HTMLInputElement;
              const endDate = document.getElementsByName(
                "endDate"
              )[0] as HTMLInputElement;
              enterInput(query.value, startDate.value, endDate.value);
            }}
          >
            <FontAwesomeIcon className="fa-xl" icon={faMagnifyingGlass} />
          </Button>
        </div>
        <div className="w-full px-2 flex items-center mb-2">
          {" "}
          <input
            type="checkbox"
            className="checkbox checkbox-primary mr-2"
            onChange={handleDisplayTime}
            checked={displayTime}
          />
          {`ตามช่วงระยะเวลา`}
        </div>
        {displayTime && (
          <>
            <div className="md:w-1/4 w-full px-1 mb-2">
              <Input
                type="datetime-local"
                label="วันที่เริ่ม"
                variant="bordered"
                color="primary"
                placeholder="ค้นหาด้วยชื่อ Client"
                value={startDate ? startDate.toString().slice(0, 16) : ""}
                name="startDate"
                className="w-full rounded-xl shadow-md"
                onChange={onChangeSearchInput}
                max={endDate ? endDate.toString().slice(0, 16) : ""}
              />
            </div>
            <div className="md:w-1/4 w-full px-1 mb-2">
              <Input
                type="datetime-local"
                label="วันที่สิ้นสุด"
                variant="bordered"
                color="primary"
                placeholder="ค้นหาด้วยชื่อ Client"
                value={endDate ? endDate.toString().slice(0, 16) : ""}
                name="endDate"
                className="w-full rounded-xl shadow-md"
                onChange={onChangeSearchInput}
                min={startDate ? startDate.toString().slice(0, 16) : ""}
                isDisabled={!startDate}
              />
            </div>
          </>
        )}
      </div>
      <div className="flex justify-end mb-3">
        {" "}
        รายการทั้งหมด {page.itemCount} รายการ
      </div>
      <div
        className="card bg-white rounded-xl mb-3"
        style={{ boxShadow: "0px 0px 4px 0px #DADADA" }}
      >
        <div className="card-body">
          <div className="overflow-x-auto">
            <table className="table listTable">
              {/* head */}
              <thead>
                <tr>
                  {fields.map((data: any) => (
                    <th key={data.id}>{data}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr className="border-0 h-96">
                    <td colSpan={fields.length} className="text-center">
                      <span className="loading loading-spinner text-primary" />
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr className="border-0">
                    <td
                      colSpan={fields.length}
                      className="text-center prose !border-none"
                    >
                      <h3 className="my-5 py-5">ไม่มีข้อมูล</h3>
                    </td>
                  </tr>
                ) : (
                  items.map((data: any) => (
                    <tr key={data.id} className="hover">
                      <td style={{ maxWidth: "200px", width: "200px" }}>
                        <Tooltip
                          delay={0}
                          closeDelay={0}
                          showArrow={true}
                          content={
                            <div style={{ maxWidth: "200px" }}>
                              {data?.user?.firstName || ""}{" "}
                              {data?.user?.lastName || ""}
                            </div>
                          }
                          color="warning"
                          placement="top-start"
                        >
                          <div
                            className="truncate overflow-hidden"
                            style={{ width: "200px" }}
                          >
                            {`${
                              !data?.user?.firstName && !data?.user?.lastName
                                ? "-"
                                : `${data?.user?.firstName || ""} ${
                                    data?.user?.lastName || ""
                                  }`
                            }`}
                          </div>
                        </Tooltip>
                      </td>
                      <td style={{ maxWidth: "200px", width: "200px" }}>
                        {data?.user?.group?.name}
                      </td>
                      <td style={{ maxWidth: "200px", width: "200px" }}>
                        {" "}
                        {data?.menu?.name}
                      </td>
                      <td>{getEventThaiNames(data?.event)}</td>
                      <td>
                        {moment(data.createdAt).format("DD/MM/YYYY HH:mm")}
                      </td>
                      <td>
                        <Link
                          href={{
                            pathname: `/logs/${data.id}`,
                            query: {
                              page: query.page || null,
                              query: query.query || null,
                              userId: query.userId || null,
                              userGroupId: query.userGroupId || null,
                              menuId: query.menuId || null,
                              eventType: query.eventType || null,
                              startDate: query.startDate || null,
                              endDate: query.endDate || null,
                            },
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faEye}
                            className="mr-2 text-info cursor-pointer"
                          />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {!loading && !!items.length && (
          <Pagination
            showControls
            showShadow
            total={page.pageCount || 1}
            color="primary"
            variant="bordered"
            page={page.page}
            onChange={(pageNumber) => {
              setQuery({ ...query, page: pageNumber });
            }}
          />
        )}
      </div>
    </div>
  );
}
