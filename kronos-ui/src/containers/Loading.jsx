import React from "react";

import { Layout, Icon } from "antd";

const Loading = () => {
  return (
    <Layout>
      <Layout.Content>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100vh"
          }}
        >
          <Icon type="loading" />
          <p>Loading...</p>
        </div>
      </Layout.Content>
    </Layout>
  );
};

export default Loading;
