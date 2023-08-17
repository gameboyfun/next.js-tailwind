"use client";
import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useStore } from "./store";
import Pagination from "@/components/pagination";
import { PaginationModel } from "@/models/pagination";
import Swal from "sweetalert2";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const urlParam = useSearchParams();
  const [page, setPage] = useState<PaginationModel>({
    page: Number(urlParam.get("page")) || 1,
    size: 4,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

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
        Swal.fire({
          title: `เกิดข้อผิดพลาด`,
          text: error.response?.data?.message,
          icon: "error",
          confirmButtonText: `ตกลง`,
        });
      });
  };

  const handleRouteChange = (pageNumber: number) => {
    router.replace(`${pathname}?page=${pageNumber}`);
  };

  return (
    <>
      <Pagination
        page={page}
        handleRouteChange={handleRouteChange}
        fetchData={fetchData}
      />
    </>
  );
}
