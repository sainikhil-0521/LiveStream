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
    const NextCustomResponse = NextResponse.next();
    const backendHeaders = response.headers;
     const setCookieHeader = response.headers["set-cookie"];
     if (setCookieHeader) {
       const cookies = Array.isArray(setCookieHeader)
         ? setCookieHeader
         : [setCookieHeader];

       cookies.forEach((cookie) => {
         const [cookieName, cookieValue] = cookie.split(";")[0].split("=");
         NextCustomResponse.cookies.set(cookieName, cookieValue, {
           path: "/",
          //  httpOnly: true,
           secure: process.env.NODE_ENV === "production", // Only secure in production
         });
       });
     }
    if (response.status == 200) {
      return NextCustomResponse;
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
