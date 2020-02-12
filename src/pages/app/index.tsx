import {Button, Divider, Form, message,} from 'antd';
import React, {useRef, useState} from 'react';
import {FormComponentProps} from 'antd/es/form';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import ProTable, {ProColumns, ActionType} from '@ant-design/pro-table';
import {queryApp, addApp} from "@/pages/app/service";
import {AppTableListItem} from "@/pages/app/data";
import {updateApp} from "@/pages/app/service";
import TableRowUpdateAndAdd from '@/components/Base/TableRowUpdateAndAdd';
import Operate from '@/components/Base/Opreate';
import BaseTableListUtil from '@/components/Base/util';

interface TableListProps extends FormComponentProps {
}
/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: AppTableListItem) => {
  const hide = message.loading('正在配置');
  try {
    await updateApp({
      connectorurl: "",
      currentPage: 0,
      dbtype: "",
      designversionid: 0,
      devicetype: 0,
      id: 0,
      pageSize: 0,
      price: 0,
      pricestrategy: 0,
      prodcode: "",
      prodname: "",
      publishdate: "",
      status: 0,
      tenantcode: "",
      tenantid: 0,
      tenantname: "",
      updatetime: "",
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
/**
 * 新增节点
 * @param fields
 */
const handleAdd = async (fields: AppTableListItem) => {
  const hide = message.loading('正在配置');
  try {
    await addApp({
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
  const [tableItem, setTableItem] = useState<AppTableListItem>(
    {
      connectorurl: "",
      dbtype: "",
      designversionid: 0,
      devicetype: 0,
      id: 0,
      key: 0,
      price: 0,
      pricestrategy: 0,
      prodcode: "",
      prodname: "",
      publishdate: "",
      status: 0,
      tenantcode: "",
      tenantid: 0,
      tenantname: "",
      updatetime: ""
    }
  );
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<AppTableListItem>[] = [
    {
      title: '产品编号',
      dataIndex: 'prodcode',
    },
    {
      title: '产品名称',
      dataIndex: 'prodname',
    },
    {
      title: '商户号',
      dataIndex: 'tenantcode',
    },
    {
      title: '商户名称',
      dataIndex: 'tenantname',
    },
    {
      title: '发布日期',
      dataIndex: 'publishdate',
      valueType: "dateTime"
    },
    {
      title: '版本',
      dataIndex: 'designversionid',
    },
    {
      title: '版本类型',
      dataIndex: 'status',
    },
    {
      title: '客户端',
      dataIndex: 'devicetype',
      valueEnum: {
        0: { text: '桌面', status: 'Default' },
      }
    },
    {
      title: '费用类型',
      dataIndex: 'pricestrategy',
      valueEnum: {
        0: { text: '免费', status: 'Default' },
      }
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_: any, record: AppTableListItem) => (
        <>
          <a onClick={()=>{
            setTableItem(record);
            handleAction(Operate.Update)
            handleModalVisible(true)
          } }
          >
            编辑
          </a>
          <Divider type="vertical"/>
          <a href="">发布</a>
          <Divider type="vertical"/>
          <a href="">历史版本</a>
          <Divider type="vertical"/>
          <a href="">创建产品说明</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<AppTableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="key"
        toolBarRender={(action, {selectedRows}) => [
          <Button icon="plus" type="primary" onClick={() => {
            handleAction(Operate.Add)
            handleModalVisible(true)
          }}>
            新建
          </Button>
        ]}
        request={params => queryApp(params)}
        columns={columns}
      />
       <TableRowUpdateAndAdd
        onSubmit={async (value: AppTableListItem) => {
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
