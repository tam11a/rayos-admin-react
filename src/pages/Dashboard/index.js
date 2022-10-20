import React from "react";
// import { useGetDashboard } from "../../query/dashboard";

import StateViewer from "../../components/StateViewer";
import { Container } from "@mui/material";

const Index = () => {
  // React.useEffect(() => {
  //   document.title = "Dashboard | Admin";
  // }, []);

  // const { data, isLoading } = useGetDashboard();
  return (
    <>
      <Container
        sx={{
          py: 2,
        }}
      >
        <StateViewer
          stateList={[
            {
              num: 0,
              title: "Total Order",
            },
            {
              num: 0,
              title: "Total User",
            },

            {
              num: 0,
              title: "order canceled",
            },
          ]}
        />
      </Container>
    </>
  );
};

export default Index;
