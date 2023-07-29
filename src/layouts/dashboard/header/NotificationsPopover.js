import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
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
} from '@mui/material';
// utils
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';

// ----------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: faker.datatype.uuid(),
    title: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: faker.name.fullName(),
    description: 'answered to your comment on the Minimal',
    avatar: '/assets/images/avatars/avatar_2.jpg',
    type: 'friend_interactive',
    createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
    isUnRead: true,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new message',
    description: '5 unread messages',
    avatar: null,
    type: 'chat_message',
    createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'You have new mail',
    description: 'sent from Guido Padberg',
    avatar: null,
    type: 'mail',
    createdAt: sub(new Date(), { days: 2, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
  {
    id: faker.datatype.uuid(),
    title: 'Delivery processing',
    description: 'Your order is being shipped',
    avatar: null,
    type: 'order_shipped',
    createdAt: sub(new Date(), { days: 3, hours: 3, minutes: 30 }),
    isUnRead: false,
  },
];

export default function NotificationsPopover({ open, handleCloseMenu }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  return (
    <>
      <Popover
        open={open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleCloseMenu}
              sx={{ marginBottom: 2, color: '#B6B6B4' }}
            >
              X
            </IconButton>

            <Typography variant="subtitle1" sx={{ marginBottom: 2, color: '#000099' }}>
              History
            </Typography>

            <Typography variant="subtitle1">Sample Pupil Name</Typography>
          </Box>
        </Box>

        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}> */}
        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ px: 2.5, typography: 'overline', color: '#000099' }}>
              May 2023
            </ListSubheader>
          }
          sx={{ marginBottom: 3 }}
        >
          {notifications.slice(2, 5).map((notification) => (
            // <NotificationItem key={notification.id} notification={notification} />
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0, px: 2.5, justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">28/05</Typography>
              <Checkbox
                name="remember"
                label="Remember me"
                sx={{ borderRadius: '10' }}

                // checked={selectedUser}
                // onChange={(event) => handleClick(event, name)}
              />
            </Box>
          ))}
        </List>

        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ px: 2.5, typography: 'overline', color: '#000099' }}>
              May 2023
            </ListSubheader>
          }
          sx={{ marginBottom: 3 }}
        >
          {notifications.slice(2, 5).map((notification) => (
            // <NotificationItem key={notification.id} notification={notification} />
            <Box sx={{ display: 'flex', alignItems: 'center', py: 0, px: 2.5, justifyContent: 'space-between' }}>
              <Typography variant="subtitle1">28/05</Typography>
              <Checkbox
                name="remember"
                label="Remember me"
                sx={{ borderRadius: '10' }}

                // checked={selectedUser}
                // onChange={(event) => handleClick(event, name)}
              />
            </Box>
          ))}
        </List>

        {/* </Scrollbar> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

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
