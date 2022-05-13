import { Layout, Menu } from "antd";
import "./index.scss";
import {
  TeamOutlined,
  DashboardOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

function getItem(key, icon, label) {
  return {
    key,
    icon,
    label,
  };
}

const items = [
  getItem("dashboard", <DashboardOutlined />, "Dashboard"),
  getItem("upload", <CloudUploadOutlined />, "Upload"),
  getItem("users", <TeamOutlined />, "Users"),

];

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let key = location.pathname.split("/");

  const [selectedKeys, setSelectedKeys] = useState(() => {
    let initSelectedKeys = "";
    if (key[2] !== "") {
      initSelectedKeys = key[2];
    }
    return initSelectedKeys;
  });

  const handleSelectedKeys = (item) => {
    navigate(`/admin/${item.key}`);
    setSelectedKeys(item.key);
  };
  useEffect(() => {
    if (location.pathname === "/admin") {
      navigate(`/admin/dashboard`);
      setSelectedKeys("dashboard");
    }
  }, []);

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <Layout
          className="site-layout-background"
          style={{ padding: "24px 0" }}
        >
          <Sider className="site-layout-background" width={200}>
            <Menu
              mode="inline"
              selectedKeys={selectedKeys}
              style={{ height: "100%" }}
              items={items}
              onClick={(item) => handleSelectedKeys(item)}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;
