import { CssBaseline, GlobalStyles, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import theme from "./style/theme";
import AuthProvider from "./context/AuthProvider";
import { SnackProvider } from "./context/snackProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import { InvoiceProvider } from "./context/invoiceProvider";

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={{
              "*": {
                // Disable Blue Highlight when Touch/Press object with cursor: 'pointer' in Android
                WebkitTapHighlightColor: "transparent",
                // scrollbar
                scrollbarWidth: "5px",
                scrollbarHeight: "5px",
                scrollbarColor: `${theme.palette.primary.light} #00000033`,
                outline: "none !important",
              },
              "*::-webkit-scrollbar": {
                width: "5px",
                height: "5px",
              },
              "*::-webkit-scrollbar-track": {
                background: "#00000033",
              },
              "*::-webkit-scrollbar-thumb": {
                background: theme.palette.primary.light,
              },
              "*::-webkit-scrollbar-thumb:hover": {
                background: theme.palette.primary.main,
              },
              // App Body Scrollbar
              "&::-webkit-scrollbar": {
                width: "5px",
                height: "5px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#00000033",
              },
              "&::-webkit-scrollbar-thumb": {
                background: theme.palette.primary.light,
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: theme.palette.primary.main,
              },
              "@page": {
                margin: "20px",
              },
            }}
          />
          <SnackProvider>
            <AuthProvider>
              <BrowserRouter>
                <InvoiceProvider>
                  <AppRoute />
                </InvoiceProvider>
              </BrowserRouter>
            </AuthProvider>
          </SnackProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
