import React from "react";
import { useGetDashboard } from "../../query/dashboard";

import StateViewer from "../../components/StateViewer";
import { Container } from "@mui/material";

const Index = () => {
  // React.useEffect(() => {
  //   document.title = "Dashboard | Admin";
  // }, []);

  const { data, isLoading } = useGetDashboard();
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
              num: `${data?.data?.value?.[0].total_pnd_income || 0} ৳`,
              title: "pnd income",
            },
            {
              num: `${data?.data?.value?.[0].total_pnd_pending || 0} ৳`,
              title: "pnd Pending",
            },
            {
              num: data?.data?.value?.[0].total_pnd_order || 0,
              title: "pnd order",
            },
            {
              num: `${data?.data?.value?.[0].total_pnd_laibality || 0} ৳`,
              title: "pnd laibality",
            },
            {
              num: `${data?.data?.value?.[0].total_bi_income || 0} ৳`,
              title: "BI income",
            },
            {
              num: `${data?.data?.value?.[0].total_bi_pending || 0} ৳`,
              title: "BI pending",
            },
            {
              num: data?.data?.value?.[0].total_bi_sell_product || 0,
              title: "BI sold product",
            },
            {
              num: data?.data?.value?.[0].total_users || 0,
              title: "Total User",
            },
            {
              num: `${
                data?.data?.value?.[0].total_pnd_cancel_order_amount || 0
              } ৳`,
              title: "canceled amount",
            },
            {
              num: data?.data?.value?.[0].total_pnd_cancel_order || 0,
              title: "order canceled",
            },
          ]}
        />
      </Container>
    </>
  );
};

export default Index;
