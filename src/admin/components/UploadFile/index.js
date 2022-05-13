import React, { useEffect } from "react";
import { Upload, message, Table } from "antd";
import "./index.scss";
import { InboxOutlined } from "@ant-design/icons";
import { getListFile } from "../../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../../../components/createInstance";
import { loginSuccess } from "../../../redux/authSlice";
import Loader from "../../../components/Loader";
import MetaData from "../../../components/MetaData";

const { Dragger } = Upload;
const API_UPLOAD = "http://localhost:4000/v1/upload";

const UploadFile = () => {
  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.auth.login.currentUser);
  const listFile = useSelector((state) => state.file.listFile);
  let axiosJWT = createAxios(curUser, dispatch, loginSuccess);

  const onChange = (info) => {
    const { status } = info.file;
    if (status !== "uploading") {
    }
    if (status === "done") {
      message.success(`${info.file.name} file upload success.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      fixed: "left",
    },
  ];

  useEffect(() => {
    if (!listFile.list) {
      getListFile(curUser.accessToken, dispatch, axiosJWT);
    }
  }, [listFile.isFetching]);

  return (
    <>
      <MetaData title="Music | Admin" />
      {listFile.isFetching ? (
        <Loader />
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={listFile.list}
            pagination={{
              defaultCurrent: 1,
              showSizeChanger: true,
              hideOnSinglePage: true,
              pageSize: 10,
            }}
            rowKey={(file) => listFile.list.indexOf(file)}
          />
          <Dragger
            maxCount={10}
            onChange={onChange}
            name="file"
            multiple={true}
            action={API_UPLOAD}
            accept=".wav"
            className="upload-file"
            progress={{
              strokeColor: {
                "0%": "#108ee9",
                "100%": "#87d068",
              },
              strokeWidth: 3,
              format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to check copyright
            </p>
            <p className="ant-upload-hint"></p>
          </Dragger>
        </>
      )}
    </>
  );
};

export default UploadFile;
