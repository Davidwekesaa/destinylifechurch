import axios from "axios";

export function formatDate() {
  const date = new Date(); // Replace this with your date object
  const options = {
    year: "2-digit",
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
  console.log(attent);
  const isTodayPresent = attent.reduce((accumulator, currentObject) => {
    if (currentObject.date === formatDate() && !currentObject.present) {
      return true;
    }
    return false;
  }, null);

  return isTodayPresent;
}

export function isPresent(attent) {
  console.log(attent);
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
