"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { UserContext } from "@/context/UserProvider";
import VideoStream from "@/components/VideoStream";

export default function Stream() {
  return (
    <div>
      <h1 className="text-xl font-bold">Live Streaming</h1>
      <VideoStream />
    </div>
  );
}
