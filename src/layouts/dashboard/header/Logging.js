import PropTypes from "prop-types";
import { set, sub } from "date-fns";
import { noCase } from "change-case";
import { faker } from "@faker-js/faker";
import { useState, useEffect } from "react";
// @mui
import { Popover, CircularProgress } from "@mui/material";

// ----------------------------------------------------------------------

function Logging({ open, handleCloseMenu }) {
  return (
    <>
      <Popover
        open={open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "center", horizontal: "center" }}
        transformOrigin={{ vertical: "center", horizontal: "center" }}
        PaperProps={{
          sx: {
            // mt: 1.5,
            // ml: 0.75,
            // width: 570,
            padding: 2,
          },
        }}
      >
        <CircularProgress />
      </Popover>
    </>
  );
}

export default Logging;
