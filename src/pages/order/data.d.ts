export interface TableListItem {
  prodid: number;
  prodname: string;
  prodcode: string;
  subscribeusername: string;
  authusername: string;
  publishdate: string;
  version: string;
  status: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  prodcode: string;
  prodname: string;
  pageSize?: number;
  currentPage?: number;
}
export interface BaseQ {

}
