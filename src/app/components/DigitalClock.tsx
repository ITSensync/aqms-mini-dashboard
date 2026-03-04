"use client";
import React, { useEffect, useState } from "react";

export default function DigitalClock() {
  const [dateTime, setDateTime] = useState({
    time: "",
    date: "",
  });

  useEffect(() => {
    // Function to update time and date
    const updateDateTime = () => {
      const now = new Date();

      // Format time
      const formattedTime = now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // Format date
      const formattedDate = now.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });

      setDateTime({
        time: formattedTime,
        date: formattedDate,
      });
    };

    // Initial call and set interval
    updateDateTime();
    const timerId = setInterval(updateDateTime, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="flex flex-col font-sf-pro-rounded text-white text-center">
      <p className="text-lg font-extrabold text-white">{dateTime.date}</p>
      <p className="text-lg font-medium text-white">{dateTime.time}</p>
    </div>
  );
}
