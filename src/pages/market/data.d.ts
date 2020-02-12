export interface MarketTableListItem {
  prodcode: number;
  prodname: string;
  tenantcode: string;
  dbtype: string;
  publisherInfo?: publisherInfo;
  publishdate: string;
  devicetype: number;
  versionid: number;
  version: number;
  pricestrategy: number;
  tenantInfo?: tenantInfo;
  createtime: string;
  versiontype: number;
  connectorurl: string;
  produrl: string;
  price: number;
  designversionid: number;
  tenantid: number;
  publisher: number;
  id: number;
  updatetime: string;
  status: number;
}
interface publisherInfo {
  qq: string,
  loginname: string,
  nickname: string,
  mobile: string,
  wechat: string,
  id: number,
  email: string
}
interface tenantInfo {
  tenantname: string,
  id: number,
  tenantcode: string,
  fingerprintcheck: boolean
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
