import { useEffect, useState } from "react";

export function useClock() {
  const [clock, setClock] = useState("00:00:00");

  useEffect(() => {
    const update = () => {
      setClock(
        new Intl.DateTimeFormat("zh-CN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return clock;
}
