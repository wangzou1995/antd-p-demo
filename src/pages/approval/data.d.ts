export interface TableListItem {
  prodname:string;
  prodcode:string;
  tenantid:string;
  authusername:string;
  subscribeusername:string;
  subscribetime:string;
  version:string;
  orderstate:string;
  id: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  data: TableListItem[];
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
