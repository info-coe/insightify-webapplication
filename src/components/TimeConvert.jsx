// import React from "react";

// export const TimeConvert = ({seconds,nanoseconds}) => {
//   const milliseconds = nanoseconds / 1e6;
//   const totalMilliseconds = seconds * 1000 + milliseconds;
//   const date = new Date(totalMilliseconds);
//   let hours = date.getUTCHours();
//   const minutes = (date.getUTCMinutes() < 10) ? ("0" + date.getUTCMinutes()) : (date.getUTCMinutes());
//   const amPm = hours >= 12 ? "PM" : "AM";
//   if (hours > 12) {
//     hours -= 12;
//   } else if (hours === 0) {
//     hours = 12;
//   }
//   // return `${(hours < 10) ? ("0"+hours) : (hours)} : ${minutes} ${amPm}`;
//   return `${hours < 10 ? "0" + hours : hours}:${minutes} ${amPm}`;
// };

export const TimeConvert = ({ seconds, nanoseconds }) => {
  const totalMilliseconds = seconds * 1000 + nanoseconds / 1e6;
  const date = new Date(totalMilliseconds);

  // Define the options for formatting the date and time
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const timeFormatter = new Intl.DateTimeFormat('en-US', timeOptions);
  const dateFormatter = new Intl.DateTimeFormat('en-US', dateOptions);

  // Get the formatted date and time
  const formattedTime = timeFormatter.format(date);
  const formattedDate = dateFormatter.format(date);

  // Get timezone offset in hours
  const timezoneOffset = -date.getTimezoneOffset() / 60;
  const timezoneSign = timezoneOffset >= 0 ? '+' : '-';
  const timezoneOffsetString = `GMT${timezoneSign}${Math.abs(timezoneOffset)}`;

  return `${formattedTime}`;
};

