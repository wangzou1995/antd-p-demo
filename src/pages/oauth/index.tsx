import React, {Component} from "react";
import {FormComponentProps} from "antd/es/form";
import {LoginParamsType} from "@/services/login";
import styles from "@/pages/user/login/style.less";
import LoginComponents from "@/pages/user/login/components/Login";
import {formatMessage, FormattedMessage} from "umi-plugin-react/locale";
import { RouteComponentProps} from 'react-router-dom';

import { notification } from 'antd';


const { Tab, UserName, Password, Submit } = LoginComponents;
interface LoginState  {
  submitting?: boolean;
  callback_url?: string;
  type?: string;
}
 export default class Login extends Component<RouteComponentProps,LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;
   state: LoginState = {
     submitting: false,
     type: "account"
   };
   componentDidMount() {

     // this.setState(
     //   {
     //
     //     systemName: this.props.query,
     //     callback_url: this.props.query
     //   }
     // )
         this.setState(
           {
             callback_url: this.props.history.location["query"]["callback_url"]
           }
         )

   }

  handleSubmit = (err: unknown, values: LoginParamsType) => {
    if (!err) {

    // 调用接口
      if (this.state.callback_url) {
        this.setState({
          submitting: true
        })
        console.log(this.state.callback_url)
        self.location.replace(this.state.callback_url)
      } else {
        notification.error({
          message: `请求参数错误`,
          description: "缺少callback_url参数",
        });
      }

    }
  };


  render() {
    const {submitting,type } = this.state;
    return (
      <div className={styles.oauthmain}>
        <LoginComponents
          defaultActiveKey={type}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          <Tab key="account" tab={formatMessage({ id: 'user-login.login.tab-login-credentials' })}>
            <UserName
              name="username"
              placeholder={`${formatMessage({ id: 'user-login.login.userName' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.userName.required' }),
                },
              ]}
            />
            <Password
              name="password"
              placeholder={`${formatMessage({ id: 'user-login.login.password' })}`}
              rules={[
                {
                  required: true,
                  message: formatMessage({ id: 'user-login.password.required' }),
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Tab key="iphone" tab={formatMessage({ id: 'user-login.login.tab-login-mobile' })}></Tab>
          <div>
            <a style={{ float: 'right' }} href="">
              <FormattedMessage id="user-login.login.forgot-password" />
            </a>
          </div>
          <Submit loading={submitting}>
            <FormattedMessage id="user-login.login.login" />
          </Submit>

        </LoginComponents>
      </div>
    );
  }
}
