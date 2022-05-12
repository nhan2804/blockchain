import React, { useEffect, useMemo, useState } from "react";
import { Layout, Menu, Breadcrumb, Result, Button, Tabs, Table } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useAccount from "../../hooks/useAccount";
import CreateCharity from "../charity/create";
import { ethers } from "ethers";
import DemoDualAxes from "../../components/Chart";
const { Header, Content, Footer, Sider } = Layout;
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const HomePage = () => {
  const { account, balance, getAllCharity, charities } = useAccount();
  // getAllCharity();
  useEffect(() => {
    setInterval(() => {
      getAllCharity();
    }, 3000);
  }, []);
  const dataChart = useMemo(() => {
    let rs = [];
    charities?.forEach((e) => {
      rs[e?.donor] = {
        address: e?.donor,
        value: (rs[e?.donor]?.value || 0) + e?.value,
        count: (rs[e?.donor]?.count || 0) + 1,
      };
    });
    let sx = [];
    const a = Object.keys(rs).forEach((k) => {
      const el = rs[k];
      console.log({ el });
      const nel = {
        ...el,
        value: parseInt(ethers.utils.formatEther(el?.value)),
        address: "..." + el?.address?.slice(-7),
      };
      sx.push(nel);
    });
    return sx;
  }, [charities]);
  console.log({ dataChart });
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Address WM",
      dataIndex: "donor",
      key: "donor",
    },
    {
      title: "Tin nhắn để lại",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Số lượng ETH",
      dataIndex: "value",
      key: "value",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.value - b.value,
      render: (txt) => {
        return ethers.utils.formatEther(txt) + " Eth";
      },
    },
  ];

  console.log(charities);
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            Quyên góp
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Biểu đồ">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<TeamOutlined />} title="Code">
            <Menu.Item key="6">Team 1</Menu.Item>
            <Menu.Item key="8">Team 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="9" icon={<FileOutlined />}>
            Xem thống kê tất cả
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="header">
          <div className="logo" />
          <Menu
            // items={
            //   <Menu.Item key="1" icon={<PieChartOutlined />}>
            //     Option 1
            //   </Menu.Item>
            // }
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item>Quyên góp</Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            <Tabs defaultActiveKey="1" onChange={() => {}}>
              <TabPane tab="Kết nối" key="1">
                {!account ? (
                  <Result
                    status="warning"
                    title="Hiện tại bạn chưa kết nối với chúng tôi, hệ thống sẽ tự động kết nối, vui lòng bấm vào nút bên dưới để tiếp tục!."
                    extra={
                      <Button type="primary" key="console">
                        Kết nối ngay!
                      </Button>
                    }
                  />
                ) : (
                  <Result
                    status="success"
                    title="Yay! Thành công, đi đến bảng điều khiển ngay!"
                    subTitle={`[Your Address]${account}, [Your Balance]${balance}`}
                    extra={[
                      <Button type="primary" key="console">
                        Đi đến bảng điều khiển
                      </Button>,
                      <Button key="buy">Quay lại</Button>,
                    ]}
                  />
                )}
              </TabPane>
              <TabPane tab="Quyên góp" key="2">
                <CreateCharity />
              </TabPane>
              <TabPane tab="Thống kê" key="3">
                <Table dataSource={charities} columns={columns} />;
              </TabPane>
              <TabPane tab="Biểu đồ" key="4">
                <DemoDualAxes data={dataChart} />
              </TabPane>
              <TabPane tab="Tracking số tiền" key="5">
                <p>
                  Last action :{" "}
                  <a href="https://etherscan.io/tx/0xd6124350c90e6f54099b50dfb46efb45a22f10c06e7e0b2e5266e883ee920c8c">
                    https://etherscan.io/tx/0xd6124350c90e6f54099b50dfb46efb45a22f10c06e7e0b2e5266e883ee920c8c
                  </a>
                </p>
              </TabPane>
            </Tabs>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>©2022 Created by NNN</Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
