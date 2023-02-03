import React from "react";
import { Link } from "react-router-dom";

// Importing MuiItem
import {
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  List,
  Avatar,
} from "@mui/material";
import { Box } from "@mui/system";
import { IconButton, Typography } from "@mui/material";

// Importing Icons
import {
  MdOutlineDashboardCustomize,
  MdOutlineRateReview,
  MdSpaceDashboard,
} from "react-icons/md";
import { RiImageLine } from "react-icons/ri";
import { GiCog } from "react-icons/gi";
import { CgBox } from "react-icons/cg";
import { HiOutlineLogout } from "react-icons/hi";
import { BiMenuAltRight, BiStore } from "react-icons/bi";
import { IoIosPeople } from "react-icons/io";
import { FaRegListAlt } from "react-icons/fa";
import { TbShoppingCartDiscount } from "react-icons/tb";

// Importing Images
import PIlogo from "../../assets/pnd-logo.svg";
import { authContext } from "../../context/AuthProvider";

const LeftDrawer = ({ open, setOpen }) => {
  // const [open, setOpen] = useState(false)
  const authCntxt = React.useContext(authContext);

  const drawerData = [
    {
      name: "Dashboard",
      icon: <MdSpaceDashboard />,
      to: "/",
    },
    {
      name: "Order",
      icon: <CgBox />,
      to: "/order-list",
      disabled: false,
    },
    {
      name: "Store",
      icon: <BiStore />,
      to: "/store",
      disabled: false,
    },
    {
      name: "Customer",
      icon: <IoIosPeople />,
      to: "/customer-list",
      disabled: false,
    },
    {
      name: "Product",
      icon: <MdOutlineDashboardCustomize />,
      to: "/product-list",
    },
    {
      name: "Category",
      icon: <FaRegListAlt />,
      to: "/category",
    },
    {
      name: "Reviews",
      icon: <MdOutlineRateReview />,
      to: "/reviews",
    },
    {
      name: "Discounts",
      icon: <TbShoppingCartDiscount />,
      to: "/discounts",
    },

    {
      name: "Images",
      icon: <RiImageLine />,
      to: "/images",
    },
  ];

  const drawerGenData = [
    {
      name: "Settings",
      icon: <GiCog />,
      to: "/settings",
      disabled: true,
    },
    {
      name: "Logout",
      icon: <HiOutlineLogout />,
      onClick: () => authCntxt.logout(),
    },
  ];

  const adminList = () => (
    <Box
      style={{ width: 300 }}
      sx={{
        color: "primary.main",
      }}
      onClick={() => setOpen(false)}
    >
      {drawerData.map((item, index) => (
        <ListItemButton
          key={index}
          component={item.to ? Link : ListItemButton}
          to={item.to}
          onClick={() => {
            if (item.onClick) item.onClick();
            setOpen(false);
          }}
          disabled={!!item.disabled}
        >
          <ListItemIcon sx={{ color: "primary.main", fontSize: "24px" }}>
            {" "}
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </Box>
  );

  const generalList = () => (
    <Box
      style={{ width: 300 }}
      sx={{
        color: "primary.main",
      }}
      onClick={() => setOpen(false)}
    >
      {drawerGenData.map((item, index) => (
        <ListItemButton
          key={index}
          component={item.to ? Link : ListItemButton}
          to={item.to}
          onClick={() => {
            if (item.onClick) item.onClick();
            setOpen(false);
          }}
          disabled={!!item.disabled}
        >
          <ListItemIcon sx={{ color: "primary.main", fontSize: "24px" }}>
            {" "}
            {item.icon}
          </ListItemIcon>
          <ListItemText primary={item.name} />
        </ListItemButton>
      ))}
    </Box>
  );

  return (
    <>
      <Drawer open={open} anchor={"left"} onClose={() => setOpen(false)}>
        <List
          sx={{
            flex: 1,
          }}
          disablePadding
        >
          <ListItem
            sx={{
              bgcolor: "primary.contrastText",
              minHeight: "60px",
            }}
          >
            <ListItemIcon
              sx={{
                flex: 1,
              }}
            >
              <Avatar
                src={PIlogo}
                alt={"Rayos"}
                sx={{
                  borderRadius: 0,
                  width: "30px",
                  height: "30px",
                }}
              />
            </ListItemIcon>
            <IconButton
              size={"small"}
              color={"primary"}
              onClick={() => setOpen(false)}
            >
              <BiMenuAltRight />
            </IconButton>
          </ListItem>
          {adminList()}
          <ListItem
            sx={{
              bgcolor: "primary.contrastText",
            }}
          >
            <ListItemText
              primary={"Additional Settings"}
              primaryTypographyProps={{
                fontWeight: 600,
              }}
            />
          </ListItem>
          {generalList()}
        </List>
        <Typography
          variant={"caption"}
          sx={{
            textAlign: "center",
            mb: 1,
          }}
        >
          Powered by <b>Team Deviate</b>
        </Typography>
      </Drawer>
    </>
  );
};
export default LeftDrawer;
