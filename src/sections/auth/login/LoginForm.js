import React, { useState } from "react";
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

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim().length === 0 && password.trim().length === 0) {
      // emptyFields();
    } else {
      await axios
        .post(`${process.env.REACT_APP_Server_Url}auth/login`, {
          userEmail: email,
          password: password,
        })
        .then((logins) => {
          localStorage.setItem("user", JSON.stringify(logins.data));
          dispatch({
            type: actionType.SET_USER,
            user: logins.data,
          });
          navigate("/dashboard", { replace: true });
        })
        .catch((error) => {
          // wronUser();
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
        <Link
          variant="subtitle2"
          underline="hover"
          onClick={(e) => navigate("/register", { replace: true })}
          sx={{ cursor: "pointer" }}
        >
          Create Account?
        </Link>
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
    </>
  );
}
