import { Form} from 'antd';
import React, {useRef} from 'react';
import {FormComponentProps} from 'antd/es/form';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {queryOrder} from './service';
import {TableListItem} from './data.d';



interface TableListProps extends FormComponentProps {
}

const TableList: React.FC<TableListProps> = () => {

  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '产品名称',
      dataIndex: 'prodname',
    },
    {
      title: '产品编号',
      dataIndex: 'prodcode',
    },
    {
      title: '所属商户',
      dataIndex: 'authusername',
    },
    {
      title: '订阅商户',
      dataIndex: 'tenantid',
    },
    {
      title: '订阅者',
      dataIndex: 'subscribeusername',
    },
    {
      title: '订阅时间',
      dataIndex: 'subscribetime',
      valueType: 'dateTime'
    },
    {
      title: '版本',
      dataIndex: 'version',
    },
    {
      title: '状态',
      dataIndex: 'orderstate'
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: TableListItem) => (
        <>
          <a onClick={() => {
          }}
          >
            审批
          </a>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        actionRef={actionRef}
        rowKey="id"
        request={params => queryOrder(params)}
        columns={columns}
      />

    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
