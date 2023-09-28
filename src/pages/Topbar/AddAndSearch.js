import React, { useState, useEffect } from "react";
import { Stack, Button, Typography, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Iconify from "../../components/iconify";
import axios from "axios";
function AddAndSearch({ handleOpenMenuAddNewPupil, setSearchUsers }) {
  const [search, setSearch] = useState("");

  const toSearch = async (e) => {
    e.preventDefault();
    await axios
      .get(`${process.env.REACT_APP_Server_Url}children/child/${search}`)
      .then((children) => {
        setSearchUsers(children?.data);
      })
      .catch((error) => {});
  };
  return (
    <Stack
      display={"flex"}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      flexWrap={"wrap"}
      mb={2}
      mt={3}
    >
      <Button
        variant="contained"
        startIcon={<Iconify icon="ic_disabled" />}
        sx={{ backgroundColor: "#000099" }}
        onClick={handleOpenMenuAddNewPupil}
      >
        <AddIcon /> Add New Child
      </Button>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ width: "60%", marginRight: 10, display: "flex" }}
        className="top-search"
      >
        <TextField
          name="search"
          placeholder="Search by | child name "
          // label="User Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "100%" }}
        />
        <button onClick={(e) => toSearch(e)}>search</button>
      </Typography>
    </Stack>
  );
}

export default AddAndSearch;
