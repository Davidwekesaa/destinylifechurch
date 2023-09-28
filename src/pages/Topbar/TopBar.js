import React from "react";
import { Typography, Box, Stack, Container } from "@mui/material";
import useResponsive from "../../hooks/useResponsive";
import { useStateValue } from "../../store/StateProvider";
import { actionType } from "../../store/reducer";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import ActiveRegiter from "./ActiveRegiter";
import ReportAndAddUser from "./ReportAndAddUser";
import PresentOn from "./PresentOn";

function TopBar({
  headtext,
  isUploading,
  filteredUsers,
  sanitiseUser,
  handleOpenRegister,
  getPresentToday,
  getPresentLastWeek,
}) {
  const isDesktop = useResponsive("up", "lg");
  const [{ nav, user }, dispatch] = useStateValue();

  //open navigation
  const openNav = () => {
    sessionStorage.setItem("nav", !nav);
    dispatch({
      type: actionType.SET_NAV,
      nav: !nav,
    });
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            px: 0,
            py: 0,
            marginTop: -10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: "#000099", cursor: "pointer" }}
            display={isDesktop ? "none" : "inline-block"}
            onClick={openNav}
          >
            <ViewHeadlineIcon />
          </Typography>
        </Box>
        <Stack className="top-bar">
          <ActiveRegiter headtext={headtext} isUploading={isUploading} />
          <ReportAndAddUser
            filteredUsers={filteredUsers}
            sanitiseUser={sanitiseUser}
            headtext={headtext}
            handleOpenRegister={handleOpenRegister}
          />
          <PresentOn
            filteredUsers={filteredUsers}
            getPresentToday={getPresentToday}
            getPresentLastWeek={getPresentLastWeek}
          />
        </Stack>
      </Container>
    </>
  );
}

export default TopBar;
