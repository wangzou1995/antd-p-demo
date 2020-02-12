import {Divider, Form, Tag,} from 'antd';
import React, {useRef} from 'react';
import {FormComponentProps} from 'antd/es/form';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {queryMarket} from './service';
import {MarketTableListItem} from './data';

interface TableListProps extends FormComponentProps {
}



const TableList: React.FC<TableListProps> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<MarketTableListItem>[] = [
    {
      title: '产品编号',
      dataIndex: 'prodcode'
    },
    {
      title: '产品名称',
      dataIndex: 'prodname'
    },
    {
      title: '商户号',
      dataIndex: 'tenantInfo.tenantcode',
    },
    {
      title: '数据库类型',
      dataIndex: 'dbtype',
    },
    {
      title: '发布者',
      dataIndex: 'publisherInfo.nickname',
    },
    {
      title: '发布日期',
      dataIndex: 'publishdate',
      valueType: 'date'
    },
    {
      title:'客户端类型',
      dataIndex: 'devicetype'
    },
    {
      title:'版本',
      dataIndex: 'version'
    },
    {
      title:'费用类型',
      dataIndex: 'pricestrategy',
      valueEnum: {
        0: {
          text: '免费'
        },
        2: {
          text: '年费',
        }
      },
      render: (_: any, record: MarketTableListItem) => (
        <span>
          {
            <Tag color={record.pricestrategy === 0 ? 'green' : 'geekblue'} key={record.id}>
              {_ + (record.pricestrategy === 0 ? '' : record.price)}
            </Tag>

          }
        </span>
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: MarketTableListItem) => (
        <>
          <a onClick={() => {
          }}
          >
            订阅
          </a>
          <Divider type="vertical"/>
          <a href="">产品说明</a>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<MarketTableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        request={params => queryMarket(params)}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
