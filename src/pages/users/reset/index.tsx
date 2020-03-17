import React, {Component} from "react";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Button, Card, Form, Input} from "antd";
import {formatMessage, FormattedMessage} from "umi-plugin-react/locale";
import FormItem from "antd/es/form/FormItem";

import {FormComponentProps} from "antd/es/form";
import Search from "antd/es/input/Search";
interface ResetProps extends FormComponentProps{
  submitting: boolean;
}
class Reset extends Component<ResetProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 请求修改
        console.log(values)
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
    return(
      <PageHeaderWrapper title="修改密码">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.tenantcode.label" />}
            >
              {getFieldDecorator('tenantcode', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'formandbasic-form.tenantcode.required' }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({ id: 'formandbasic-form.loginname.placeholder' })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.loginname.label" />}
            >
              {getFieldDecorator('loginname', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'formandbasic-form.loginname.required' }),
                  },
                ],
              })(
                <Input
                  placeholder={formatMessage({ id: 'formandbasic-form.loginname.placeholder' })}
                />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.mobile.label" />}
            >
              {getFieldDecorator('mobile', {
                rules: [
                  {
                    required: true,
                    message: formatMessage({ id: 'formandbasic-form.mobile.required' }),
                  },
                ],
              })(
                <Search
                placeholder={formatMessage({ id: 'formandbasic-form.mobile.placeholder' })}
                enterButton="获取验证码"
                onSearch={value => console.log(value)}
                />

              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.verycode.label" />}
            >
              <Input
                      placeholder={formatMessage({ id: 'formandbasic-form.verycode.placeholder' })}
              />
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<FormattedMessage id="formandbasic-form.newpassword.label" />}
            >
              {getFieldDecorator('passwprd', {
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
            <FormItem {...submitFormLayout} style={{ marginTop: 32, textAlign: 'right' }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <FormattedMessage id="formandbasic-form.form.submit" />
              </Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    )
  }}
const index = Form.create()(Reset);
export default index;
