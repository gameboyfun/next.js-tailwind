export interface PaginationModel {
  page: number;
  size: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: Boolean;
  hasNextPage: Boolean;
}

export interface propsModel {
    page: PaginationModel,
    handleRouteChange?: Function,
    fetchData?: Function,
}