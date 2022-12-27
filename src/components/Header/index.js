import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import { BiMenuAltLeft, BiMenuAltRight } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { MdClose, MdNotificationsNone } from "react-icons/md";
import LeftDrawer from "../Drawer/LeftDrawer";
import { authContext } from "../../context/AuthProvider";
import { Route, Routes } from "react-router-dom";
import BackButton from "../BackButton";

const Index = () => {
  const [open, setOpen] = useState(false);
  const [openRes, setOpenRes] = useState(false);
  return (
    <>
      <AppBar>
        <Toolbar
          sx={{
            bgcolor: "primary.contrastText",
            color: "primary.main",
          }}
          disableGutters
        >
          <Container>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{
                "& span > *": {
                  mx: 0.5,
                },
              }}
            >
              <Stack direction={"row"} justifyContent={""}>
                <IconButton
                  color={"black"}
                  size={"small"}
                  onClick={() => setOpen(true)}
                >
                  <BiMenuAltLeft />
                </IconButton>

                <BackButton primary={"Back"} />
              </Stack>
              <Typography variant="normal">
                <Routes path={"/"}>
                  <Route index element={"Dashboard"} />
                  <Route path={"order-list"} element={"Order List"} />
                  <Route
                    path={"order-details/:oid"}
                    element={"Order Details"}
                  />
                  <Route path={"store"} element={"Store List"} />
                  <Route path={"store/:pid"} element={"Store Info"} />
                  <Route path={"customer-list"} element={"Customer List"} />
                  <Route path={"customer/:cid"} element={"Customer Info"} />
                  <Route path={"product-list"} element={"Product List"} />
                  <Route path={"reviews"} element={"Reviews"} />
                  <Route path={"prod/:pid"} element={"Product Info"} />
                  <Route path={"images"} element={"Images"} />
                  <Route path={"settings"} element={"Settings"} />
                  <Route path={"category"} element={"Category List"} />
                  <Route path={"cat/:cid"} element={"Category Info"} />
                  <Route path={"user/:uid/profile"} element={"User Profile"} />
                  <Route path={"user/:uid/order"} element={"User Orders"} />
                  {/* <Route path={"user/:uid/wallet"} element={"User Wallet"} /> */}

                  <Route path={"*"} element={""} />
                </Routes>
              </Typography>
              <span>
                <IconButton color={"black"} size={"small"} disabled>
                  <MdNotificationsNone />
                </IconButton>
                <Hidden smDown>
                  <IconButton color={"black"} size={"small"} disabled>
                    <FiUser />
                  </IconButton>
                </Hidden>
                <Hidden smUp>
                  <IconButton
                    color={"black"}
                    size={"small"}
                    onClick={() => setOpenRes(true)}
                  >
                    <BiMenuAltRight />
                  </IconButton>
                  <RightDrawer open={openRes} setOpen={setOpenRes} />
                </Hidden>
              </span>
            </Stack>
          </Container>
        </Toolbar>
      </AppBar>
      <LeftDrawer open={open} setOpen={setOpen} />
      <Box
        sx={{
          mt: {
            xs: "60px",
            sm: "70px",
          },
        }}
      />
    </>
  );
};

const RightDrawer = ({ open, setOpen }) => {
  const authCntxt = React.useContext(authContext);
  return (
    <>
      <Drawer
        open={open}
        anchor={"right"}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "95vw",
            maxWidth: "300px",
          },
        }}
      >
        <List
          sx={{
            flex: 1,
          }}
          disablePadding
        >
          {/* <ListSubheader></ListSubheader> */}
          <ListItem
            disablePadding
            sx={{
              px: 2,
            }}
          >
            <ListItemText
              primary={"Shortcuts"}
              secondary={"Application Shortcuts"}
            />
            {/* <ListItemAvatar> */}
            <IconButton
              size={"small"}
              color={"black"}
              onClick={() => setOpen(false)}
            >
              <MdClose />
            </IconButton>
            {/* </ListItemAvatar> */}
          </ListItem>
          <Divider />
          {/* <ListItemButton>
            <ListItemAvatar>
              <Avatar
                src={BIicon}
                alt={"bi"}
                sx={{
                  borderRadius: 0,
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={"Create BI Order"}
              // secondary={"Brothers Importing Order"}
            />
          </ListItemButton>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar
                src={PNDicon}
                alt={"bi"}
                sx={{
                  borderRadius: 0,
                }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={"Create PND Order"}
              // secondary={"Brothers Importing Order"}
            />
          </ListItemButton> */}
          <ListItemButton>
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              primary={"Manage Profile"}
              secondary={authCntxt.userInfo.user_name || ""}
            />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Index;
