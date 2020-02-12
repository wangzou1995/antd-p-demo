import React, {Component} from "react";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {Card} from "antd";

export interface UserInfoProps {
  loginname?: string;
  username?: string;
  mobile?: string;
  email?: string;
  qq?: string;
  wechat?: string;
}

class App extends Component<UserInfoProps, any> {
  render() {
    return (
      <PageHeaderWrapper title={false}>
        <Card bordered={false}>
          我的订单
        </Card>
      </PageHeaderWrapper>
    )
  }
}
export default App
