import { useState, useEffect } from "react";

function formatFullDate(date) {
  const dateString = date.toLocaleDateString("en-US", {
    month: "long", // "January"
    day: "numeric", // "12"
    year: "numeric", // "2025"
  });

  const weekday = date.toLocaleDateString("en-US", {
    weekday: "long", // "Thursday"
  });

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  return `${dateString} | ${weekday} ${time}`;
}

function Clock() {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p className="text-sm">{formatFullDate(dateTime)}</p>
    </div>
  );
}

export default Clock;
