import React from "react";
import { Stack, Button, Typography, TextField } from "@mui/material";
import { useStateValue } from "../../store/StateProvider";
function ActiveRegiter({ headtext, isUploading }) {
  const [{ nav, user }, dispatch] = useStateValue();
  return (
    <>
      <Stack className="Active-register">
        <Typography variant="h3" gutterBottom sx={{ color: "#000099" }}>
          <Button>Active Register for {headtext}</Button>
        </Typography>

        {user.userRights === 1 ? (
          <Typography variant="h3" gutterBottom sx={{ color: "#000099" }}>
            <Button
              onClick={() => document.getElementById("fileInput").click()}
              className="fileInputTex"
              disabled={isUploading}
              variant="warning"
              sx={{ fontSize: "20px", background: "#000099", color: "white" }}
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </Button>
          </Typography>
        ) : (
          ""
        )}
      </Stack>
    </>
  );
}

export default ActiveRegiter;
