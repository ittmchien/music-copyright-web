import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Space,
  Typography,
  Upload,
  message,
  Modal,
  Button,
  Spin,
} from "antd";
import "./index.scss";
import podcasts from "../../assets/podcasts_200px.png";
import headphones from "../../assets/headphones_200px.png";

import {
  InboxOutlined,
  CopyrightOutlined,
  QuestionOutlined,
  SearchOutlined,
  CheckOutlined,
  RollbackOutlined,
  SmileOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import MetaData from "../MetaData";

const { Dragger } = Upload;
const API_UPLOAD = "http://localhost:8080/upload";
const { Title } = Typography;

const Home = () => {
  const [resp, setResp] = useState();
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState("Content of the modal");

  const showModal = () => {
    setModalText("Search on Youtube");
    setVisible(true);
  };

  const handleOk = () => {
    setModalText("Searching...");
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setModalText("Search on Youtube");
    setVisible(false);
  };
  const onChange = (info) => {
    const { status } = info.file;
    setLoading(true);
    if (status !== "uploading") {
      setResp(info.file);
      setLoading(false);
    }
    if (status === "done") {
      if (info.file.response.isExisted) {
        message.warning(
          `${info.file.name} is copyrighted ${info.file.response.fileName}.`,
          5
        );
      } else {
        message.success(`${info.file.name} isn't copyrighted.`, 5);
      }
      showModal();
    } else if (status === "error") {
      message
        .error(`${info.file.name} file upload failed.`, 5)
        .then(
          () =>
            message.warning(
              "Please upload a file having extensions .wav only!"
            ),
          5
        );
      showModal();
    }
  };

  return (
    <>
      <MetaData title="Music Copyright Checker" />

      <Dragger
        maxCount={1}
        onChange={onChange}
        name="file"
        multiple={false}
        action={API_UPLOAD}
        accept=".wav"
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
          {!loading ? <InboxOutlined /> : <Spin size="large" />}
        </p>
        <p className="ant-upload-text">
          {!loading ? (
            <> Click or drag file to this area to check copyright</>
          ) : (
            <>Your file is checking copyright. Please wait a minute...</>
          )}
        </p>
        <p className="ant-upload-hint"></p>
      </Dragger>

      <Title className="title" level={2}>
        Music Copyright Tool Check
      </Title>
      <Title level={3} style={{ textAlign: "center" }}>
        Free to use with .wav file
      </Title>

      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Card size="small">
          <Title className="title" level={3}>
            Why should check copyright music?
          </Title>
          <Row justify="space-evenly">
            <Col span={6}>
              <div className="image-home">
                <img alt="img1" src={podcasts} />
              </div>
              <div className="text-home">
                <span className="text-large">Support for streamer</span>{" "}
                <div>to avoid copyright before live streaming</div>
              </div>
            </Col>
            <Col span={6}>
              <div className="image-home">
                <img alt="img2" src={headphones} />
              </div>
              <div className="text-home">
                <span className="text-large">Help you know</span>
                <div>
                  if the song, what you are listening, is the original music?
                </div>
              </div>
            </Col>
          </Row>
        </Card>
      </Space>
      {!resp ? (
        <></>
      ) : (
        <>
          {resp.status === "error" ? (
            <Modal
              title={`Checked Error`}
              visible={visible}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Return <RollbackOutlined />
                </Button>,
              ]}
            >
              <p style={{ color: "#FF4D4F" }}>
                <b>
                  Error <QuestionOutlined style={{ color: "#FF4D4F" }} />
                </b>
              </p>
              <p>
                <b>Please upload a file having extensions ".wav" only!</b>
              </p>
            </Modal>
          ) : (
            <>
              {!resp.response.isExisted ? (
                <>
                  <Modal
                    title={`Checked successfully`}
                    visible={visible}
                    onCancel={handleCancel}
                    footer={[
                      <Button key="back" onClick={handleCancel}>
                        Return <RollbackOutlined />
                      </Button>,
                    ]}
                  >
                    <p style={{ color: "#52C41A" }}>
                      <b>
                        NOT FOUND <SmileOutlined style={{ color: "#52C41A" }} />
                      </b>
                    </p>
                    <p>
                      <b>
                        This music isn't copyright <CheckOutlined />
                      </b>
                    </p>
                    <p>
                      <b>File checked: {resp.name}</b>
                    </p>
                  </Modal>
                </>
              ) : (
                <>
                  <Modal
                    title={`Checked successfully `}
                    visible={visible}
                    onCancel={handleCancel}
                    footer={[
                      <Button key="back" onClick={handleCancel}>
                        Return <RollbackOutlined />
                      </Button>,
                      <Button
                        icon={<SearchOutlined />}
                        key="link"
                        href={`https://www.youtube.com/results?search_query=${resp.response.fileName.replace(
                          ".wav",
                          ""
                        )}`}
                        type="primary"
                        loading={confirmLoading}
                        onClick={handleOk}
                        target="_blank"
                      >
                        {modalText} <SearchOutlined />
                      </Button>,
                    ]}
                  >
                    <p style={{ color: "#FAAD14" }}>
                      <b>
                        FOUND <FrownOutlined style={{ color: "#FAAD14" }} />
                      </b>
                    </p>
                    <p>
                      <b>
                        This music is COPYRIGHT <CopyrightOutlined />
                      </b>
                    </p>
                    <p>
                      <b>
                        Song:{" "}
                        <i>{resp.response.fileName.replace(".wav", "")}</i>
                      </b>
                    </p>
                  </Modal>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Home;
