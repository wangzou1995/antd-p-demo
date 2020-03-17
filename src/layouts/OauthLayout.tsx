import {  MenuDataItem} from '@ant-design/pro-layout';
import { Helmet } from 'react-helmet';
import Link from 'umi/link';
import React from 'react';
import { connect } from 'dva';


import { ConnectProps, ConnectState } from '@/models/connect';
import styles from './OauthLayout.less';

export interface UserLayoutProps extends ConnectProps {
  breadcrumbNameMap: { [path: string]: MenuDataItem };
}
// http://localhost:8000/oauth/login?systemName=%E6%95%B0%E6%8D%AE%E5%86%B3%E7%AD%96&callback_url=http://www.baidu.com
const OauthLayout: React.FC<UserLayoutProps> = props => {
  const {
    children,
    history
  } = props;


  return (
    <>
      <Helmet>
        <title>统一认证登录</title>
        <meta name="description" content={"统一认证中心"} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.lang}>
          <span className={styles.title}>{history?.location["query"]["systemName"]}</span>
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                {/*<span className={styles.title}>商户控制台</span>*/}

              </Link>
            </div>
          </div>
          {children}
        </div>
        {/*<DefaultFooter />*/}
      </div>
    </>
  );
};

export default connect(({ settings }: ConnectState) => ({
  ...settings,
}))(OauthLayout);
