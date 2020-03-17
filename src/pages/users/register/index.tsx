import React, {Component} from "react";
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { FormComponentProps } from 'antd/es/form';
import {Button, Form, Input} from "antd";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
const FormItem = Form.Item;
export interface UserInfoProps extends FormComponentProps {
  submitting?: boolean;
  loginname?: string;
  nickname?: string;
  mobile?: string;
  email?: string;
  qq?: string;
  wechat?: string;
  mobileverify?: boolean;
  emailverify? :boolean;
  tenantcode?: string;
  password?: string;
}


class UserInfo extends Component<UserInfoProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 请求 注册

      }
    });
  };

  handleCfmPwd({rules, value, callback}: { rules: any, value: any, callback: any }) {
    let loginpass = this.props.form.getFieldValue('userpassword');
    if (loginpass && loginpass !== value) {
      callback(new Error('两次密码输入不一致'))
    } else {

      // Note: 必须总是返回一个 callback，否则 validateFieldsAndScroll 无法响应
      callback();
    }
  }
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
      <PageHeaderWrapper title="用户注册">
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
          label={<FormattedMessage id="formandbasic-form.nickname.label" />}
        >
          {getFieldDecorator('nickname', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.nickname.required' }),
              },
            ],
          })(
            <Input
              placeholder={formatMessage({ id: 'formandbasic-form.nickname.placeholder' })}
            />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="formandbasic-form.userpassword.label" />}
        >
          {getFieldDecorator('userpassword', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.userpassword.required' }),
              },
            ],
          })(
            <Input type="password"
              placeholder={formatMessage({ id: 'formandbasic-form.userpassword.placeholder' })}
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
              {
                validator:(rules,value,callback)=>
                {this.handleCfmPwd({rules: rules, value: value, callback: callback})}
              }
            ],
          })(
            <Input type="password"
                   placeholder={formatMessage({ id: 'formandbasic-form.subpassword.placeholder' })}
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
            <Input
              placeholder={formatMessage({ id: 'formandbasic-form.mobile.placeholder' })}
            />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="formandbasic-form.email.label" />}
        >
          {getFieldDecorator('email', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.email.required' }),
              },
            ],
          })(
            <Input
              placeholder={formatMessage({ id: 'formandbasic-form.email.placeholder' })}
            />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="formandbasic-form.qq.label" />}
        >
          {getFieldDecorator('qq', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.qq.required' }),
              },
            ],
          })(
            <Input
              placeholder={formatMessage({ id: 'formandbasic-form.qq.placeholder' })}
            />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={<FormattedMessage id="formandbasic-form.wechat.label" />}
        >
          {getFieldDecorator('wechat', {
            rules: [
              {
                required: true,
                message: formatMessage({ id: 'formandbasic-form.wechat.required' }),
              },
            ],
          })(
            <Input
              placeholder={formatMessage({ id: 'formandbasic-form.wechat.placeholder' })}
            />,
          )}
        </FormItem>
        <FormItem {...submitFormLayout} style={{ marginTop: 32, textAlign: 'right'}}>
          {/*<Button type="primary" style={{marginRight: '10px'}} htmlType="reset" >返回登录</Button>*/}
          <Button type="primary" htmlType="submit" loading={submitting}>
            <FormattedMessage id="formandbasic-form.form.addUser" />
          </Button>

          {/*<Button style={{ marginLeft: 8 }}>*/}
          {/*  <FormattedMessage id="formandbasic-form.form.refresh" />*/}
          {/*</Button>*/}
        </FormItem>
      </Form>
      </PageHeaderWrapper>)
  }
}
const index = Form.create()(UserInfo);
export default index;
