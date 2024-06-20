export function formatDate(dateString) {
  // Create a Date object from the provided string
  const date = new Date(dateString);

  // Define months array for formatting
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Extract day, month, and year from the Date object
  const day = date.getUTCDate();
  const monthIndex = date.getUTCMonth();
  const year = date.getUTCFullYear();

  // Format the date as "DD-Mon-YYYY"
  const formattedDate = `${day}-${months[monthIndex]}-${year}`;

  return formattedDate;
}
