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
  TextField,
  Checkbox,
  Stack,
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

function AddNewPupil({ open, handleCloseMenu }) {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  return (
    <>
      <Popover
        open={open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 570,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row-reverse',
            }}
          >
            <IconButton size="large" color="inherit" onClick={handleCloseMenu} sx={{ color: '#B6B6B4' }}>
              X
            </IconButton>

            <Typography variant="h3" sx={{ marginBottom: 2, color: '#000099' }}>
              Add New Child
            </Typography>
          </Box>
        </Box>

        {/* <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}> */}
        <Box sx={{ p: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ marginBottom: 1, color: '#000099', marginLeft: 1 }}>
            Parent
          </Typography>
          <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TextField name="pname" label="Name" sx={{ marginBottom: 2 }} />
            <TextField name="pcontact" label="Contact" sx={{ marginBottom: 2 }} />
            <TextField name="prelationship" label="Relationship" sx={{ marginBottom: 2 }} />
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          <Typography variant="h4" gutterBottom sx={{ marginBottom: 1, color: '#000099', marginLeft: 1 }}>
            Child
          </Typography>
          <Box sx={{ p: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TextField name="cname" label="Name" sx={{ marginBottom: 2 }} />
            <TextField name="cgender" label="Gender" sx={{ marginBottom: 2 }} />
            <TextField name="cdob" label="Date of Birth" sx={{ marginBottom: 2 }} />

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}
            >
              <Stack direction="row" alignItems="center" spacing={2} sx={{ marginRight: 5 }}>
                <Typography variant="h4" noWrap>
                  Visitor?
                </Typography>
              </Stack>
              <Checkbox name="remember" label="Remember me" />
            </Box>
          </Box>
        </Box>

        {/* </Scrollbar> */}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            Save
          </Button>
        </Box>
      </Popover>
    </>
  );
}

export default AddNewPupil;
