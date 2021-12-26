// edge function - wont even hit origin server
// runs before any other api route
import { NextResponse } from 'next/server';

const signedinPages = ['/', '/playlist', '/library'];

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.JWT_AUTH;

    // TODO add / test expired token scenario

    if (!token) {
      return NextResponse.redirect('/signin');
    }
  }
}
