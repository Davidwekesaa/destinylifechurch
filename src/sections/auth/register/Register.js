import { useState } from "react";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { actionType } from "../../../store/reducer";
import { useStateValue } from "../../../store/StateProvider";
import axios from "axios";
import Logging from "../../../layouts/dashboard/header/Logging";
// ----------------------------------------------------------------------

export default function Register({ handleCloseMenu }) {
  const [{}, dispatch] = useStateValue();
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [openLoading, setOpenLoading] = useState(null);
  const [superUser, setSuperUser] = useState(false);
  const navigate = useNavigate();

  const emptyFields = () => toast.error("All the fields are required");
  const wronUser = () => toast.error("An Error Occured");
  const userAdde = () => toast.success("User Added Successfully");

  const [showPassword, setShowPassword] = useState(false);

  const handleCloseLoging = () => {
    setOpenLoading(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userName.trim().length === 0 ||
      userEmail.trim().length === 0 ||
      userPassword.trim().length === 0
    ) {
      emptyFields();
    } else {
      setOpenLoading(true);
      await axios
        .post(`${process.env.REACT_APP_Server_Url}auth/register`, {
          userEmail: userEmail,
          password: userPassword,
          userName: userName,
          userRights: superUser ? "superuser" : "clerk",
        })
        .then((logins) => {
          userAdde();
          setOpenLoading(null);
          handleCloseMenu(e);
        })
        .catch((error) => {
          console.log("register error", error);
          setOpenLoading(null);
          wronUser();
        });
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="userName"
          label="User Name"
          value={userName}
          onChange={(e) => setuserName(e.target.value)}
        />
        <TextField
          name="email"
          label="Email address"
          value={userEmail}
          onChange={(e) => setuserEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={userPassword}
          onChange={(e) => setuserPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        flexDirection={"row-reverse"}
        sx={{ my: 2 }}
      >
        <Checkbox
          name="remember"
          label="Remember me"
          value={superUser}
          onChange={(e) => setSuperUser(!superUser)}
        />
        <Typography variant="subtitle2" underline="hover">
          Super User?
        </Typography>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={(e) => handleSubmit(e)}
      >
        Register
      </LoadingButton>
      {/* <ToastContainer /> */}
      <Logging
        open={Boolean(openLoading)}
        handleCloseMenu={handleCloseLoging}
        // headTextdata={headtext}
      />
      <ToastContainer />
    </>
  );
}
