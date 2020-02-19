import {Button, Divider, Form, message,} from 'antd';
import React, {useRef, useState} from 'react';
import {FormComponentProps} from 'antd/es/form';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {queryTenant, updateTenant, addTenant} from './service';
import {TableListItem} from './data.d';
import TableRowUpdateAndAdd from "@/components/Base/TableRowUpdateAndAdd";
import BaseTableListUtil from '../../components/Base/util';
import Operate from '../../components/Base/Opreate';
import {ConnectProps} from "@/models/connect";




interface TableListProps extends FormComponentProps, ConnectProps {
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {

  const hide = message.loading('正在添加');
  for (let prop in fields) {
    if (fields[prop] === null) {
      fields[prop] = ""
    }
  }
  try {
    await addTenant({
      ...fields
    });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};


/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: TableListItem) => {
  const hide = message.loading('正在配置');
  try {
    await updateTenant({
      ...fields
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const TableList: React.FC<TableListProps> = () => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);
  const [action, handleAction] = useState<string>('');
  const [tableItem, setTableItem] = useState<TableListItem>(
    { id: -1, tenantcode: '', tenantname: '', samplename: '', signkey: '', gatewayurl: ''}
  );
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '商户号',
      dataIndex: 'tenantcode',
    },
    {
      title: '商户名称',
      dataIndex: 'tenantname',
    },
    {
      title: '简称',
      dataIndex: 'samplename',
    },
    {
      title: '签名Key',
      dataIndex: 'signkey',
    },
    {
      title: '路由地址',
      dataIndex: 'gatewayurl',
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: TableListItem) => (
        <>
          <a onClick={() => {
            setTableItem(record);
            handleAction(Operate.Update)
            handleModalVisible(true)
          }}
          >
            编辑
          </a>
          <Divider type="vertical"/>
          <a href="">工作平台</a>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        search={false}
        actionRef={actionRef}
        rowKey="tenantcode"
        toolBarRender={(action, {selectedRows}) => [
          <Button icon="plus" type="primary" onClick={() => {
            handleAction(Operate.Add)
            handleModalVisible(true)
          }}>
            新建
          </Button>
        ]}
        request={params => queryTenant(params)}
        columns={columns}
      />
      <TableRowUpdateAndAdd
        onSubmit={async (value: TableListItem) => {
          const success = await (action === Operate.Update ? handleUpdate(value) : handleAdd(value));
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        row={BaseTableListUtil.createRow(action, '商户', columns)}
        modalVisible={modalVisible}
        values={tableItem}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
