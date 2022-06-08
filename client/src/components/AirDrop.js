import React from "react";
import { useState, useEffect } from "react";

const Airdrop = () => {
  const { initialMinute = 0, initialSeconds = 0 } = 20;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div style={{ color: "black" }}>
      {minutes === 0 && seconds === 0 ? null : (
        <h1 style={{ color: "black" }}>
          {" "}
          {minutes}:{seconds < 20 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};

export default Airdrop;
