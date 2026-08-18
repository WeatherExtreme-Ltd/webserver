"use client";

import { useEffect, useState } from "react";

export default function ImageClient() {
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const eventSource = new EventSource("/api/image_refresh");

    eventSource.onmessage = (event) => {
      if (event.data === "changed") {
        setTimestamp(Date.now());
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE connection error:", err);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div
      style={{
        width: "90vw",
        height: "90vh",
        overflow: "hidden",
        margin: 0,
        padding: 0
      }}
    >
      <img
        src={`/image.png?t=${timestamp}`}
        style={{
          width: "90vw",
          height: "90vh",
          objectFit: "fill",
          display: "block"
        }}
      />
    </div>
  );
}

