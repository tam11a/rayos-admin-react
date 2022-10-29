import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import React from "react";
import { MdClose } from "react-icons/md";

const CreateStoreDrawer = ({ open, onClose, ...others }) => {
  return (
    <>
      <Drawer
        anchor="right"
        PaperProps={{
          sx: {
            width: "95vw",
            maxWidth: "570px",
          },
        }}
        open={open}
        onClose={onClose}
      >
        <form>
          <List
            disablePadding
            sx={{
              flex: 1,
            }}
          >
            <ListItem>
              <ListItemText
                primary={"Create Store"}
                secondary={"Upload Store Information"}
              />
              <IconButton size={"small"} color={"black"} onClick={onClose}>
                <MdClose />
              </IconButton>
            </ListItem>
            <Divider />
          </List>
        </form>
      </Drawer>
    </>
  );
};

export default CreateStoreDrawer;
