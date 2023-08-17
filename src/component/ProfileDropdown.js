import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";

const profileSubMenu = [
  {
    icon: "bx bxs-user-circle bx-sm",
    name: "My Account",
    to: "/personal-info",
  },
  {
    icon: "bx bx-shopping-bag bx-sm",
    name: "My orders",
    to: "/my-orders",
  },
  {
    icon: "bx bx-cart-add bx-sm",
    name: "shopping cart",
    to: "/shopping-cart",
  },
  {
    icon: "bx bx-gift bx-sm",
    name: "coupons",
    to: "/coupons",
  },
];

export default function ProfileDropdown({
  anchorEl,
  handleClose,
  picture,
  username,
  logout,
}) {
  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.22))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={handleClose}
          className="capitalize"
          sx={{ px: 3, gap: 1, fontWeight: 600 }}
        >
          <Avatar src={picture} alt={username} /> {username}
        </MenuItem>
        <Divider />
        {profileSubMenu.map((item, index) => {
          return (
            <MenuItem
              onClick={() => {
                navigate(`${item.to}`);
                handleClose();
              }}
              key={index}
              className="capitalize"
              sx={{ px: 3, py: "10px", gap: 1 }}
            >
              <ListItemIcon>
                <i className={`${item.icon}`}></i>
              </ListItemIcon>
              {item.name}
            </MenuItem>
          );
        })}

        <MenuItem
          onClick={logout}
          className="capitalize"
          sx={{ px: 3, py: "10px", gap: 1, color: "#2E7D32", fontWeight: 600 }}
        >
          <ListItemIcon>
            <i className="bx bx-power-off bx-sm text-secondary-button"></i>
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
