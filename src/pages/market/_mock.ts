import {Request, Response} from 'express';
import {parse} from 'url';
import {MarketTableListItem, TableListParams} from './data.d';

// mock tableListDataSource
let tableListDataSource: MarketTableListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    tenantcode: `tenantCode ${i}`,
    prodcode: 0,
    prodname: `tenantCode ${i}`,
    dbtype: `tenantCode ${i}`,
    publisher: 0,
    publishdate: `tenantCode ${i}`,
    devicetype: 0,
    versionid: 0,
    pricestrategy: 0,
  });
}

function getMarket(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as TableListParams;
  let dataSource = tableListDataSource;


  if (params.tenantcode) {
    dataSource = dataSource.filter(data => data.tenantcode.includes(params.tenantcode || ''));
  }
  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    data: dataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postMarket(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  console.log(" body", body)
  const {method, params } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => params.key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        id: i,
        ...params
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === params.key) {
          return {...item, ...params};
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

export default {
  'GET /api/Market': getMarket,
  'POST /api/Market': postMarket,
};
