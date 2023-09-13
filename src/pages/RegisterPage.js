import { Helmet } from "react-helmet-async";
// @mui
import { styled } from "@mui/material/styles";
import {
  Link,
  Container,
  Typography,
  Divider,
  Stack,
  Button,
  Popover,
} from "@mui/material";
// hooks
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
import Iconify from "../components/iconify";
// sections
import { Register } from "../sections/auth/register";
import { ToastContainer, toast } from "react-toastify";

// ----------------------------------------------------------------------

const StyledRoot = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const StyledSection = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: 480,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function RegisterPage({ open, handleCloseMenu }) {
  const mdUp = useResponsive("up", "md");

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
        <Helmet>
          <title> Destiny Life Church | Register </title>
        </Helmet>

        <StyledRoot>
          {/* <Logo
            sx={{
              position: "fixed",
              top: { xs: 16, sm: 24, md: 40 },
              left: { xs: 16, sm: 24, md: 40 },
            }}
          /> */}

          {mdUp && (
            <StyledSection>
              <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                Hi, Welcome Back
              </Typography>
              <img
                src="/assets/illustrations/illustration_login.png"
                alt="login"
              />
            </StyledSection>
          )}

          <Container maxWidth="sm">
            <StyledContent>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ marginBottom: 5, color: "#000099" }}
              >
                CLERK ON DUTY REGISTER
              </Typography>

              <Register handleCloseMenu={handleCloseMenu} />
            </StyledContent>
          </Container>
        </StyledRoot>
      </Popover>
      <ToastContainer />
    </>
  );
}
