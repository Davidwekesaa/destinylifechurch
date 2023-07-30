import { Helmet } from "react-helmet-async";
import { filter } from "lodash";
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from "react";
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
  Divider,
  Box,
  LinearProgress,
} from "@mui/material";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import Iconify from "../components/iconify";
import Scrollbar from "../components/scrollbar";
// sections
import { UserListHead, UserListToolbar } from "../sections/@dashboard/user";
// mock
// import USERLIST from "../_mock/user";
import NotificationsPopover from "../layouts/dashboard/header/NotificationsPopover";
import AddNewPupil from "../layouts/dashboard/header/AddNewPupil";
import useResponsive from "../hooks/useResponsive";
import { useStateValue } from "../store/StateProvider";
import { actionType } from "../store/reducer";
import { formatDate } from "../utils/FormatDate";
import axios from "axios";

// ----------------------------------------------------------------------
const presentOn = `Present on ${formatDate()}`;

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "age", label: "Age", alignRight: false },
  { id: "gender", label: "Gender", alignRight: false },
  { id: "parentGurdian", label: "Parent/Gurdian", alignRight: false },
  { id: "parentContact", label: "Parent Contacts", alignRight: false },
  { id: "present", label: presentOn, alignRight: false },
  { id: "history", label: "History", alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function UserPage({ headtext }) {
  const [{ nav }, dispatch] = useStateValue();
  const [openHistory, setOpenHistory] = useState(null);
  const [openAddNewPupil, setOpenAddNewPupil] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("name");

  const [filterName, setFilterName] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    //get all products
    const getAllChildren = async () => {
      await axios
        .get(`http://localhost:5000/api/childrens/`)
        .then((children) => {
          setFilteredUsers(children.data);
          console.log(children);
        })
        .catch((error) => {});
    };

    getAllChildren();
  }, []);

  const handleOpenMenuHistory = (event) => {
    setOpenHistory(event.currentTarget);
  };

  const handleCloseMenuHistory = () => {
    setOpenHistory(null);
  };

  const handleOpenMenuAddNewPupil = (event) => {
    setOpenAddNewPupil(event.currentTarget);
  };

  const handleCloseMenuAddNewPupil = () => {
    setOpenAddNewPupil(null);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = filteredUsers.map((n) => n.childName);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    // const selectedIndex = selected.indexOf(name);
    // let newSelected = [];
    // if (selectedIndex === -1) {
    //   newSelected = newSelected.concat(selected, name);
    // } else if (selectedIndex === 0) {
    //   newSelected = newSelected.concat(selected.slice(1));
    // } else if (selectedIndex === selected.length - 1) {
    //   newSelected = newSelected.concat(selected.slice(0, -1));
    // } else if (selectedIndex > 0) {
    //   newSelected = newSelected.concat(
    //     selected.slice(0, selectedIndex),
    //     selected.slice(selectedIndex + 1)
    //   );
    // }
    // setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const openNav = () => {
    localStorage.setItem("nav", !nav);
    dispatch({
      type: actionType.SET_NAV,
      nav: !nav,
    });
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers?.length)
      : 0;

  // const filteredUsers = applySortFilter(
  //   filteredUsers,
  //   getComparator(order, orderBy),
  //   filterName
  // );

  const isNotFound = !filteredUsers?.length && !!filterName;
  const heightRow = 100 * rowsPerPage + 5;

  if (filteredUsers.length === 0) {
    return (
      <>
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: "#000099", display: "flex", alignContent: "center" }}
          >
            Loading pleace wait...
          </Typography>
          <LinearProgress />
        </Box>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title> Destiny Life Church </title>
      </Helmet>

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
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={0}
        >
          <Typography variant="h3" gutterBottom sx={{ color: "#000099" }}>
            Active Register for {headtext}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="center" mb={0}>
          <Typography variant="h4" gutterBottom>
            <UserListToolbar
              filterName={filterName}
              onFilterName={handleFilterByName}
            />
          </Typography>
          <Stack direction="row" alignItems="center" mb={0}>
            <Typography
              variant="h5"
              gutterBottom
              pr={5}
              sx={{ color: "#B6B6B4" }}
            >
              33/45 Present Today
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              pr={5}
              sx={{ color: "#B6B6B4" }}
            >
              33/45 Present Today
            </Typography>
          </Stack>
        </Stack>
        <Divider sx={{ borderStyle: "solid" }} mb={5} fontSize={500} />
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          mt={3}
        >
          <Button
            variant="contained"
            startIcon={<Iconify icon="ic_disabled" />}
            sx={{ backgroundColor: "#000099" }}
            onClick={handleOpenMenuAddNewPupil}
          >
            Add New Child
          </Button>
        </Stack>
        <Card>
          <Scrollbar sx={{ height: heightRow }}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      const selectedUser = selected.indexOf(row.id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, row.id)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {row.childName}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{row.childAge}</TableCell>

                          <TableCell align="left">{row.childGender}</TableCell>

                          <TableCell align="left">{row.parentName}</TableCell>

                          <TableCell align="left">
                            {row.parentContact}
                          </TableCell>

                          <TableCell
                            align="left"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Checkbox
                              name="remember"
                              label="Remember me"
                              sx={{ borderRadius: 10 }}
                              checked={selectedUser}
                              onChange={(event) =>
                                handleClick(event, row.childName)
                              }
                            />
                          </TableCell>

                          <TableCell align="left">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={handleOpenMenuHistory}
                            >
                              <HistoryToggleOffIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        {/* missing redister */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mt={10}
        >
          <Typography variant="h3" gutterBottom sx={{ color: "#000099" }}>
            Missing Register
          </Typography>
        </Stack>
        <Divider sx={{ borderStyle: "solid", font: 200 }} />
        <Card sx={{ marginTop: 5 }}>
          <Scrollbar sx={{ height: heightRow }}>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={filteredUsers.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      const selectedUser = selected.indexOf(row.id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={row.id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={selectedUser}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={selectedUser}
                              onChange={(event) => handleClick(event, row.id)}
                            />
                          </TableCell>

                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Typography variant="subtitle2" noWrap>
                                {row.childName}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{row.childAge}</TableCell>

                          <TableCell align="left">{row.childGender}</TableCell>

                          <TableCell align="left">{row.parentName}</TableCell>

                          <TableCell align="left">
                            {row.parentContact}
                          </TableCell>

                          <TableCell
                            align="left"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Checkbox
                              name="remember"
                              label="Remember me"
                              checked={selectedUser}
                              onChange={(event) =>
                                handleClick(event, row.childName)
                              }
                            />
                          </TableCell>

                          <TableCell align="left">
                            <IconButton
                              size="large"
                              color="inherit"
                              onClick={handleOpenMenuHistory}
                            >
                              <HistoryToggleOffIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete
                            words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <NotificationsPopover
        open={Boolean(openHistory)}
        handleCloseMenu={handleCloseMenuHistory}
      />
      <AddNewPupil
        open={Boolean(openAddNewPupil)}
        handleCloseMenu={handleCloseMenuAddNewPupil}
      />
    </>
  );
}
