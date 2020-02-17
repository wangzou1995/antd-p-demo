export interface SubScribeTableListItem {
  id: number;
  tenantcode: string,
  tenantname: string,
  prodcode: string,
  prodname: string,
  prodid: number,
  devicetype: number,
  connectorurl: string,
  subscribetime: string,
  subscribeuser: number,
  sortid: number,
  tenantid: number,
  dbtype: string,
  publishdate: string,
  version: string,
  versiontype: string,
  status: number
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
  tenantcode: string;
  tenantname: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
