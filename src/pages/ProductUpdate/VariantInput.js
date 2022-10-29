import { IconButton, InputBase, ListItem, Stack } from "@mui/material";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import tableOptionsStyle from "../../style/tableOptions";

const VariantInput = () => {
  return (
    <div>
      {/* <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          rowGap: 1,
          p: 0,
        }}
      > */}
      <Stack
        // key={color}
        direction={"row"}
        columnGap={1}
        sx={{
          width: "100%",
        }}
      >
        <InputBase
          sx={tableOptionsStyle}
          endAdornment={
            <IconButton size={"small"} color={"error"}>
              <MdDeleteForever />
            </IconButton>
          }
          fullWidth
        />
        <InputBase
          sx={tableOptionsStyle}
          // defaultValue={colors[color].value}
          // onChange={(e) =>
          //   setColors({
          //     ...colors,
          //     [color]: {
          //       name: colors[color].name,
          //       value: parseInt(e.target.value),
          //     },
          //   })
          // }
        />
      </Stack>
      {/* </ListItem> */}
    </div>
  );
};

export default VariantInput;
