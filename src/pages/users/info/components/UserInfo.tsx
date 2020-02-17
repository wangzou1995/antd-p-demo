import React, {Component} from "react";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import { FormattedMessage, formatMessage } from 'umi-plugin-react/locale';
import { FormComponentProps } from 'antd/es/form';
import {Button, Card, Form, Input, Spin} from "antd";
import { connect } from 'dva';
const FormItem = Form.Item;
import { ConnectProps, ConnectState } from '@/models/connect';
import { CurrentMerchantUser } from '@/models/merchantUser';
export interface UserInfoProps extends ConnectProps, FormComponentProps {
  submitting?: boolean;
  currentUser?: CurrentMerchantUser;
}


class UserInfo extends Component<UserInfoProps> {
  handleSubmit = (e: React.FormEvent) => {
    const { form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        // 请求修改
        const { dispatch } = this.props;
        dispatch({
          type: 'merchantUser/updateMerchantUserInfo',
          payload: {
            entity: {...values},
          },
        });
      }
    });
  };
  render() {
    const { submitting, currentUser } = this.props;
    console.log('userInfo', currentUser)
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
      currentUser && currentUser.loginname ?<PageHeaderWrapper title="个人信息维护">
        <Card bordered={false}>
            <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
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
                  initialValue: currentUser?.loginname
                })(
                  <Input disabled={true}
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
                  initialValue: currentUser?.nickname
                })(
                  <Input
                    placeholder={formatMessage({ id: 'formandbasic-form.nickname.placeholder' })}
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
                  initialValue: currentUser?.mobile
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
                  initialValue: currentUser?.email
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
                  initialValue: currentUser?.qq
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
                  initialValue: currentUser?.wechat
                })(
                  <Input
                    placeholder={formatMessage({ id: 'formandbasic-form.wechat.placeholder' })}
                  />,
                )}
              </FormItem>
              <FormItem {...submitFormLayout} style={{ marginTop: 32, textAlign: 'right'}}>
                <Button type="primary" htmlType="submit" loading={submitting}>
                  <FormattedMessage id="formandbasic-form.form.submit" />
                </Button>
                {/*<Button style={{ marginLeft: 8 }}>*/}
                {/*  <FormattedMessage id="formandbasic-form.form.refresh" />*/}
                {/*</Button>*/}
              </FormItem>
            </Form>
        </Card>
      </PageHeaderWrapper> : (
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      )
    )
  }
}
export default Form.create<UserInfoProps>()(
 connect(({loading,merchantUser }: { loading: { effects: { [key: string]: boolean }},
            merchantUser: ConnectState['merchantUser']}
                       ) => ({
      currentUser: merchantUser.currentUser,
      submitting: loading.effects['formAndbasicForm/submitRegularForm'],
    })
 )(UserInfo));
