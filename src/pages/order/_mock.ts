import {Request, Response} from 'express';
import {parse} from 'url';
import {TableListItem, TableListParams} from './data.d';

// mock tableListDataSource
let tableListDataSource: TableListItem[] = [];

for (let i = 0; i < 10; i += 1) {
  tableListDataSource.push({
    prodid: i,
    prodname: `tenantCode ${i}`,
    prodcode: `tenantCode ${i}`,
    subscribeusername: `tenantCode ${i}`,
    authusername: `tenantCode ${i}`,
    publishdate:`tenantCode ${i}`,
    version: `tenantCode ${i}`,
    status:i
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
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        id: i,
        ...params
      });
      break;
  }

  const result = {
    data: tableListDataSource,
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
