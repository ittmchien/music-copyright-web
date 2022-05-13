import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  getUserProfile,
  updateUser,
} from "../../../redux/apiRequest";
import { createAxios } from "../../../components/createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Switch,
  Modal,
  Table,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import Loader from "../../../components/Loader";
import MetaData from "../../../components/MetaData";

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

const Users = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.auth.login.currentUser);
  const userList = useSelector((state) => state.admin.users);
  let axiosJWT = createAxios(curUser, dispatch, loginSuccess);
  const profile = useSelector((state) => state.user.profile);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdate = (id, data) => {
    updateUser(curUser.accessToken, dispatch, id, data, axiosJWT);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (id) => {
    if (password !== "") {
      const newUser = {
        name: name,
        email: email,
        password: password,
      };
      updateUser(curUser.accessToken, dispatch, id, newUser, axiosJWT);
      message.success("Update user successfully");
    } else {
      const newUser = {
        name: name,
        email: email,
      };
      updateUser(curUser.accessToken, dispatch, id, newUser, axiosJWT);
      message.success("Update user successfully");
    }

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Role",
      key: "admin",
      render: (item) => (
        <Switch
          checkedChildren="Admin"
          unCheckedChildren="User"
          checked={item.admin}
          onChange={() => {
            handleUpdate(item._id, { ...item, admin: !item.admin });
            message.success("Update role successfully");
          }}
        />
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (item) => (
        <Switch
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={item.status}
          onChange={() => {
            handleUpdate(item._id, { ...item, status: !item.status });
            message.success("Update status successfully");
          }}
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      width: 100,
      fixed: "right",
      render: (item) => (
        <Space size="middle">
          <Button
            type="link"
            onClick={() => {
              getUserProfile(curUser.accessToken, dispatch, item._id, axiosJWT);
              showModal();
            }}
          >
            Update
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (profile.user) {
      setName(profile.user.name);
      setEmail(profile.user.email);
    }
    if (!userList.allUsers) {
      getAllUsers(curUser.accessToken, dispatch, axiosJWT);
    }
  }, [profile.isFetching]);

  return (
    <>
      <MetaData title="Users | Admin" />
      {userList.isFetching ? (
        <Loader />
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={userList.allUsers}
            pagination={{
              defaultCurrent: 1,
              showSizeChanger: true,
              hideOnSinglePage: true,
              pageSize: 10,
            }}
            rowKey={(user) => userList.allUsers.indexOf(user)}
          />
          {profile.isFetching ? (
            <Loader />
          ) : (
            <Modal
              title={`Update user ${name}`}
              visible={isModalVisible}
              onOk={() => handleOk(profile.user._id)}
              onCancel={handleCancel}
            >
              <Form
                {...formItemLayout}
                form={form}
                name="updateUser"
                // onFinish={()=>{handleSubmit(id)}}
                scrollToFirstError
                className="update-user-form"
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
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
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
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
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
              </Form>
            </Modal>
          )}
        </>
      )}
    </>
  );
};

export default Users;
