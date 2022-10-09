import {
  Alert,
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import React from "react";
import { MdClose, MdOutlinePrint } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { Preview, print } from "react-html2pdf";
import invoiceContext from ".";

import pndLogo from "../../assets/pnd-logo.png";

const InvoiceDialog = ({ open, onClose }) => {
  const printRef = React.useRef(null);
  const invoice = React.useContext(invoiceContext);
  const [comment, setComment] = React.useState(true);
  const toggleComment = () => setComment(!comment);

  const reactToPrintContent = React.useCallback(() => {
    return printRef.current;
  }, [printRef.current]);

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: invoice.info?.id
      ? "invoice-" + invoice.info?.id
      : "invoice-" + Date.now(),
    removeAfterPrint: true,
  });

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          sx: {
            minWidth: {
              xs: "95vw",
              md: "800px",
            },
            maxWidth: { xs: "95vw", md: "1200px" },
            maxHeight: {
              xs: "97vh",
            },
            minHeight: {
              xs: "97vh",
              sm: "unset",
            },
          },
        }}
      >
        <DialogTitle>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            columnGap={1}
          >
            <ButtonGroup>
              <Button
                color={"info"}
                variant={"contained"}
                size={"small"}
                startIcon={<MdOutlinePrint />}
                onClick={handlePrint}
              >
                Print
              </Button>
              <Button
                color={"black"}
                variant={"contained"}
                size={"small"}
                // startIcon={<MdOutlinePrint />}
                onClick={() =>
                  print(
                    invoice.info?.id
                      ? "invoice-" + invoice.info?.id
                      : "invoice-" + Date.now(),
                    "jsx-template"
                  )
                }
              >
                Download
              </Button>
              <Button
                color={"primary"}
                variant={comment ? "contained" : "outlined"}
                size={"small"}
                // startIcon={<MdOutlinePrint />}
                onClick={() => toggleComment()}
              >
                Comment
              </Button>
            </ButtonGroup>
            <IconButton onClick={onClose} size={"small"} color={"error"}>
              <MdClose />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <Preview id={"jsx-template"}>
          <Box ref={printRef}>
            <DialogContent>
              <PrintableArea showComment={comment} />
            </DialogContent>
          </Box>
        </Preview>
      </Dialog>
    </>
  );
};

const PrintableArea = ({ showComment, ...others }) => {
  const invoice = React.useContext(invoiceContext);
  return invoice.info ? (
    <React.Fragment {...others}>
      {/* <Typography variant="button">Invoice</Typography> */}
      <Grid
        container
        sx={{
          mt: 2,
        }}
      >
        <Grid item xs={4}>
          <Typography sx={{ fontWeight: "bold" }}>
            {invoice.info?.company_name}
          </Typography>
          <Typography variant={"subtitle2"}>
            {invoice.info?.company_number}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Avatar
            src={pndLogo}
            variant={"square"}
            sx={{
              height: "100px",
              width: "100px",
              mx: "auto",
              background: "transparent",
              borderColor: "none",
            }}
          />
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            textAlign: "right",
          }}
        >
          <Typography sx={{ fontWeight: "bold" }}>
            {invoice.info?.pnd_name}
          </Typography>
          <Typography variant={"subtitle2"}>
            {invoice.info?.pnd_address}
          </Typography>
          <Typography variant={"subtitle2"}>
            {invoice.info?.pnd_phone}
          </Typography>
          <Typography variant={"subtitle2"}>
            {invoice.info?.pnd_email}
          </Typography>
        </Grid>
      </Grid>

      <Typography variant="caption">
        <b>Invoice</b>#{invoice.info?.id}
      </Typography>

      <Paper
        sx={{
          mt: 1,
          mb: 2,
          bgcolor: "#E9EEEE",
          px: 2,
          py: 1.5,
        }}
        elevation={0}
      >
        <Grid container>
          <Grid item xs={6}>
            <Typography
              variant="button"
              sx={{
                fontWeight: "bold",
              }}
            >
              bill to
            </Typography>
            <Box
              sx={{
                mt: 1,
              }}
            />
            <Typography variant={"subtitle2"} sx={{ fontWeight: "bold" }}>
              {invoice.info?.receiver_name}
            </Typography>
            <Typography variant={"subtitle2"}>
              {invoice.info?.receiver_address}
            </Typography>
            <Typography variant={"subtitle2"}>
              {invoice.info?.receiver_number}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              textAlign: "right",
            }}
          >
            <Typography variant={"subtitle2"}>
              <b>Invoice Date:</b> {moment().format("ll")}
            </Typography>
          </Grid>
        </Grid>
      </Paper>

      <TableContainer>
        <Table
          sx={{
            "& tr:last-child th": {
              border: "none",
            },
          }}
        >
          <TableHead
            sx={{
              bgcolor: "#E9EEEE",
            }}
          >
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                }}
              >
                Item Description
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Quantity
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Price
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontWeight: "bold",
                }}
              >
                Amount
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoice.info?.carts?.map((cart) => {
              let colors = JSON.parse(cart.cart_info)?.color;
              return (
                <TableRow key={cart.id}>
                  <TableCell
                    sx={{
                      width: "60%",
                    }}
                  >
                    <b>{cart.product.title_en}</b>
                    <br />
                    <Typography variant={"caption"}>
                      {Object.keys(colors)?.map(
                        (color, index) =>
                          `${index ? ", " : ""}${color} - ${colors[color]}Pcs`
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: "fit-content",
                    }}
                  >
                    {cart.quantity}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      minWidth: "fit-content",
                    }}
                  >
                    {cart.sell_price} ৳
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      minWidth: "fit-content",
                    }}
                  >
                    {cart.total_amount_with_sell_price} ৳
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {!invoice.info?.carts?.length && (
        <Alert
          severity="error"
          sx={{
            mt: 1,
            width: "100%",
          }}
        >
          No Carts Found!!
        </Alert>
      )}

      <Grid
        container
        sx={{
          mt: 5,
        }}
      >
        <Grid item xs={8}>
          {showComment && (
            <Box
              sx={{
                maxWidth: "300px",
              }}
            >
              {/* <Typography variant={"button"}>Comment:</Typography> */}

              <Typography variant={"caption"}>
                {Object.keys(
                  invoice.info?.other_details
                    ? JSON.parse(invoice.info?.other_details)
                    : {}
                ).includes("comment")
                  ? JSON.parse(invoice.info?.other_details).comment
                  : ""}
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={3}>
          <Typography variant={"button"}>Subtotal</Typography>
          <br />
          <Typography variant={"button"}>Delivery Fee</Typography>
          <br />
          <Typography variant={"button"} sx={{ fontWeight: "bold" }}>
            Total
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            textAlign: "right",
          }}
        >
          <Typography variant={"button"}>
            {invoice.info?.total_amount} ৳
          </Typography>
          <br />
          <Typography variant={"button"}>
            {invoice.info?.shipping_total_cost} ৳
          </Typography>
          <br />
          <Typography variant={"button"} sx={{ fontWeight: "bold" }}>
            {parseFloat(invoice.info?.total_amount) +
              parseFloat(invoice.info?.shipping_total_cost)}{" "}
            ৳
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  ) : (
    <></>
  );
};

export default InvoiceDialog;
