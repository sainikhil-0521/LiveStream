"use client";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import { getCookie } from "cookies-next";
import { UserContext } from "@/context/UserProvider";

export default function Dashboard() {
  const [streamUrl, setStreamUrl] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const handleInputChange = (e) => {
    setStreamUrl(e.target.value);
  };

  const handleStartStreaming = () => {
    setIsStreaming(true);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Live Stream Dashboard</h1>
      <input
        type="text"
        placeholder="Enter streaming URL"
        value={streamUrl}
        onChange={handleInputChange}
        style={{ padding: "10px", width: "80%", marginBottom: "20px" }}
      />
      <br />
      <button
        onClick={handleStartStreaming}
        style={{
          padding: "10px 20px",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Start Streaming
      </button>
      {isStreaming && streamUrl && (
        <div style={{ marginTop: "20px" }}>
          <ReactPlayer
            url={streamUrl}
            playing
            controls
            width="100%"
            height="500px"
          />
        </div>
      )}
    </div>
  );
}
