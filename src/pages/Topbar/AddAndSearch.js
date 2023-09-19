import React from "react";
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Divider,
  Box,
  LinearProgress,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Iconify from "../../components/iconify";
function AddAndSearch({ handleOpenMenuAddNewPupil, search, setSearch }) {
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
        sx={{ width: "60%", marginRight: 10 }}
        className="top-search"
      >
        <TextField
          name="search"
          placeholder="Search by | child name | parents name | date of birth | gender | parents contacts |"
          // label="User Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ width: "100%" }}
        />
      </Typography>
    </Stack>
  );
}

export default AddAndSearch;
