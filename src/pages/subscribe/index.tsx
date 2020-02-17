import {Button, Divider, Form, message,} from 'antd';
import React, {useRef, useState} from 'react';
import {FormComponentProps} from 'antd/es/form';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {querySubscribe, addSubscribe, updateSubscribe} from './service';
import {SubScribeTableListItem} from './data';
import TableRowUpdateAndAdd from "@/components/Base/TableRowUpdateAndAdd";
import BaseTableListUtil from '../../components/Base/util';
import Operate from '../../components/Base/Opreate';

interface TableListProps extends FormComponentProps {
}

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: SubScribeTableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addSubscribe({
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
const handleUpdate = async (fields: SubScribeTableListItem) => {
  const hide = message.loading('正在配置');
  try {
    await updateSubscribe({
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
  const [tableItem, setTableItem] = useState<SubScribeTableListItem>(
    {
      id: -1,
      tenantcode: "system",
		  tenantname: "系统商户",
      prodcode: "",
      prodname: "",
      prodid: 42,
      devicetype: 0,
      connectorurl: "http://56.56.59.14:8888",
      subscribetime: "",
      subscribeuser: 9,
      sortid: 3,
      tenantid: 0,
      dbtype: "",
      publishdate: "",
      version: '',
      versiontype: '',
      status: 1}
  );
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<SubScribeTableListItem>[] = [
    {
      title: '商户号',
      dataIndex: 'tenantcode',
    },
    {
      title: '商户名称',
      dataIndex: 'tenantname',
    },
    {
      title: '产品名称',
      dataIndex: 'prodname',
    },
    {
      title: '产品编号',
      dataIndex: 'prodcode',
    },
    {
      title: '数据库类型',
      dataIndex: 'dbtype',
    },
    {
      title: '订阅时间',
      dataIndex: 'subscribetime',
      valueType: 'dateTime'
    },
    {
      title: '客户端类型',
      dataIndex: 'devicetype',
    },
    {
      title: '版本',
      dataIndex: 'version',
    },
    {
      title: '版本类型',
      dataIndex: 'versiontype',
      valueEnum: {
        0: {
          status: "Default",
          text: '未发布'
        },
        1: {
          status: 'Processing',
          text: '测试版'
        },
        2: {
          status: 'Success',
          text: '已发布'
        }
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '已订阅',
          status: 'Success'
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: SubScribeTableListItem) => (
        <>
          <a onClick={() => {
            setTableItem(record);
            handleAction(Operate.Update)
            handleModalVisible(true)
          }}
          >
            取消订阅
          </a>
          <Divider type="vertical"/>
          <a href="">切换版本</a>
        </>
      ),
    },
  ];
  return (
    <PageHeaderWrapper>
      <ProTable<SubScribeTableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        toolBarRender={(action, {selectedRows}) => [
          <Button icon="plus" type="primary" onClick={() => {
            handleAction(Operate.Add)
            handleModalVisible(true)
          }}>
            新建
          </Button>
        ]}
        request={params => querySubscribe(params)}
        columns={columns}
      />
      <TableRowUpdateAndAdd
        onSubmit={async (value: SubScribeTableListItem) => {
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
        row={BaseTableListUtil.createRow(action, '订阅', columns)}
        modalVisible={modalVisible}
        values={tableItem}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);
