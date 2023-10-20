"use client";
import { useRouter } from "next/navigation";

export default function Admin() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/login");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black"> 
      <button
        className="border rounded-lg border-white bg-[#6C5CE7] text-white md:ml-8 text-xl md:my-0 my-10 px-7 py-1 hover:text-white hover:bg-[#E84393] duration-500"
        onClick={handleClick}
      >
        Acceder
      </button>
    </div>
  );
}
