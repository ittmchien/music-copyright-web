import { Button, Layout } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ModalLogin from "../ModalLogin";
import UserDropdown from "../UserDropdown";
import "./index.scss";
import { ImportOutlined, UserOutlined } from "@ant-design/icons";

const { Header } = Layout;

const HeaderComponent = () => {
  const curUser = useSelector((state) => state.auth.login.currentUser);
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible({ visible: !visible });
  };
  return (
    <Header>
      <Link to="/">
        <span className="logo-header">
          MUSIC <span className="logo-copyright">COPYRIGHT CHECKER</span>
        </span>
      </Link>
      {curUser ? (
        <Button
          // icon={<UserOutlined />}
          className="user-dropdown"
          type="text"
          style={{ color: "white" }}
        >
          <UserDropdown />
        </Button>
      ) : (
        <Button
          icon={<ImportOutlined />}
          onClick={() => {
            showModal();
          }}
          className="btnLoginRegis"
        >
          Login/Register
        </Button>
      )}

      <ModalLogin modalVisible={visible} />
    </Header>
  );
};

export default HeaderComponent;
