import React, { useEffect, useState } from "react";
import '../scss/style.css';


const Time: React.FC = () => {
    
    const [time, setTime] = useState<string | undefined>();
    useEffect(() => {
        setInterval(() => {
            const date = new Date();
            setTime(date.toLocaleTimeString());
        }, 1000);
    }, []);
    
    return (
        <div className="time">
          <div className="time__card">
            <p className="time__descr">{time}</p>
          </div>
        </div>
    )
}


export default Time;