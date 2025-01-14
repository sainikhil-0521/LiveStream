import { NextResponse } from "next/server";
import axios from "axios";

export async function middleware(req) {
  const token = req.cookies.get("sessionId")?.value;
  console.log("\n\ntoken: ", token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const backendUrl = `http://localhost:8080/v1/auth/verify`;
    const response = await axios({
      url: backendUrl,
      method: "POST",
      headers: req.headers,
    });
    if (response.status == 200) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Specify the routes to which this middleware applies
export const config = {
  matcher: [
    "/dashboard/:path*", // Protect all routes under /dashboard
    "/profile/:path*", // Protect all routes under /profile
  ],
};
