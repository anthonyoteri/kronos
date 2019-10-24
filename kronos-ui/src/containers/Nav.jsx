import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";

import largeLogo from "../assets/images/logo.png";

const { Header, Sider } = Layout;

class Nav extends Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { children, location } = this.props;
    const { collapsed } = this.state;

    return (
      <Layout hasSider>
        <Sider trigger={null} collapsable="true" collapsed={collapsed}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 128,
              width: "100%"
            }}
          >
            <img style={{ height: 128 }} src={largeLogo} title="" alt="" />
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["/"]}
            selectedKeys={[location.pathname]}
          >
            <Menu.Item key="/">
              <Link className="nav-link" to="/">
                <Icon type="dashboard" />
                <span>Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/settings">
              <Link className="nav-link" to="/settings">
                <Icon type="setting" />
                <span>Settings</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/log">
              <Link className="nav-link" to="/log">
                <Icon type="reconciliation" />
                <span>Log</span>
              </Link>
            </Menu.Item>
            <Menu.ItemGroup title="Reporting">
              <Menu.Item key="/report-week">
                <Link className="nav-link" to="/report-week">
                  <Icon type="calendar" />
                  <span>Week</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="/report-month">
                <Link className="nav-link" to="/report-month">
                  <Icon type="calendar" />
                  <span>Month</span>
                </Link>
              </Menu.Item>
            </Menu.ItemGroup>
          </Menu>
        </Sider>
        <Layout>
          <Header className="header">
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          {children}
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Nav);
