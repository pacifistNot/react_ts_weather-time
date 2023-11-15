import React, { useEffect, useState } from "react";
import "../scss/style.css";

const Time: React.FC = () => {
  const [time, setTime] = useState<string | undefined>();
  const intervalRef = React.useRef<number | undefined>();

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleString());
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="time">
      <div className="time__card">
        <p className="time__descr">{time}</p>
      </div>
    </div>
  );
};

export default Time;
