"use client";
import Login from "./components/Login";

import React, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// import Providers from "../../components/Providers/Providers";

export default function LoginPage() {
  return (

    //Otra manera de hacerlo
    // <Providers>
    //   <Login />
    // </Providers>

    <SessionProvider>
      <Login />
    </SessionProvider>
  );
}
