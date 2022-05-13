import { Button, Form, Input, message, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateProfile } from "../../redux/apiRequest";
import MetaData from "../MetaData";
import { loginSuccess } from "../../redux/authSlice";
import { createAxios } from "../../components/createInstance";
import Loader from "../../components/Loader";
import "./index.scss";

const { Title } = Typography;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Profile = () => {
  const [form] = Form.useForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const curUser = useSelector((state) => state.auth.login.currentUser);
  const profile = useSelector((state) => state.user.profile);
  let axiosJWT = createAxios(curUser, dispatch, loginSuccess);
  const handleOk = (id) => {
    if (password !== "") {
      const newUser = {
        name: name,
        email: email,
        password: password,
      };
      updateProfile(
        curUser.accessToken,
        dispatch,
        id,
        newUser,
        navigate,
        axiosJWT
      );
      message.success("Update profile successfully");
    } else {
      const newUser = {
        name: name,
        email: email,
      };
      updateProfile(
        curUser.accessToken,
        dispatch,
        id,
        newUser,
        navigate,
        axiosJWT
      );
      message.success("Update profile successfully");
    }
  };

  useEffect(() => {
    if (!curUser) {
      navigate("/");
    }
    if (!profile.user&&curUser) {
      getUserProfile(curUser.accessToken, dispatch, curUser._id, axiosJWT);
    }
    if (profile.user) {
      setName(profile.user.name);
      setEmail(profile.user.email);
    }
  }, [profile.isFetching, curUser]);

  return (
    <>
      {profile.isFetching ? (
        <>
          <MetaData title={`Profile ${profile.user.name}`} />
          <Loader />
        </>
      ) : (
        <>
          <Title className="title">Profile</Title>
          <Form
            {...formItemLayout}
            form={form}
            name="updateProfile"
            onFinish={() => handleOk(profile.user._id)}
            scrollToFirstError
            className="update-profile-form"
          >
            <Form.Item
              // name="name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input your name!",
                  whitespace: true,
                },
              ]}
            >
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item
              // name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              // name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                  min: 8,
                },
              ]}
              hasFeedback
            >
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  // required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }

                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password  />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Update profile
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </>
  );
};

export default Profile;
