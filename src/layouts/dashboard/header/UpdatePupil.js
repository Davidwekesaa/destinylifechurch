import { useState, useEffect } from "react";
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
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
// utils

// components

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import {
  formatPickedDate,
  reverseformatDate,
} from "../../../utils/userPageFunctions";
import Logging from "./Logging";

// ----------------------------------------------------------------------

function UpdatePupil({ open, handleCloseMenu, childData, cganges }) {
  const [fName, setFname] = useState("");
  const [fContact, setFContact] = useState("");

  const [pName, setPname] = useState("");
  const [pContact, setpContact] = useState("");

  const [relationShip, setRelationShip] = useState("");

  const [cName, setCname] = useState("");
  const [cGender, setcGender] = useState("");
  const [age, setAge] = useState("");

  const [visitor, setVisitor] = useState(false);

  const [openLoading, setOpenLoading] = useState(null);

  const emptyFields = () => toast.error("All the fields are required");
  const errorr = () => toast.error("There was error");
  const su = () => toast.success("Record added successful");

  useEffect(() => {
    const ftch = async () => {
      await axios
        .get(`${process.env.REACT_APP_Server_Url}children/${childData}`)
        .then((data) => {
          setFname(data?.data?.fatherName);
          setFContact(data?.data?.fatherContact);
          setPname(data?.data?.parentName);
          setpContact(data?.data?.parentContact);
          setRelationShip(data?.data?.Relationship);
          setCname(data?.data?.childName);
          setcGender(data?.data?.childGender);
          setAge(data?.data?.DOB);
        })
        .catch((error) => {});
    };

    ftch();

    // console.log("udate child", childData?.childCategory);
  }, [childData]);

  const setEmptyFields = () => {
    setPname("");
    setpContact("");
    setRelationShip("");
    setCname("");
    setcGender("");
    setAge("");
    setFname("");
    setFContact("");
  };

  const addNewPupill = async () => {
    // if (
    //   pName.trim().length === 0 ||
    //   pContact.trim().length === 0 ||
    //   relationShip.trim().length === 0 ||
    //   cName.trim().length === 0 ||
    //   cGender.trim().length === 0 ||
    //   age?.length === 0 ||
    //   fName.trim().length === 0 ||
    //   fContact.trim().length === 0
    // ) {
    //   emptyFields();
    // } else {
    setOpenLoading(true);
    await axios
      .put(`${process.env.REACT_APP_Server_Url}children/child/${childData}`, {
        parentName: pName,
        parentContact: pContact,
        fatherName: fName,
        fatherContact: fContact,
        Relationship: relationShip,
        childName: cName,
        childGender: cGender,
        DOB: age,
        visitor: visitor,
      })
      .then((logins) => {
        su();
        setEmptyFields();
        setOpenLoading(null);
        cganges(Math.random() * 1000);
        handleCloseMenu();
      })
      .catch((error) => {
        setOpenLoading(null);
        errorr();
        console.log("update error", error);
      });
    // }
  };

  const handleCloseLoging = () => {
    setOpenLoading(null);
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
              Update Child Record
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
              name="fname"
              label="Father's name"
              sx={{ marginBottom: 2 }}
              required
              value={fName}
              onChange={(e) => setFname(e.target.value)}
            />
            <TextField
              name="fcontact"
              label="Father's Contact"
              sx={{ marginBottom: 2 }}
              required
              onChange={(e) => setFContact(e.target.value)}
              value={fContact}
            />
            <TextField
              name="pname"
              label="Mother's Name"
              sx={{ marginBottom: 2 }}
              required
              value={pName}
              onChange={(e) => setPname(e.target.value)}
            />
            <TextField
              name="pcontact"
              label="Mother's Contact"
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

            {/* <FormControl
              sx={{
                width: "217px",
                height: 50,
                marginBottom: 2,
              }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Gender</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={cGender}
                label="Gender"
                onChange={(e) => setcGender(e.target.value)}
                sx={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <MenuItem value="">
                  <em></em>
                </MenuItem>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl> */}
            <TextField
              name="DOB"
              label="DOB"
              sx={{ marginBottom: 2 }}
              required
              onChange={(e) => setcGender(e.target.value)}
              value={cGender}
            />
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Date of Birth"
                  sx={{ marginBottom: 2, width: "217px" }}
                  value={age}
                  onChange={(newDate) => setAge(newDate)}
                />
              </DemoContainer>
            </LocalizationProvider> */}
            <TextField
              name="DOB"
              label="DOB"
              sx={{ marginBottom: 2 }}
              required
              onChange={(e) => setAge(e.target.value)}
              value={age}
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
              <Checkbox
                name="remember"
                label="Remember me"
                value={visitor}
                disabled
                onChange={(e) => setVisitor(!visitor)}
              />
            </Box>
          </Box>
        </Box>

        {/* </Scrollbar> */}

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={addNewPupill}>
            Update
          </Button>
        </Box>
      </Popover>
      <ToastContainer />
      <Logging
        open={Boolean(openLoading)}
        handleCloseMenu={handleCloseLoging}
        // headTextdata={headtext}
      />
    </>
  );
}

export default UpdatePupil;
