export const dateFormat = (dateTime) => {
  const today = new Date(dateTime);
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
  const getDate = `${day}-${month < 10 ? `0${month}` : month}-${year}`;

  return getDate;
};
