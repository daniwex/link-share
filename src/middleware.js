import { cookies } from "next/headers";

export function middleware(request) {
  const currentUser = cookies().has("currentUser");
  if (currentUser && request.nextUrl.pathname == "/") {
    return Response.redirect(new URL(`/editor`, request.url));
  }
  if (currentUser && request.nextUrl.pathname.endsWith("register")) {
    return Response.redirect(new URL("/editor", request.url));
  }
  if (!currentUser && request.nextUrl.pathname.endsWith("register")) {
    return Response.redirect(new URL("/", request.url));
  }
  if (!currentUser && request.nextUrl.pathname.endsWith("editor")) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_nexts|.*\\.svg$).*)"],
};
