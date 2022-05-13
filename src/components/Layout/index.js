import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import FooterComponent from "../Footer";
import HeaderComponent from "../Header";
import "./index.scss";

const {  Content } = Layout;

const LayoutComponent = () => (
  <Layout className="layout">
    <HeaderComponent></HeaderComponent>
    <Content style={{ padding: "0 50px" }}>
      <Outlet />
    </Content>
    <FooterComponent/>
  </Layout>
);

export default LayoutComponent;
