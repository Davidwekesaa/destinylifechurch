import axios from "axios";

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
  const firstLetter = name[0].toUpperCase();
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
        [attend?.date]: attend?.present,
      });
    });
    let margedAtendance = Atendance?.reduce((result, obj) => {
      Object.keys(obj).forEach((key) => {
        result[key] = obj[key];
      });
      return result;
    }, {});

    console.log("attendance", margedAtendance);

    let user = {
      Child_Name: child?.childName,
      Gender: child?.childGender,
      Age: calculateAge(child?.DOB),
      Group: child?.childCategory,
      Parents: child?.fatherName + " " + "/" + " " + child?.parentName,
      Parents_Contact:
        child?.fatherContact + " " + "/" + " " + child?.parentContact,
    };

    let margedObject = { ...user, ...margedAtendance };

    children.push(margedObject);
    console.log("marge", children);
    Atendance.length = 0;
  });

  return children;
};
