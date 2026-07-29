"use client";

import { useEffect, useState } from "react";

export default function ImageClient() {
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setTimestamp(Date.now());
    }, 5 * 60 * 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        margin: 0,
        padding: 0
      }}
    >
      <img
        src="/image.png"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "fill",
          display: "block"
        }}
      />
    </div>
  );
}

