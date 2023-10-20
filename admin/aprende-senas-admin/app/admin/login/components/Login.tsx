"use client";
import { CredentialsForm } from "./CredentialsForm";

import { useSession, signIn, signOut } from "next-auth/react";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    router.push("/admin/profiles");
    return <div>loading...</div>;
  } else {
    return (
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center">
        <div className="flex flex-col items-center p-10">
          <h1 className="mt-10 mb-4 text-4xl text-[#E84393] text-[60px] font-bold">
            Login
          </h1>
          <CredentialsForm />          
        </div>
      </div>
    );
  }
}
