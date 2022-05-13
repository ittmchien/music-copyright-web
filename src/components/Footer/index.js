import { Layout } from "antd";
import {
  FacebookOutlined,
  InstagramOutlined,
  GithubOutlined,
  TwitterOutlined,
} from "@ant-design/icons";

const { Footer } = Layout;

const FooterComponent = () => (
  <>
    <Footer style={{ textAlign: "center" }}>
      Music Copyright Checker ©2022 Created by Tran Minh Chien.
      <br /> Contact Us:{" "}
      <a href="https://www.facebook.com/noname30122000" target="_blank">
        <FacebookOutlined />
      </a>{" "}
      <a href="https://twitter.com/namvoi30122000" target="_blank">
        <TwitterOutlined />
      </a>{" "}
      <a href="https://github.com/noname30122000" target="_blank">
        <GithubOutlined />
      </a>{" "}
      <a href="https://www.instagram.com/chien_doi/" target="_blank">
        <InstagramOutlined />
      </a>
    </Footer>
  </>
);
export default FooterComponent;
