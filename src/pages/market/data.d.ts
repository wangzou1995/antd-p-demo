export interface MarketTableListItem {
  key: number;
  prodcode: number;
  prodname: string;
  tenantcode: string;
  dbtype: string;
  publisher: number;
  publishdate: string;
  devicetype: number;
  versionid: number;
  pricestrategy: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: MarketTableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  tenantname: string;
  tenantcode: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}
