"use client";
import { useEffect, useRef, useState } from "react";

export default function VideoStream() {
  const videoRef = useRef(null);
  const [streaming, setStreaming] = useState(false);
  let mediaRecorder, ws;

  async function startStream() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    videoRef.current.srcObject = stream;

    mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    ws = new WebSocket("ws://localhost:5001");

    ws.onopen = () => console.log("✅ WebSocket connected!");
    ws.onerror = (err) => console.log("❌ WebSocket error:", err.message);
    ws.onclose = () => console.log("❌ WebSocket closed!");

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0 && ws.readyState === 1) {
        console.log("📡 Sending video chunk:", event.data.size, "bytes");
        ws.send(event.data);
      }
    };

    mediaRecorder.start(2000); // Send every 2 sec
    setStreaming(true);
  }

  function stopStream() {
    if (mediaRecorder) mediaRecorder.stop();
    if (ws) ws.close();
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    console.log("⏹️ Stream stopped.");
    setStreaming(false);
  }

  return (
    <div className="flex flex-col items-center justify-center relative w-full h-[85vh]">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <button
        onClick={streaming ? stopStream : startStream}
        className="absolute bottom-4 bg-blue-500 text-white p-2 rounded"
      >
        {streaming ? "Stop Stream" : "Start Stream"}
      </button>
    </div>
  );
}
