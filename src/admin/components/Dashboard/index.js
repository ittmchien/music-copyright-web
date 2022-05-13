import { Statistic, Card, Row, Col } from "antd";
import { FileOutlined, UserOutlined } from "@ant-design/icons";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";

import React, { useEffect, useState } from "react";
import { createAxios } from "../../../components/createInstance";
import { getAllUsers, getListFile } from "../../../redux/apiRequest";
import { loginSuccess } from "../../../redux/authSlice";
import Loader from "../../../components/Loader";
import MetaData from "../../../components/MetaData";

const Dashboard = () => {
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.auth.login.currentUser);
  const userList = useSelector((state) => state.admin.users);
  const listFile = useSelector((state) => state.file.listFile);
  let axiosJWT = createAxios(curUser, dispatch, loginSuccess);
  const [totalUsers, setTotalUsers] = useState();
  const [totalAvailable, setTotalAvailable] = useState();
  const [totalUnavailable, setTotalUnavailable] = useState();
  const [totalMusic, setTotalMusic] = useState();

  useEffect(() => {
    if (!userList.allUsers) {
      getAllUsers(curUser.accessToken, dispatch, axiosJWT);
    } else {
      var avaiable = 0;
      var unavaiable = 0;
      setTotalUsers(userList.allUsers.length);

      for (const user of userList.allUsers) {
        if (user.status === true) avaiable++;
        else unavaiable++;
      }
      setTotalAvailable(avaiable);
      setTotalUnavailable(unavaiable);
    }

    if (!listFile.list) {
      getListFile(curUser.accessToken, dispatch, axiosJWT);
    } else {
      setTotalMusic(listFile.list.length);
    }
  }, [
    userList.dispatch,
    userList.allUsers,
    listFile.list,
    listFile.isFetching,
  ]);

  return (
    <>
      <MetaData title="Dashboard | Admin" />
      {userList.isFetching || listFile.isFetching ? (
        <Loader />
      ) : (
        <div className=" site-statistic-demo-card">
          <Row gutter={24}>
            <Col span={6}>
              <Card bordered={false}>
                <Statistic
                  title="Total Users"
                  value={totalUsers}
                  prefix={<UserOutlined />}
                  style={{ textAlign: "center" }}
                />
              </Card>
            </Col>

            <Col span={6}>
              <Card bordered={false}>
                <Statistic
                  title="Available User"
                  value={totalAvailable}
                  prefix={<UserOutlined />}
                  style={{ textAlign: "center" }}
                  valueStyle={{ color: "#3f8600" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Statistic
                  title="Unavailable User"
                  value={totalUnavailable}
                  prefix={<UserOutlined />}
                  style={{ textAlign: "center" }}
                  valueStyle={{ color: "#cf1322" }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card bordered={false}>
                <Statistic
                  title="Total Music"
                  value={totalMusic}
                  prefix={<FileOutlined />}
                  style={{ textAlign: "center" }}
                />
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
export default Dashboard;
