import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// @mui
import {
  Link,
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Checkbox,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components
import Iconify from "../../../components/iconify";
import { actionType } from "../../../store/reducer";
import { useStateValue } from "../../../store/StateProvider";
import axios from "axios";
import Logging from "../../../layouts/dashboard/header/Logging";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openLoading, setOpenLoading] = useState(null);

  const emptyFields = () => toast.error("All the fields are required");
  const wronUser = () => toast.error("Wrong user email or password");

  const handleCloseLoging = () => {
    setOpenLoading(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0 || password.trim().length === 0) {
      emptyFields();
    } else {
      setOpenLoading(true);
      await axios
        .post(`${process.env.REACT_APP_Server_Url}auth/login`, {
          userEmail: email,
          password: password,
        })
        .then((logins) => {
          sessionStorage.setItem("user", JSON.stringify(logins.data));
          dispatch({
            type: actionType.SET_USER,
            user: logins.data,
          });
          setOpenLoading(null);
          navigate("/dashboard", { replace: true });
        })
        .catch((error) => {
          setOpenLoading(null);
          wronUser();
        });
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
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
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        {/* <Checkbox name="remember" label="Remember me" /> */}
        {/* <Link
          variant="subtitle2"
          underline="hover"
          onClick={(e) => navigate("/register", { replace: true })}
          sx={{ cursor: "pointer" }}
        >
          Create Account?
        </Link> */}
        <Link variant="subtitle2" underline="hover" sx={{ cursor: "pointer" }}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={handleSubmit}
      >
        Login
      </LoadingButton>
      <Logging
        open={Boolean(openLoading)}
        handleCloseMenu={handleCloseLoging}
        // headTextdata={headtext}
      />
      <ToastContainer />
    </>
  );
}
