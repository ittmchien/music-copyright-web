import { Menu, Dropdown, Space, Button } from "antd";
import {
  DownOutlined,
  ExportOutlined,
  AreaChartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiRequest";
import { logoutSuccess } from "../../redux/authSlice";
import { createAxios } from "../createInstance";

const UserDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const curUser = useSelector((state) => state.auth.login.currentUser);
  let axiosJWT = createAxios(curUser, dispatch, logoutSuccess);

  const handleLogout = () => {
    logoutUser(curUser.accessToken, dispatch, curUser._id, navigate, axiosJWT);
  };

  const menuItems = [
    {
      label: (
        <Button
          type="text"
          icon={<UserOutlined />}
          onClick={() => navigate("/profile")}
        >
          User Profile
        </Button>
      ),
      key: "2",
    },
    { type: "divider" },
    {
      label: (
        <Button type="text" icon={<ExportOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      ),
      key: "3",
    },
  ];

  const menu = <Menu items={menuItems} />;

  if (curUser.admin) {
    menuItems.unshift({
      label: (
        <Button
          type="text"
          icon={<AreaChartOutlined />}
          onClick={() => navigate("admin/dashboard")}
        >
          Dashboard
        </Button>
      ),
      key: "1",
    });
  }

  return (
    <Dropdown overlay={menu} placement="bottom">
      <Space>
        {curUser.name}
        <DownOutlined />
      </Space>
    </Dropdown>
  );
};
export default UserDropdown;
