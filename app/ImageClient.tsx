"use client";

import { useEffect } from "react";

export default function ImageClient() {
  useEffect(() => {
    const evtSource = new EventSource("/api/image_refresh");

    evtSource.onmessage = (event) => {
      if (event.data === "changed") {
        window.location.reload();
      }
    };

    return () => evtSource.close();
  }, []);

  return (
    <img
      src="/image.png"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "fill",
        display: "block"
      }}
    />
  );
}
