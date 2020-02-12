import React from "react";
// pageHeaderWrapper 页头显示路径
import {PageHeaderWrapper} from "@ant-design/pro-layout";

const BaseIndex: React.FC<{}> = () => {
  return <PageHeaderWrapper title={false}>
             <p style={{textAlign: 'center'}}>测试</p>
         </PageHeaderWrapper>
};
export default BaseIndex;
