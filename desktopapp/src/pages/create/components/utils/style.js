export const styleDataGrid = {
  borderRadius: 2,
  overflow: "hidden",
  boxShadow: 2,
  ".MuiDataGrid-columnSeparator": {
    display: "none",
  },
  ".MuiDataGrid-columnHeaders": {
    backgroundColor: "rgba(145, 158, 171, 0.16)",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    width: "98%",
    margin: "auto",
    mt: 1,
  },
  ".MuiDataGrid-row": {
    mt: 1,
    paddingLeft: 1,
    fontWeight: "bold",
  },
  ".MuiDataGrid-cell": {
    borderBottom: "none",
    width: "100%",
  },
};

export const styleStatus = {
  padding: 0.2,
  width: "80%",
  textAlign: "center",
  fontWeight: "bold",
  borderRadius: 1,
};

export const boxStyle = {
  borderRadius: "4px",
  marginBottom: "20px",
  "@media (min-width: 600px)": {
    height: "700px",
    margin: "0 auto",
  },
  "@media (max-width: 600px)": {
    height: "700px",
    margin: "0 auto",
  },
  "@media (max-width: 1180px)": {
    height: "700px",
    margin: "0 auto",
  },
};
