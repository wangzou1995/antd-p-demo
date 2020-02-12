export interface TableListItem {
  key: number;
  id: number;
  tenantcode: string;
  tenantname: string;
  samplename: string;
  signkey: string;
  gatewayurl: string;
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
  tenantname: string;
  tenantcode: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
export interface BaseQ {

}
