import React, {Component} from "react";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { FormComponentProps } from 'antd/es/form';
import {Button, Card, Form, Input} from "antd";
import { connect } from 'dva';
import {ConnectProps} from "@/models/connect";
const FormItem = Form.Item;
export interface UserInfoProps extends FormComponentProps, ConnectProps  {
  submitting: boolean;
  loginname?: string;
  nickname?: string;
  mobile?: string;
  email?: string;
  qq?: string;
  wechat?: string;
}

class UserInfo extends Component<UserInfoProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 请求修改
        console.log(values)
        const { dispatch } = this.props;
        dispatch({
          type: 'merchantUser/updatePassword',
          payload: {
            entity: { password: values.password,
              password1: values.newpassword,
              password2: values.subpassword},
          },
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };
    return (
      <PageHeaderWrapper title="密码重置">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.password.label" />}
            >
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'formandbasic-form.password.required' }),
                  },
                ],
              })(
                <Input  type="password"
                  placeholder={formatMessage({ id: 'formandbasic-form.password.placeholder' })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.newpassword.label" />}
            >
              {getFieldDecorator('newpassword', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'formandbasic-form.newpassword.required' }),
                  },
                ],
              })(
                <Input  type="password"
                  placeholder={formatMessage({ id: 'formandbasic-form.newpassword.placeholder' })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.subpassword.label" />}
            >
              {getFieldDecorator('subpassword', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'formandbasic-form.subpassword.required' }),
                  },
                ],
              })(
                <Input type="password"
                  placeholder={formatMessage({ id: 'formandbasic-form.subpassword.placeholder' })}
                />,
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32, textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="formandbasic-form.form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default Form.create<UserInfoProps>()(
  connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
    submitting: loading.effects['formAndbasicForm/submitRegularForm'],
  }))(UserInfo),
);

