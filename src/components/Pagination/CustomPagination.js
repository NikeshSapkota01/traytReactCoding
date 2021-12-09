import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const CustomPagination = ({ setPage, totalPage = 10 }) => {
  // Scroll to top when page changes
  const handlePageChange = (page) => {
    setPage(page);
    window.scroll(0, 0);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: 10,
      }}
    >
      <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={totalPage}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider>
    </div>
  );
};
