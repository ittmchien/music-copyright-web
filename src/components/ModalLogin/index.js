import { Form, Input, Modal, Button, Checkbox, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import "./index.scss";
import { clearAuthMessage } from "../../redux/authSlice";

const ModalLogin = ({ modalVisible }) => {
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.auth.login.currentUser);
  const msg = useSelector((state) => state.auth.msg);
  const register = useSelector((state) => state.auth.register);
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleOk = () => {
    const newUser = {
      email: email,
      password: password,
    };
    loginUser(newUser, dispatch);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    if (msg.message) {
      message.error(msg.message);
      dispatch(clearAuthMessage());
    }
    setVisible(modalVisible);
    if (curUser || register.error) {
      setVisible(false);
    }
  }, [modalVisible, curUser, msg]);
  return (
    <>
      <Modal
        title="Login"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleOk}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your E-mail!",
              },
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined className="site-form-item-icon" />}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or{" "}
            <Link to="/register" onClick={handleCancel} replace>
              register now!
            </Link>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalLogin;
