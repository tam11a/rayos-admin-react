import { Container } from "@mui/material";
import React from "react";
import {
  useParams,
  Link,
  Navigate,
  useSearchParams,
  Route,
  Routes,
} from "react-router-dom";

import CTab from "../../components/CTab";
import CTabs from "../../components/CTabs";
import Profile from "./Profile";
import UserOrder from "./UserOrder";
import UserReview from "./UserReview";
// import UserOrder from "./UserOrder";
// import Wallet from "./Wallet";

const Index = () => {
  const { uid, path_url } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  //   console.log(searchParams.getAll());

  return (
    <>
      <Container sx={{ pt: 1 }}>
        <CTabs
          value={searchParams.get("tab")}
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
            value={null}
            label={"User Profile"}
            onClick={() => {
              delete searchParams.tab;
              setSearchParams({ ...searchParams });
            }}
          />
          <CTab
            value={"order"}
            label={"User Order"}
            onClick={() => setSearchParams({ ...searchParams, tab: "order" })}
          />
          <CTab
            value={"review"}
            label={"User Review"}
            onClick={() => setSearchParams({ ...searchParams, tab: "review" })}
          />
        </CTabs>

        {searchParams.get("tab") === "order" ? (
          <UserOrder />
        ) : searchParams.get("tab") === "review" ? (
          <UserReview />
        ) : (
          <Profile />
        )}
      </Container>
    </>
  );
};

export default Index;
