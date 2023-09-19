import React from "react";
import { Button, Typography, Stack } from "@mui/material";
import { useStateValue } from "../../store/StateProvider";
import { ExportCSV } from "src/utils/excell/ExportCSV";

function ReportAndAddUser({
  filteredUsers,
  headtext,
  sanitiseUser,
  handleOpenRegister,
}) {
  const [{ nav, user }, dispatch] = useStateValue();
  return (
    <>
      <Stack className="report-add">
        {" "}
        {user.userRights === 1 ? (
          <Typography variant="h3" gutterBottom sx={{ color: "#000099" }}>
            <ExportCSV
              csvData={sanitiseUser(filteredUsers)}
              fileName={`report for ${headtext}`}
              group={headtext}
            />
          </Typography>
        ) : (
          ""
        )}
        {user.userRights === 1 ? (
          <Typography variant="h3" gutterBottom sx={{ color: "#000099" }}>
            <Button
              variant="warning"
              sx={{ fontSize: "20px", background: "#000099", color: "white" }}
              onClick={handleOpenRegister}
            >
              Add User
            </Button>
          </Typography>
        ) : (
          ""
        )}
      </Stack>
    </>
  );
}

export default ReportAndAddUser;
