import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { Layout, Menu, Icon } from 'antd';

import largeLogo from '../assets/images/logo.png';

const { Sider } = Layout;

class Nav extends Component {
    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
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
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 128,
                            width: '100%',
                        }}
                    >
                        <img style={{ height: 128 }} src={largeLogo} title="" alt="" />
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}>
                        <Menu.Item key="/">
                            <Link className="nav-link" to="/">
                                <Icon type="dashboard" />
                                <span>Today</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/records">
                            <Link className="nav-link" to="/records">
                                <Icon type="database" />
                                <span>Records</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/projects">
                            <Link className="nav-link" to="/projects">
                                <Icon type="bars" />
                                <span>Projects</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="/report-week">
                            <Link className="nav-link" to="/report-week">
                                <Icon type="calendar" />
                                <span>Reporting</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>{children}</Layout>
            </Layout>
        );
    }
}

export default withRouter(Nav);
