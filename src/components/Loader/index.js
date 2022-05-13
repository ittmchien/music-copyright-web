import { Spin } from "antd";
import "./index.scss";
const Loader = () => (
  <>
    <div className="example">
      <Spin size="large" tip="Loading..." />
    </div>
  </>
);
export default Loader;
