import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./utils/jwt";

// Protect routes based on role
export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

 
  const decodeToken = await verifyToken(token);




  // 🔒 Role-based protection
  const path = request.nextUrl.pathname;
  if(path.startsWith("/api/auth") ){
return NextResponse.next();
  }

    if(path.startsWith("/api" ) && !decodeToken){
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }


  if (!decodeToken) {
    console.log("⛔ Invalid token, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }


   if (!token) {
    console.log("⛔ No token, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }


  if (path.startsWith("/adminDashboard") && decodeToken.role !== "ADMIN") {
    console.log("⛔ Access denied: not an admin");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/viewer") && decodeToken.role !== "VIEWER") {
    console.log("⛔ Access denied: not a viewer");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  if (path.startsWith("/editor") && decodeToken.role !== "EDITOR") {
    console.log("⛔ Access denied: not a manager");
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }

  // ✅ Allow request
  return NextResponse.next();
}

// Apply middleware only on these routes
export const config = {
  matcher: ["/adminDashboard/:path*", 
    "/viewer/:path*", 
    "/editor/:path*", 
    "/api/:path*",
    "/api/auth/:path*"],
};
