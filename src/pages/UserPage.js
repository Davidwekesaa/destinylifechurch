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
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
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
import {
  formatDate,
  getPresentToday,
  isMissing,
  isPresent,
  updateAttendanceIsPresent,
  updateAttendanceIsMissing,
  returnFirstLetter,
  getPresentLastWeek,
  calculateAge,
  chooseFunction,
  sanitiseUser,
  handleUpload,
  hundleRowDelete,
} from "../utils/userPageFunctions";
import axios from "axios";
import Logo from "../components/logo/Logo";
import { ExportCSV } from "../utils/excell/ExportCSV";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatePupil from "src/layouts/dashboard/header/UpdatePupil";
import RegisterPage from "./RegisterPage";
import TopBar from "./Topbar/TopBar";
import TableChildren from "./Table/TableChildren";
import AddAndSearch from "./Topbar/AddAndSearch";
import Paging from "./Table/Paging";

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function UserPage({ headtext }) {
  const [{ nav, user }, dispatch] = useStateValue();
  const [openHistory, setOpenHistory] = useState(null);
  const [openAddNewPupil, setOpenAddNewPupil] = useState(null);

  const [page, setPage] = useState(1);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState("");

  const [orderBy, setOrderBy] = useState("name");

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [historyData, sethistoryData] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const isDesktop = useResponsive("up", "lg");

  const [changedIsPresent, setchangedIsPresent] = useState("");

  const [searchUsers, setSearchUsers] = useState([]);
  const [getStats, setGetStats] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const [child, setChild] = useState("");
  const [openchildpopup, setOpenchildpopup] = useState(null);
  const [rdmm, setRdmm] = useState("");

  const [openRegister, setOpenRegister] = useState(false);

  const [search, setSearch] = useState("");

  const uploading = () =>
    toast.success("The file is being uploaded please wait...");
  const uploadComplete = () => toast.success("File  uploaded successfully");
  const deleteComplete = () => toast.success("Deleted successfully");

  const TABLE_HEAD = [
    { id: "name", label: "Name", alignRight: false },
    { id: "age", label: "Age", alignRight: false },
    { id: "gender", label: "Gender", alignRight: false },
    { id: "parentGurdian", label: "Parent/Gurdian", alignRight: false },
    { id: "parentContact", label: "Parent Contacts", alignRight: false },
    {
      id: "present",
      label: `Present on ${formatDate()}`,
      alignRight: false,
    },
    { id: "history", label: "History", alignRight: false },
    user?.userRights === 1
      ? { id: "action", label: "Action", alignRight: false }
      : "",
    // { id: '' },
  ];

  useEffect(() => {
    //get all products
    if (searchUsers?.length !== 0 && search?.length !== 0) {
      const toSearch = async (e) => {
        e.preventDefault();
        await axios
          .get(
            `${
              process.env.REACT_APP_Server_Url
            }children/child/${search}/?p=${parseInt(page)}&limit=${parseInt(
              rowsPerPage
            )}`
          )
          .then((children) => {
            setSearchUsers(children?.data);
          })
          .catch((error) => {});
      };
      toSearch();
    } else {
      const getAllChildren = async () => {
        await axios
          .get(
            `${process.env.REACT_APP_Server_Url}children/?p=${parseInt(
              page
            )}&limit=${parseInt(rowsPerPage)}&group=${headtext}`
          )
          .then((children) => {
            console.log("data", children?.data);
            setFilteredUsers(children?.data);
          })
          .catch((error) => {});
      };
      const getStats = async () => {
        await axios
          .get(
            `${process.env.REACT_APP_Server_Url}children/stats/child/?group=${headtext}`
          )
          .then((children) => {
            setGetStats(children?.data);
          })
          .catch((error) => {});
      };
      getStats();
      getAllChildren();
    }
  }, [headtext, changedIsPresent, page, rowsPerPage]);

  //serch

  const handleOpenMenuHistory = async (event, id) => {
    event.preventDefault();
    if (id?.trim().length === 0) {
    } else {
      await axios
        .get(`${process.env.REACT_APP_Server_Url}history/${id}`)
        .then((children) => {
          sethistoryData(children.data);
          setOpenHistory(true);
        })
        .catch((error) => {});
    }
  };

  const handleClickOpenEditPopUp = async (event, id) => {
    event.preventDefault();
    const rdm = Math.floor(Math.random() * (1 - 1000)) + 1000;
    setRdmm(rdm);
    setChild(id);
    setOpenchildpopup(true);
  };
  const handleCloseMenuHistory = (e) => {
    e.preventDefault();
    setOpenHistory(null);
  };
  const handleCloseEditNewPupil = () => {
    setOpenchildpopup(null);
  };
  const handleOpenMenuAddNewPupil = (event) => {
    event.preventDefault();
    setOpenAddNewPupil(event.currentTarget);
  };
  const handleCloseRegister = (e) => {
    e.preventDefault();
    setOpenRegister(null);
  };
  const handleOpenRegister = (e) => {
    e.preventDefault();
    setOpenRegister(true);
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

  const handleClick = (event, id) => {
    event.preventDefault();

    setSelected(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    // setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const openNav = () => {
    sessionStorage.setItem("nav", !nav);
    dispatch({
      type: actionType.SET_NAV,
      nav: !nav,
    });
  };

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers?.length)
      : 0;

  const heightRow = 100 * rowsPerPage + 5;

  if (filteredUsers?.length === 0) {
    return (
      <>
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "10%",
          }}
        >
          <Logo />
          <Button
            variant="contained"
            startIcon={<Iconify icon="ic_disabled" />}
            sx={{ backgroundColor: "#000099", marginTop: 5 }}
            onClick={handleOpenMenuAddNewPupil}
          >
            <AddIcon />
            Add New Child
          </Button>
          {user?.userRights === 3 || user?.userRights === 0 ? (
            ""
          ) : (
            <Button
              onClick={() => document.getElementById("fileInput").click()}
              className="fileInputTex"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload File"}
            </Button>
          )}
        </Box>
        <AddNewPupil
          open={Boolean(openAddNewPupil)}
          handleCloseMenu={handleCloseMenuAddNewPupil}
          headTextdata={headtext}
        />
        <input
          type="file"
          id="fileInput"
          className="fileInputText"
          onChange={(e) =>
            handleUpload(
              e,
              setIsUploading,
              setchangedIsPresent,
              uploading,
              uploadComplete
            )
          }
        />
        <ToastContainer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title> Destiny Life Church </title>
      </Helmet>

      <Container>
        <TopBar
          headtext={headtext}
          isUploading={isUploading}
          filteredUsers={getStats}
          sanitiseUser={sanitiseUser}
          handleOpenRegister={handleOpenRegister}
          getPresentToday={getPresentToday}
          getPresentLastWeek={getPresentLastWeek}
        />
        <Divider sx={{ borderStyle: "solid" }} mb={5} fontSize={500} />

        <AddAndSearch
          handleOpenMenuAddNewPupil={handleOpenMenuAddNewPupil}
          setSearchUsers={setSearchUsers}
          filteredUsers={filteredUsers}
          search={search}
          setSearch={setSearch}
        />
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
                  {searchUsers?.length !== 0
                    ? searchUsers?.map((row) => (
                        <TableChildren
                          key={row._id}
                          row={row}
                          calculateAge={calculateAge}
                          returnFirstLetter={returnFirstLetter}
                          isPresent={isPresent}
                          chooseFunction={chooseFunction}
                          setchangedIsPresent={setchangedIsPresent}
                          handleOpenMenuHistory={handleOpenMenuHistory}
                          handleClickOpenEditPopUp={handleClickOpenEditPopUp}
                          hundleRowDelete={hundleRowDelete}
                          deleteComplete={deleteComplete}
                        />
                      ))
                    : filteredUsers?.map((row) => (
                        <TableChildren
                          key={row._id}
                          row={row}
                          calculateAge={calculateAge}
                          returnFirstLetter={returnFirstLetter}
                          isPresent={isPresent}
                          chooseFunction={chooseFunction}
                          setchangedIsPresent={setchangedIsPresent}
                          handleOpenMenuHistory={handleOpenMenuHistory}
                          handleClickOpenEditPopUp={handleClickOpenEditPopUp}
                          hundleRowDelete={hundleRowDelete}
                          deleteComplete={deleteComplete}
                        />
                      ))}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>
                {/* 
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
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
          <Paging
            setRowsPerPage={setRowsPerPage}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            page={page}
          />
        </Card>
      </Container>
      <NotificationsPopover
        open={openHistory}
        handleCloseMenu={handleCloseMenuHistory}
        searchData={historyData}
      />
      <AddNewPupil
        open={Boolean(openAddNewPupil)}
        handleCloseMenu={handleCloseMenuAddNewPupil}
        headTextdata={headtext}
      />
      <UpdatePupil
        open={Boolean(openchildpopup)}
        handleCloseMenu={handleCloseEditNewPupil}
        cganges={setchangedIsPresent}
        child={child}
        rdmm={rdmm}
      />

      <RegisterPage
        open={Boolean(openRegister)}
        handleCloseMenu={handleCloseRegister}
      />
      <input
        type="file"
        id="fileInput"
        className="fileInputText"
        onChange={(e) =>
          handleUpload(
            e,
            setIsUploading,
            setchangedIsPresent,
            uploading,
            uploadComplete
          )
        }
      />
      <ToastContainer />
    </>
  );
}
