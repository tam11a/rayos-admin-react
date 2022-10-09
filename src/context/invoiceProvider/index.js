import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useGetInvoice } from "../../query/inovoice";
import InvoiceDialog from "./InvoiceDialog";

const invoiceContext = React.createContext();

export const InvoiceProvider = ({ children }) => {
  // Get Search Params
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Parameter State
  const [invoiceInfo, setInvoiceInfo] = React.useState();

  // Fetch Data
  const {
    data: invoiceData,
    isLoading,
    isError,
    isRefetching,
  } = useGetInvoice(searchParams.get("invoice"));

  // Set Invoice to State
  React.useEffect(() => {
    if (isLoading || isError) return;
    if (!invoiceData?.data.status) return;
    setInvoiceInfo(invoiceData.data.value);
    // console.log(invoiceData.data.value);
  }, [isLoading, isRefetching]);

  return (
    <invoiceContext.Provider
      value={{
        info: invoiceInfo,
        isLoading: isLoading,
        showInvoice: (orderId) => {
          // console.log(orderId);
          navigate({
            search: `?invoice=${orderId}`,
          });
        },
      }}
    >
      {children}
      <Backdrop
        open={isLoading}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress color="secondary" />
      </Backdrop>
      <InvoiceDialog
        open={!!invoiceInfo}
        onClose={() => {
          navigate({
            search: ``,
          });
          setInvoiceInfo();
        }}
      />
    </invoiceContext.Provider>
  );
};

export default invoiceContext;
