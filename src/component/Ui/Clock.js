import "../style/clock.css";
import { useEffect, useState } from "react";
function Clock() {
  const [days, setDays] = useState();
  const [hours, sethours] = useState();
  const [minutes, setminutes] = useState();
  const [secounds, setsecounds] = useState();

  let interval;

  const countDown = () => {
    const distination = new Date("Oct 17, 2023").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const different = distination - now;
      const days = Math.floor(different / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((different % (1000 * 60 * 60)) / (1000 * 60));
      const secounds = Math.floor((different % (1000 * 60)) / 1000);

      if (distination < 0) {
        clearInterval(interval.current);
      } else {
        setDays(days);
        sethours(hours);
        setminutes(minutes);
        setsecounds(secounds);
      }
    });
  };

  useEffect(() => {
    countDown();
  });

  return (
    <div className="clockWrapper  d-flex align-items-center justify-content-center justify-content-md-start  gap-3">
      <div className="clock-data d-flex align-items-center gap-2 gap-md-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{days}</h1>
          <h5 className="text-white fs-6">Days</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>
      <div className="clock-data d-flex align-items-center gap-md-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{hours}</h1>
          <h5 className="text-white fs-6">Hours</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>
      <div className="clock-data d-flex align-items-center gap-2 gap-md-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{minutes}</h1>
          <h5 className="text-white fs-6">Minutes</h5>
        </div>
        <span className="text-white fs-3">:</span>
      </div>
      <div className="clock-data d-flex align-items-center gap-2 gap-md-3">
        <div className="text-center">
          <h1 className="text-white fs-3 mb-2">{secounds}</h1>
          <h5 className="text-white fs-6">Secounds</h5>
        </div>
      </div>
    </div>
  );
}
export default Clock;
