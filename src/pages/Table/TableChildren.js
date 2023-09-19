import React from "react";
import {
  Card,
  Table,
  Stack,
  Checkbox,
  TableRow,
  TableCell,
  Typography,
  IconButton,
} from "@mui/material";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import { useStateValue } from "../../store/StateProvider";

function TableChildren({
  row,
  calculateAge,
  returnFirstLetter,
  isPresent,
  chooseFunction,
  setchangedIsPresent,
  handleOpenMenuHistory,
  handleClickOpenEditPopUp,
  hundleRowDelete,
  deleteComplete,
}) {
  const [{ nav, user }, dispatch] = useStateValue();
  return (
    <TableRow
      hover
      key={row._id}
      tabIndex={-1}
      role="checkbox"
      // selected={selectedUser}
    >
      <TableCell
        component="th"
        scope="row"
        padding="none"
        sx={{ paddingLeft: "20px" }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography variant="subtitle2" noWrap>
            {row?.childName}
          </Typography>
        </Stack>
      </TableCell>

      <TableCell align="left">
        {" "}
        {row?.DOB ? calculateAge(row?.DOB) : null}
      </TableCell>

      <TableCell align="left">{returnFirstLetter(row.childGender)}</TableCell>

      <TableCell align="left">
        {row?.fatherName && row?.parentName
          ? ` ${row?.fatherName} / ${row?.parentName} `
          : row?.fatherName && !row?.parentName
          ? row?.fatherName
          : row?.parentName}
      </TableCell>

      <TableCell align="left">
        {row?.fatherContact && row?.parentContact
          ? ` ${row?.fatherContact} / ${row?.parentContact} `
          : row?.fatherContact && !row?.parentContact
          ? row?.fatherContact
          : row?.parentContact}
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
          sx={{ borderRadius: 10 }}
          checked={isPresent(row.attendance)}
          disabled={user?.userRights === 3 ? true : false}
          onChange={(event) =>
            chooseFunction(
              event,
              row._id,
              setchangedIsPresent,
              isPresent(row.attendance)
            )
          }
        />
      </TableCell>

      <TableCell align="right">
        <IconButton
          size="small"
          color="inherit"
          onClick={(event) => handleOpenMenuHistory(event, row._id)}
        >
          <HistoryToggleOffIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </TableCell>
      {user.userRights === 1 ? (
        <TableCell align="left">
          <IconButton size="small" color="inherit">
            <span
              className={`dash-status edit`}
              // onClick={(`${row.status}`)}
              onClick={(e) => handleClickOpenEditPopUp(e, row._id)}
            >
              Edit
            </span>
            {"   "}
            <span
              className={`dash-status declined`}
              // onClick={(`${row.status}`)}
              onClick={(e) =>
                hundleRowDelete(e, row._id, setchangedIsPresent, deleteComplete)
              }
            >
              Delete
            </span>
          </IconButton>
        </TableCell>
      ) : (
        ""
      )}
    </TableRow>
  );
}

export default TableChildren;
