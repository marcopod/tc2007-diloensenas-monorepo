"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormEvent } from "react";

interface CredentialsFormProps {
  csrfToken?: string;
}

export function CredentialsForm(props: CredentialsFormProps) {

  const router = useRouter();
  const [error, setError] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const signInResponse = await signIn("credentials", {
      email: data.get("email"),
      password: data.get("password"),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push("/admin/profiles");
    } else {
      console.log("Error: ", signInResponse);
      console.log("Please try again. Your email or password is wrong");
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000)
    }
  };

  const [hasTyped, setHasTyped] = useState(false);

  return (
    <form
      className="w-full mt-8 text-xl text-black flex flex-col"
      action=""
      onSubmit={handleSubmit}
    >
      <span className="text-[#B4B4B4]">Email</span>
      <input
        type="email"
        name="email"
        // placeholder="Email"
        required
        onChange={() => setHasTyped(true)}
        className="w-full mb-4 px-2 outline outline-0 border-2 focus:border-[#6C5CE7] rounded-md h-[38px]"
      />
      {hasTyped && (
        <>
          <span className="text-[#B4B4B4]">Password</span>
          <input
            type="password"
            name="password"
            // placeholder="Password"
            required
            className="w-full mb-4 px-2 outline outline-0 border-2 focus:border-[#6C5CE7] rounded-md h-[38px]"
          />
        </>
      )
      }
      <button
        type="submit"
        className="w-full border-[0.5px] border-[#E84393] duration-500 hover:bg-[#FFF9F7] h-[38px] px-6 mt-4 text-lg text-[#E84393] rounded-lg"
      >
        Continue with email
      </button>

      {error ?
        <div className="absolute bg-[#e5e5ea] w-20 h-7 right-0 left-0 m-auto rounded-2xl flex justify-center items-center">
          Error
        </div> : null}

    </form>
  );
}
