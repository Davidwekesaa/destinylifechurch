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
import { CircularProgress } from "@mui/material";
import Logging from "./Logging";

// ----------------------------------------------------------------------

function UpdatePupil({ open, handleCloseMenu, cganges, child, rdmm }) {
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
    const runn = async () => {
      await axios
        .get(`${process.env.REACT_APP_Server_Url}children/${child}`)
        .then((data) => {
          console.log("child data", data?.data[0]?.childName);
          setPname(data?.data[0].parentName);
          setpContact(data?.data[0].parentContact);
          setRelationShip(data?.data[0].Relationship);
          setCname(data?.data[0].childName);
          setcGender(data?.data[0].childGender);
          setAge(data?.data[0].DOB);
          setFname(data?.data[0].fatherName);
          setFContact(data?.data[0].fatherContact);
        })
        .catch((error) => {});
    };
    runn();
  }, [rdmm]);

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

  const addNewPupill = async (e) => {
    e.preventDefault();
    setOpenLoading(true);
    await axios
      .put(`${process.env.REACT_APP_Server_Url}children/child/${child}`, {
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
  // if (childData?.length === 0) {
  //   return (
  //     <>
  //       <Popover
  //         open={open}
  //         anchorEl={open}
  //         onClose={handleCloseMenu}
  //         anchorOrigin={{ vertical: "center", horizontal: "center" }}
  //         transformOrigin={{ vertical: "center", horizontal: "center" }}
  //         PaperProps={{
  //           sx: {
  //             mt: 1.5,
  //             ml: 0.75,
  //             width: 570,
  //           },
  //         }}
  //       >
  //         <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
  //           <Box
  //             sx={{
  //               flexGrow: 1,
  //               display: "flex",
  //               alignItems: "center",
  //               justifyContent: "space-between",
  //               flexDirection: "row-reverse",
  //             }}
  //           >
  //             <IconButton
  //               size="large"
  //               color="inherit"
  //               onClick={(e) => handleCloseMenu(e)}
  //               sx={{ color: "#B6B6B4" }}
  //             >
  //               X
  //             </IconButton>

  //             <Typography
  //               variant="h3"
  //               sx={{ marginBottom: 2, color: "#000099" }}
  //             >
  //               Update Child Record
  //             </Typography>
  //           </Box>
  //         </Box>
  //         <Box
  //           sx={{
  //             display: "flex",
  //             alignItems: "center",
  //             justifyContent: "space-between",
  //             flexDirection: "row",
  //             width: "100%",
  //             marginRight: "50%",
  //             marginLeft: "50%",
  //           }}
  //         >
  //           <CircularProgress />
  //         </Box>
  //       </Popover>
  //     </>
  //   );
  // }
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
              onClick={(e) => handleCloseMenu(e)}
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

            <TextField
              name="Gender"
              label="Gender"
              sx={{ marginBottom: 2 }}
              required
              onChange={(e) => setcGender(e.target.value)}
              value={cGender}
            />
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
          <Button fullWidth disableRipple onClick={(e) => addNewPupill(e)}>
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
