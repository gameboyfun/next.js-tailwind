"use client";
import axiosInstance from "@/axiosInstance";
import { PaginationModel } from "@/models/pagination";
import { SelectModel } from "@/models/select";
import { queryServiceModel } from "@/models/service";
import { faPenToSquare, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Pagination,
} from "@nextui-org/react";
import { AxiosError } from "axios";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Key, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Image } from "@nextui-org/react";
import { Status } from "@/models/common";
import SwalModal from "@/public/constants/sweetAlertConfig";

export default function Service() {
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
  const fields = ["", "ชื่อบริการ", "หมวดหมู่", "คะแนนแสดงผล", "สถานะ", ""];
  const [query, setQuery] = useState<queryServiceModel>({
    page: Number(urlParam.get("page")) || 1,
    query: urlParam.get("query") || "",
    categoryId: urlParam.get("categoryId") || "",
    status: urlParam.get("status") || "",
  });
  const [searchInput, setSearchInput] = useState(urlParam.get("query") || "");
  const [categoryOption, setCategoryOption] = useState<SelectModel<string>[]>(
    []
  );
  const [statusOption, setStatusOption] = useState<SelectModel<string>[]>(
    Object.keys(Status)
      .filter((v) => isNaN(Number(v)))
      .map((key) => ({
        text: key,
        value: Status[key as keyof typeof Status].toString(),
      }))
  );

  useEffect(() => {
    handleRouteChange(query);
    fetchData(query);
  }, [query.page, query.query, query.categoryId, query.status]);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    let params = {
      size: 50,
    };
    await axiosInstance
      .get(`/api/service-category`, { params })
      .then((response) => {
        let categories = response.data.entities.map((data: any) => {
          return { text: data.name, value: data.id };
        });
        setCategoryOption(categories);
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

  const fetchData = async (query: queryServiceModel) => {
    setLoading(true);
    const params = {
      page: query.page,
      query: query.query || null,
      categoryId: query.categoryId || null,
      status: query.status || null,
    };
    await axiosInstance
      .get(`/api/services`, {
        params,
      })
      .then((response) => {
        if (
          Number(urlParam.get("page")) > 1 &&
          response.data.entities.length < 1
        ) {
          setQuery((prevState: queryServiceModel) => ({
            ...prevState,
            page: Number(urlParam.get("page")) - 1,
          }));
          return;
        }
        setItems(response.data.entities);
        setPage(response.data.page_information);
        setQuery((prevState: queryServiceModel) => ({
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

  const handleRouteChange = (query: queryServiceModel) => {
    router.replace(
      `?page=${query.page || 1}${query.query ? `&query=${query.query}` : ``}${
        query.categoryId ? `&categoryId=${query.categoryId}` : ``
      }${query.status ? `&status=${query.status}` : ``}`
    );
  };

  const onDelete = (id: number) => {
    SwalModal({
      title: "ลบบริการ?",
      icon: "warning",
      showCancelButton: true,
      onConfirm: () => onConfirm(id),
    })();
  };

  const onConfirm = (id: number) => {
    axiosInstance
      .delete(`/api/services/${id}`)
      .then((response) => {
        SwalModal({
          title: "ลบบริการสำเร็จ",
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

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setQuery((prevState: queryServiceModel) => ({
      ...prevState,
      page: 1,
      [fieldName]: fieldValue,
    }));
  };

  const enterInput = (value: string) => {
    setQuery((prevState: queryServiceModel) => ({
      ...prevState,
      page: 1,
      query: value,
    }));
  };

  const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleAutocompleteSelectionChange = (
    fieldName: string,
    selectedKey: Key
  ) => {
    setQuery((prevState: queryServiceModel) => ({
      ...prevState,
      [fieldName]: selectedKey,
    }));
  };

  return (
    <div>
      <div className="prose max-w-none card rounded-lg bg-white shadow-md p-4 flex flex-row items-center mb-3">
        <h2 className="my-0 text-primary inline">รายการบริการ</h2>
        <Link
          className="ml-auto no-underline"
          href={{
            pathname: "/service/create",
            query: {
              page: query.page || null,
              query: query.query || null,
              categoryId: query.categoryId || null,
              status: query.status || null,
            },
          }}
        >
          <Button
            color="primary"
            variant="solid"
            startContent={<FontAwesomeIcon icon={faPlus} />}
          >
            เพิ่มบริการ
          </Button>
        </Link>
      </div>
      <div className="flex flex-row flex-wrap gap-2 mb-3">
        <Input
          isClearable
          type="text"
          label="ค้นหา"
          variant="bordered"
          color="primary"
          placeholder="ค้นหาด้วยหัวข้อ"
          value={searchInput}
          name="query"
          className="w-full md:w-1/3 lg:w-1/4 rounded-xl shadow-md"
          onChange={onChangeSearchInput}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              const inputElement = event.target as HTMLInputElement;
              enterInput(inputElement.value);
            }
          }}
          onClear={() => setSearchInput("")}
          startContent={<FontAwesomeIcon icon={faMagnifyingGlass} />}
        />
        <Autocomplete
          size="md"
          variant="bordered"
          color="primary"
          label="หมวดหมู่"
          className="md:min-w-1/5 md:w-1/5 w-full myautocomplete rounded-xl shadow-md"
          onSelectionChange={(key: Key) =>
            handleAutocompleteSelectionChange("categoryId", key)
          }
          onChange={handleInput}
          selectedKey={query.categoryId?.toString()}
          name="categoryId"
          aria-label="categoryId"
          defaultItems={categoryOption}
        >
          {(category) => (
            <AutocompleteItem
              key={category.value || ""}
              textValue={category.text || ""}
              id={category.text}
            >
              <div className="!leading-7">{category.text}</div>
            </AutocompleteItem>
          )}
        </Autocomplete>
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
          selectedKey={query.status?.toString()}
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
        <Button
          isIconOnly
          className="w-full md:w-16 bg-[#FF7B01] text-white shadow-md md:h-auto"
          onClick={() => {
            const inputElement = document.getElementsByName(
              "query"
            )[0] as HTMLInputElement;
            enterInput(inputElement.value);
          }}
        >
          <FontAwesomeIcon className="fa-xl" icon={faMagnifyingGlass} />
        </Button>
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
                      <td className="flex justify-center">
                        <div className="w-20 max-h-20 h-20 flex items-center">
                          <Image
                            src={data.imageUrl}
                            fallbackSrc="https://via.placeholder.com/80x80"
                            alt="service_image"
                            className="object-contain w-[80px] h-[80px]"
                          />
                        </div>
                      </td>
                      <td>{data.name}</td>
                      <td>{data.category?.name}</td>
                      <td>{data.score}</td>
                      <td>
                        {Object.keys(Status).find(
                          (key) =>
                            Status[key as keyof typeof Status] === data.status
                        )}
                      </td>
                      <td>
                        <Link
                          href={{
                            pathname: `/service/${data.id}`,
                            query: {
                              page: query.page || null,
                              query: query.query || null,
                              categoryId: query.categoryId || null,
                              status: query.status || null,
                            },
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faPenToSquare}
                            className="mr-2 text-warning cursor-pointer"
                          />
                        </Link>
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          className="mr-2 text-error cursor-pointer"
                          onClick={() => onDelete(data.id)}
                        />
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
