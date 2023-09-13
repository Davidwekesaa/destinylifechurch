import axios from "axios";
import * as XLSX from "xlsx";

export function formatDate() {
  const date = new Date(); // Replace this with your date object
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(date);
  return formattedDate;
}

export function getPresentToday(filteredUsers) {
  var presentToday = 0;
  filteredUsers?.map((data) => {
    data?.attendance?.reduce((accumulator, currentObject) => {
      if (currentObject.date === formatDate() && currentObject.present) {
        presentToday += 1;
      }
    }, null);
  });

  return presentToday;
}

export function isMissing(attent) {
  const isTodayPresent = attent.reduce((accumulator, currentObject) => {
    if (currentObject.date === formatDate() && !currentObject.present) {
      return true;
    }
    return false;
  }, null);

  return isTodayPresent;
}

export function isPresent(attent) {
  const isTodayPresent = attent.reduce((accumulator, currentObject) => {
    if (currentObject.date === formatDate() && currentObject.present) {
      return true;
    }
    return false;
  }, null);

  return isTodayPresent;
}

export const updateAttendanceIsPresent = async (e, id, setchangedIsPresent) => {
  e.preventDefault();
  await axios
    .put(`${process.env.REACT_APP_Server_Url}children/${id}`, {
      present: true,
    })
    .then((children) => {
      setchangedIsPresent(`${id}/true`);
    })
    .catch((error) => {});
};

export const updateAttendanceIsMissing = async (e, id, setchangedIsPresent) => {
  e.preventDefault();
  await axios
    .put(`${process.env.REACT_APP_Server_Url}children/${id}`, {
      present: false,
    })
    .then((children) => {
      setchangedIsPresent(`${id}/false`);
    })
    .catch((error) => {});
};

export function returnFirstLetter(name) {
  const firstLetter = name ? name[0]?.toUpperCase() : null;
  return firstLetter;
}

export function getPresentLastWeek(filteredUsers) {
  var presentLastWeek = 0;
  filteredUsers?.map((data) => {
    if (
      data?.attendance?.length === 1 &&
      data?.attendance[data?.attendance?.length - 1]?.present &&
      data?.attendance[data?.attendance?.length - 1]?.date != formatDate()
    ) {
      presentLastWeek += 1;
    } else if (
      data?.attendance?.length > 1 &&
      data?.attendance[data?.attendance?.length - 2]?.present &&
      data?.attendance[data?.attendance?.length - 2]?.date != formatDate()
    ) {
      presentLastWeek += 1;
    }
  });

  return presentLastWeek;
}

