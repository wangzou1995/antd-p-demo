import {Request, Response} from 'express';
import {parse} from 'url';
import {TableListItem, TableListParams} from './data.d';

// mock tableListDataSource
let tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    key: i,
    id: i,
    tenantcode: `tenantCode ${i}`,
    tenantname: `商户 ${i}`,
    samplename: `简称 ${i}`,
    signkey: `sdfdsfdsdsfsd ${i}`,
    gatewayurl: 'ssssssss'
  });
}

function getTenant(req: Request, res: Response, u: string) {
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

function postTenant(req: Request, res: Response, u: string, b: Request) {
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
  'GET /merchant/jsonreq.action': getTenant,
  'POST /merchant/jsonreq.action': postTenant,
};
