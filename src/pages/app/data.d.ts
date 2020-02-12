export interface AppTableListItem {
    key: number
    id: number;
    prodcode: string;
    prodname: string;
    pricestrategy: number;
    devicetype: number;
    connectorurl: string;
    price: number;
    designversionid: number;
    tenantid: number;
    dbtype: string;
    publishdate: string;
    tenantname: string;
    tenantcode: string;
    updatetime: string;
    status: number;
  }

  export interface TableListPagination {
    total: number;
    pageSize: number;
    current: number;
  }

  export interface TableListData {
    list: AppTableListItem[];
    pagination: Partial<TableListPagination>;
  }

  export interface TableListParams {
    id: number;
    prodcode: string;
    prodname: string;
    pricestrategy: number;
    devicetype: number;
    connectorurl: string;
    price: number;
    designversionid: number;
    tenantid: number;
    dbtype: string;
    publishdate: string;
    tenantname: string;
    tenantcode: string;
    updatetime: string;
    status: number;
    pageSize: number;
    currentPage: number;
  }