export const formatPickedDate = (date) => {
  const inputDate = new Date(date);

  const day = inputDate.getUTCDate();
  const month = inputDate.getUTCMonth() + 1; // Adding 1 since months are 0-based
  const year = inputDate.getUTCFullYear();

  const formattedDate = `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;

  return formattedDate;
};

export const calculateAge = (birthdateStr) => {
  let birthdate = parseDate(birthdateStr);
  let currentDate = new Date();

  let yearsDiff = currentDate.getFullYear() - birthdate.getFullYear();
  let birthMonth = birthdate.getMonth();
  let currentMonth = currentDate.getMonth();

  let monthsDiff = currentMonth - birthMonth;

  if (monthsDiff < 0) {
    monthsDiff += 12;
  }

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDate.getDate() < birthdate.getDate())
  ) {
    yearsDiff--; // Adjust years if birthdate hasn't occurred yet this year
  }

  if (yearsDiff === 0) {
    return `${monthsDiff} month${monthsDiff !== 1 ? "s" : ""}`;
  }

  if (monthsDiff === 0) {
    return `${yearsDiff} year${yearsDiff !== 1 ? "s" : ""}`;
  }

  return `${yearsDiff} year${
    yearsDiff !== 1 ? "s" : ""
  } and ${monthsDiff} month${monthsDiff !== 1 ? "s" : ""}`;
};

function parseDate(dateStr) {
  const parts = dateStr.split("/");
  return new Date(parts[2], parts[1] - 1, parts[0]);
}

export const chooseFunction = (e, id, setchangedIsPresent, isPresent) => {
  e.preventDefault();
  if (isPresent) {
    updateAttendanceIsMissing(e, id, setchangedIsPresent);
  } else {
    updateAttendanceIsPresent(e, id, setchangedIsPresent);
  }
};

export const sanitiseUser = (data) => {
  let children = [];
  data.map((child) => {
    let Atendance = [];
    child?.attendance?.map((attend) => {
      Atendance.push({
        [getWeekOfMonth(attend?.date)]: attend?.present ? "Present" : "Absent",
      });
    });
    let margedAtendance = Atendance?.reduce((result, obj) => {
      Object.keys(obj).forEach((key) => {
        result[key] = obj[key];
      });
      return result;
    }, {});

    let user = {
      Child_Name: child?.childName,
      Gender: child?.childGender,
      Age: child?.DOB ? calculateAge(child?.DOB) : "",
      Group: child?.childCategory,
      Parents:
        child?.fatherName && child?.parentName
          ? ` ${child?.fatherName} + " " + "/" + " " + ${child?.parentName} `
          : child?.fatherName && !child?.parentName
          ? child?.fatherName
          : child?.parentName,
      Parents_Contact:
        child?.fatherContact && child?.parentContact
          ? ` ${child?.fatherContact} + " " + "/" + " " + ${child?.parentContact} `
          : child?.fatherContact && !child?.parentContact
          ? child?.fatherContact
          : child?.parentContact,
    };

    let margedObject = { ...user, ...margedAtendance };

    children.push(margedObject);

    Atendance.length = 0;
  });

  return children;
};

function parseDatee(dateString) {
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const year = parseInt(parts[2], 10);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      return new Date(year, month, day);
    }
  }
  return null; // Invalid date format
}
export function getWeekOfMonth(dat) {
  let date = parseDatee(dat);
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const dayOfMonth = date.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dayOfWeek = date.getDay();
  const weekNumber = Math.ceil((dayOfMonth + dayOfWeek) / 7);

  // return `WK ${weekNumber} [${dayOfMonth}${daySuffix}]`;
  return `WK ${weekNumber} [${dayOfMonth}]`;
}

export const handleUpload = (
  e,
  Uploading,
  changedIsPresent,
  loading,
  uploadComplete
) => {
  e.preventDefault();
  loading();
  Uploading(true);

  var files = e.target.files,
    f = files[0];
  var reader = new FileReader();
  reader.onload = function (e) {
    var data = e.target.result;
    let readedData = XLSX.read(data, { type: "binary" });
    const wsname = readedData.SheetNames[0];
    const ws = readedData.Sheets[wsname];
    /* Convert array to json*/
    const dataParse = XLSX.utils.sheet_to_json(ws, { header: 0, raw: false });

    handleuploadcsv(
      dataParse,
      Uploading,
      changedIsPresent,
      loading,
      uploadComplete
    );
  };
  reader.readAsBinaryString(f);
};

const handleuploadcsv = (
  data,
  Uploading,
  changedIsPresent,
  loading,
  uploadComplete
) => {
  const addToDB = async () => {
    await axios
      .post(`${process.env.REACT_APP_Server_Url}children/xlsx/`, { data })
      .then((logins) => {
        Uploading(false);
        uploadComplete();
        let x = Math.random() * 100;
        changedIsPresent(x);
      })
      .catch((error) => {});
  };
  addToDB();
};

export const hundleRowDelete = async (
  e,
  id,
  setchangedIsPresent,
  deleteComplete
) => {
  e.preventDefault();
  await axios
    .delete(`${process.env.REACT_APP_Server_Url}children/${id}`)
    .then((children) => {
      deleteComplete();
      setchangedIsPresent(Math.random() * 1000);
    })
    .catch((error) => {});
};

export function reverseformatDate(inputDate) {
  // Split the input date into day, month, and year
  const parts = inputDate.split("/");
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  // Create a new Date object with the provided year, month, and day
  const formattedDate = new Date(`${year}-${month}-${day}T21:00:00.000Z`);

  // Return the formatted date as a string
  return formattedDate.toISOString();
}
