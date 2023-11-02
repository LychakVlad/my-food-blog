export default function dateConvert(date: Date) {
  const convertedDate = new Date(date);

  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  };

  const day = convertedDate.getDate();
  const month = convertedDate.toLocaleString('en-US', { month: 'short' });
  const year = convertedDate.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
}
