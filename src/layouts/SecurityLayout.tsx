import React from 'react';
import { connect } from 'dva';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect } from 'umi';
// import { stringify } from 'querystring';
import { ConnectState, ConnectProps } from '@/models/connect';
import { CurrentMerchantUser } from '@/models/merchantUser';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentMerchantUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'merchantUser/fetchCurrent',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, loading } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    let token =  sessionStorage.getItem("yw_token")
    // const queryString = stringify({
    //   redirect: window.location.href,
    // });

    if ((!token && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!token) {
      return <Redirect to={`/user/login`} />;
    }
    return children;
  }
}

export default connect(({ merchantUser, loading }: ConnectState) => ({
  currentUser: merchantUser.currentUser,
  loading: loading.models.merchantUser,
}))(SecurityLayout);
