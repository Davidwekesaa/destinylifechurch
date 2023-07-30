import PropTypes from "prop-types";
import { set, sub } from "date-fns";
import { noCase } from "change-case";
import { faker } from "@faker-js/faker";
import { useState } from "react";
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
  TextField,
  Checkbox,
  Stack,
} from "@mui/material";
// utils
import { fToNow } from "../../../utils/formatTime";
// components
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

// ----------------------------------------------------------------------

function AddNewPupil({ open, handleCloseMenu }) {
  const [pName, setPname] = useState("");
  const [pContact, setpContact] = useState("");
  const [relationShip, setRelationShip] = useState("");

  const [cName, setCname] = useState("");
  const [cGender, setcGender] = useState("");
  const [age, setAge] = useState("");
  const [cCategory, setcCategory] = useState("");
  const emptyFields = () => toast.error("All the fields are required");

  const setEmptyFields = () => {
    setPname("");
    setpContact("");
    setRelationShip("");
    setCname("");
    setcGender("");
    setAge("");
    setcCategory("");
  };

  const addNewPupill = async () => {
    if (
      pName.trim().length === 0 ||
      pContact.trim().length === 0 ||
      relationShip.trim().length === 0 ||
      cName.trim().length === 0 ||
      cGender.trim().length === 0 ||
      age.trim().length === 0 ||
      cCategory.trim().length === 0
    ) {
      console.log("empty");
      emptyFields();
    } else {
      await axios
        .post(`http://localhost:5000/api/childrens/`, {
          parentName: pName,
          parentContact: pContact,
          Relationship: relationShip,
          childName: cName,
          childGender: cGender,
          DOB: "",
          childAge: age,
          childCategory: cCategory,
        })
        .then((logins) => {
          setEmptyFields();
        });
    }
  };
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
            mt: 1.5,
            ml: 0.75,
            width: 570,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row-reverse",
            }}
          >
            <IconButton
              size="large"
              color="inherit"
              onClick={handleCloseMenu}
              sx={{ color: "#B6B6B4" }}
            >
              X
            </IconButton>

            <Typography variant="h3" sx={{ marginBottom: 2, color: "#000099" }}>
              Add New Child
            </Typography>
          </Box>
        </Box>

        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}> */}
        <Box sx={{ p: 1 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ marginBottom: 1, color: "#000099", marginLeft: 1 }}
          >
            Parent
          </Typography>
          <Box
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <TextField
              name="pname"
              label="Name"
              sx={{ marginBottom: 2 }}
              required
              value={pName}
              onChange={(e) => setPname(e.target.value)}
            />
            <TextField
              name="pcontact"
              label="Contact"
              sx={{ marginBottom: 2 }}
              required
              onChange={(e) => setpContact(e.target.value)}
              value={pContact}
            />
            <TextField
              name="prelationship"
              label="Relationship"
              sx={{ marginBottom: 2 }}
              required
              onChange={(e) => setRelationShip(e.target.value)}
              value={relationShip}
            />
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ marginBottom: 1, color: "#000099", marginLeft: 1 }}
          >
            Child
          </Typography>
          <Box
            sx={{
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <TextField
              name="cname"
              label="Name"
              sx={{ marginBottom: 2 }}
              required
              onChange={(e) => setCname(e.target.value)}
              value={cName}
            />
            <TextField
              name="cgender"
              label="Gender"
              sx={{ marginBottom: 2 }}
              required
              onChange={(e) => setcGender(e.target.value)}
              value={cGender}
            />
            <TextField
              name="cAge"
              label="Age"
              sx={{ marginBottom: 2 }}
              required
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
            <TextField
              name="cCategory"
              label="Category"
              placeholder="eg dazzlers"
              sx={{ marginBottom: 2 }}
              required
              onChange={(e) => setcCategory(e.target.value)}
              value={cCategory}
            />

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={{ marginRight: 5 }}
              >
                <Typography variant="h4" noWrap>
                  Visitor?
                </Typography>
              </Stack>
              <Checkbox name="remember" label="Remember me" />
            </Box>
          </Box>
        </Box>

        {/* </Scrollbar> */}

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={addNewPupill}>
            Save
          </Button>
        </Box>
      </Popover>
      <ToastContainer />
    </>
  );
}

export default AddNewPupil;
