import { Container } from "@mui/material";
import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";

import CTab from "../../components/CTab";
import CTabs from "../../components/CTabs";
import Profile from "./Profile";
// import UserOrder from "./UserOrder";
// import Wallet from "./Wallet";

const Index = () => {
  const { uid, path_url } = useParams();

  return (
    <>
      <Container sx={{ pt: 1 }}>
        <CTabs
          value={path_url}
          sx={{
            width: "fit-content",
            minWidth: {
              xs: "90vw",
              sm: "350px",
            },
            maxWidth: "90vw",
            mx: "auto",
            my: 2,
          }}
        >
          <CTab
            value={"profile"}
            label={"User Profile"}
            component={Link}
            // to={`/user/${uid}/profile`}
          />
          <CTab
            // value={"order"}
            label={"User Order"}
            component={Link}
            // to={`/user/${uid}/order`}
          />
        </CTabs>
        {/* {path_url === "profile" ? (
          <>
            <Profile uid={uid} />
          </>
        ) : (
          <>
            <Navigate to={`/customer/${uid}`} />
          </>
        )} */}
        {/* {path_url === "profile" ? (
          <>
            <Profile uid={uid} />
          </>
        ) : path_url === "order" ? (
          <>
            <UserOrder uid={uid} />
          </>
        ) : (
          <>
            <Navigate to={`/user/${uid}/profile`} />
          </>
        )} */}
      </Container>
    </>
  );
};

export default Index;
