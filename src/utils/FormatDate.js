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
