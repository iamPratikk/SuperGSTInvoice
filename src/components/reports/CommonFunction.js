export function getOneWeekAgoDate() {
    const currentDate = new Date();
    const oneWeekAgoDate = new Date(currentDate);
    oneWeekAgoDate.setDate(currentDate.getDate() - 7);
    const formattedDate = `${oneWeekAgoDate.getFullYear()}-${(
      oneWeekAgoDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${oneWeekAgoDate
      .getDate()
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  }

export const getCurrentDate = () => {
    const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
  };

  const d= new Date();
  export const currentTime= d.toLocaleTimeString();
  export const options={
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
}
export const dateOptions = { day: 'numeric', month: 'short', year: 'numeric' };
export const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }
  // export const hour=currentTime.slice(0,2);
  // export const minute=currentTime.slice(3,5);

