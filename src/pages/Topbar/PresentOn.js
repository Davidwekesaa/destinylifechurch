import React from "react";
import { Typography, Stack } from "@mui/material";

function PresentOn({ filteredUsers, getPresentToday, getPresentLastWeek }) {
  return (
    <Stack className="present-on">
      <Typography variant="h5" gutterBottom pr={5} sx={{ color: "#B6B6B4" }}>
        {`${getPresentToday(filteredUsers)}/${
          filteredUsers?.length
        } Present Today`}
      </Typography>
      <Typography variant="h5" gutterBottom pr={5} sx={{ color: "#B6B6B4" }}>
        {`${getPresentLastWeek(filteredUsers)}/${
          filteredUsers?.length
        } Present Last Week`}
      </Typography>
    </Stack>
  );
}

export default PresentOn;
