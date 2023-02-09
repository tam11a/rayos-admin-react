import { Backdrop, CircularProgress } from "@mui/material";
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import InvoiceDialog from "./InvoiceDialog";
import { useGetProductsByOrderID } from "../../query/order";

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
	} = useGetProductsByOrderID(searchParams.get("invoice"));

	// Set Invoice to State
	React.useEffect(() => {
		if (isLoading || isError || !invoiceData) return;
		setInvoiceInfo(invoiceData.data.data);
	}, [isLoading, isRefetching]);

	return (
		<invoiceContext.Provider
			value={{
				info: invoiceInfo,
				isLoading: isLoading,
				showInvoice: (orderId) => {
					navigate(
						{
							search: `?invoice=${orderId}`,
						},
						{
							replace: true,
						}
					);
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

export const useInvoice = () => React.useContext(invoiceContext);
