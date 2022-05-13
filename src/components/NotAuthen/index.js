import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const NotAuthen = () => (
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page. Please login or click back home"
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
);
export default NotAuthen;
