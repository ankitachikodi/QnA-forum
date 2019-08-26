const changeDate = dateFromFunction => {
  let date = "";
  let newDate = new Date(dateFromFunction);
  let timeDiff = Date.now() / 1000 - newDate.getTime() / 1000;
  if (timeDiff < 86400) {
    if (timeDiff < 3600) {
      if (timeDiff < 60) {
        date = Math.ceil(timeDiff) + "s ago";
      } else {
        date = Math.ceil(timeDiff / 60) + "min ago";
      }
    } else {
      date = Math.ceil(timeDiff / 3600) + "h ago";
    }
  } else if (timeDiff < 604800) {
    date = Math.ceil(timeDiff / 86400) + " days ago";
  } else {
    date = newDate.toString().split(" ")[1] + " " + newDate.getDate();
  }
  return date;
};
export default changeDate;
