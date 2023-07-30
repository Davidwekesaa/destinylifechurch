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
  Checkbox,
} from "@mui/material";
// utils
import { fToNow } from "../../../utils/formatTime";
// components
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";

// ----------------------------------------------------------------------

export default function NotificationsPopover({
  open,
  handleCloseMenu,
  searchData,
}) {
  const formatDate = (originalDate) => {
    const [year, month, day] = originalDate.split("-");

    const formattedDate = `${day}/${month}`;
    return formattedDate;
  };
  return (
    <>
      <Popover
        open={open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleCloseMenu}
              sx={{ marginBottom: 2, color: "#B6B6B4" }}
            >
              X
            </IconButton>

            <Typography
              variant="subtitle1"
              sx={{ marginBottom: 2, color: "#000099" }}
            >
              History
            </Typography>

            <Typography variant="subtitle1">{searchData?.childName}</Typography>
          </Box>
        </Box>

        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}> */}

        {searchData?.attendance?.map((notification) => (
          <List
            disablePadding
            subheader={
              <ListSubheader
                disableSticky
                sx={{ px: 2.5, typography: "overline", color: "#000099" }}
              >
                {notification?.month}
              </ListSubheader>
            }
            sx={{ marginBottom: 3 }}
          >
            {notification?.attend?.map((notiAttend) => (
              // <NotificationItem key={notification.id} notification={notification} />
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 0,
                  px: 2.5,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="subtitle1">
                  {formatDate(notiAttend?.date)}
                </Typography>
                <Checkbox
                  name="remember"
                  label="Remember me"
                  sx={{ borderRadius: "10" }}
                  checked={notiAttend?.present ? true : false}
                  // onChange={(event) => handleClick(event, name)}
                />
              </Box>
            ))}
          </List>
        ))}

        {/* </Scrollbar> */}

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

// ----------------------------------------------------------------------
