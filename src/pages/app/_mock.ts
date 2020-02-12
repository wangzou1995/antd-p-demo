import {Request, Response} from 'express';
import {parse} from 'url';
import {AppTableListItem, TableListParams} from './data.d';

// mock tableListDataSource
let tableListDataSource: AppTableListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    id: i,
    tenantcode: `tenantCode ${i}`,
    tenantname: `商户 ${i}`,
    prodcode: `prodcode ${i}`,
    prodname: `prodname ${i}`,
    pricestrategy: i,
    devicetype: i,
    connectorurl: `connectorurl ${i}`,
    price: i,
    designversionid: i,
    tenantid: i,
    dbtype: `dbtype ${i}`,
    publishdate: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    updatetime: '@DATETIME("yyyy-MM-dd HH:mm:ss")',
    status: i,
  });
}

function getApp(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as TableListParams;
  let dataSource = tableListDataSource;

  if (params.tenantname) {
    dataSource = dataSource.filter(data => data.tenantname.includes(params.tenantname || ''));
  }
  if (params.tenantcode) {
    dataSource = dataSource.filter(data => data.tenantcode.includes(params.tenantcode || ''));
  }
  if (params.prodcode) {
    dataSource = dataSource.filter(data => data.prodcode.includes(params.prodcode || ''));
  }
  if (params.prodname) {
    dataSource = dataSource.filter(data => data.prodname.includes(params.prodname || ''));
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

function postApp(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  console.log(" body", body)
  const {method, params} = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => params.id.indexOf(item.id) === -1);
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
        if (item.id === params.id) {
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
  'GET /merchant/jsonreq.action': getApp,
  'POST /merchant/jsonreq.action': postApp,
};
