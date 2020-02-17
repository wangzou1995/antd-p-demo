import {Form, Input, Modal} from 'antd';

import React, {Component} from 'react';
import {FormComponentProps} from "antd/es/form";
import Operate from './Opreate';


const {Item} = Form;

/**
 * 校验规则
 */
export interface Rule {
  required: boolean;
  message: string;
}

/**
 * 表行
 */
export interface TableRow{
  cols: Array<TableCol>,
  title: string;
  action: string
}

/**
 * 表单元格
 */
export interface TableCol {
  name: string;
  label: string;
  rules: Array<Rule>;
}

 interface CreateFormProps<T> extends FormComponentProps {
  modalVisible: boolean;
  onSubmit: (fieldsValue: T) => void;
  onCancel: () => void;
  row: TableRow;
  values: T
}

class TableRowUpdateAndAdd<T> extends Component<CreateFormProps<T>> {
  render() {
    const {modalVisible, form, onSubmit: handleAdd, onCancel, row, values} = this.props;
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd({...values, ...fieldsValue});
      });
    };
    return (
      <Modal
        destroyOnClose
        title={row.title}
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => onCancel()}
      >
        <Form>{
        row.cols && row.cols.map((e) => {
          return <Item key={e.name} labelCol={{span: 5}} wrapperCol={{span: 15}} label={e.label}>
            {
              form.getFieldDecorator(e.name, {rules: e.rules, initialValue: row.action === Operate.Update ? values[e.name]: null })
              (<Input placeholder="请输入"/>)
            }
          </Item>
        })}
        </Form>

      </Modal>
    );
  };
}
export default (Form.create()(TableRowUpdateAndAdd) as any);
