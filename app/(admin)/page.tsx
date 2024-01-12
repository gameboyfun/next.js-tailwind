"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useStore } from "../store";
import { PaginationModel } from "@/models/pagination";
import Swal from "sweetalert2";
import { Pagination } from "@nextui-org/react";
import SwalModal from "@/public/constants/sweetAlertConfig";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const urlParam = useSearchParams();
  const [page, setPage] = useState<PaginationModel>({
    page: Number(urlParam.get("page")) || 1,
    size: 5,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const fetchData = async (pageNumber: number) => {
    const params = {
      page: pageNumber,
      size: page.size,
    };
    await axiosInstance
      .get(``, {
        params,
      })
      .then((response) => {
        setPage(response.data.page_information);
      })
      .catch((error: any) => {
        SwalModal({
          title: "เกิดข้อผิดพลาด",
          text: error.response?.data?.message,
          icon: "error",
        })();
      });
  };

  const handleRouteChange = (pageNumber: number) => {
    router.replace(`${pathname}?page=${pageNumber}`);
  };

  return (
    <>
      <div className="flex justify-center">
        {!loading && !!items.length && (
          <Pagination
            showControls
            showShadow
            total={page.pageCount || 1}
            color="primary"
            variant="bordered"
            page={page.page}
            // onChange={(pageNumber) => {
            //   setQuery({ ...query, page: pageNumber });
            // }}
          />
        )}
      </div>
    </>
  );
}
