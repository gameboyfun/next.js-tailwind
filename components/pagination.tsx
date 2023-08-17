import Paginations from "react-js-pagination";
import { propsModel } from "@/models/pagination";

export default function Pagination(props: propsModel) {
  const { page, handleRouteChange, fetchData } = props;

  return (
    <Paginations
      activePage={parseInt(page.page.toString())}
      itemsCountPerPage={page.size}
      totalItemsCount={page.itemCount}
      pageRangeDisplayed={5}
      onChange={(pageNumber) => {
        if (handleRouteChange) {
          handleRouteChange(pageNumber);
        }
        if (fetchData) {
          fetchData(pageNumber);
        }
      }}
      innerClass="flex h-9 justify-center"
      activeClass="bg-primary px-2 text-white border-r-0 border-l-0 hover:!cursor-default"
      activeLinkClass="hover:!cursor-default"
      itemClass="px-2 w-10 flex justify-center items-center hover:bg-primary hover:text-white text-primary border hover:cursor-pointer border-r-0"
      itemClassFirst="rounded-tl rounded-bl border-r-0"
      itemClassLast="rounded-tr rounded-br border-r"
      itemClassPrev=""
      itemClassNext=""
      disabledClass="text-secondary hover:!cursor-default hover:bg-white hover:!text-secondary"
      linkClassFirst={
        page.page === 1 ? `hover:cursor-default` : `hover:cursor-pointer`
      }
      linkClassPrev={
        page.page === 1 ? `hover:cursor-default` : `hover:cursor-pointer`
      }
      linkClassNext={
        page.page === page.pageCount
          ? `hover:cursor-default`
          : `hover:cursor-pointer`
      }
      linkClassLast={
        page.page === page.pageCount
          ? `hover:cursor-default`
          : `hover:cursor-pointer`
      }
    />
  );
}
