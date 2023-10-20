// Imports
// Default imports
"use client"
import React from 'react'
import Link from 'next/link'

// Local imports
import Profile_icon from "../../../../../public/assets/admin/profiles/Profile_icon"
import Games_icon from "../../../../../public/assets/admin/questions/Puzzle_icon";
import Exit_icon from "../../../../../public/assets/admin/Exit_icon";
import { signOut } from 'next-auth/react';

type SidebarProps = { selection: number | null }

const Sidebar: React.FC<SidebarProps> = ({ selection }) => {
  const handleLogOut = () => {
    signOut({ callbackUrl: "/" });
  }
  return (
    <div className="w-[120px] h-screen bg-[#282A2A] ">
      <div className='w-full flex justify-center items-center my-4'><button onClick={handleLogOut}><Exit_icon /></button></div>
      <ul className="w-full flex flex-col items-center">
        <li
          className={` ${selection === 0 ? "bg-[#333333]" : ""}
            w-full h-[120px] my-[75px] flex items-center justify-center
          `}
        >
          <Link href="/admin/profiles">
            <Profile_icon strokeColor={`${selection === 0 ? "#E84393" : "#6C5CE7"}`} />
          </Link>
        </li>
        <li
          className={` ${selection === 1 ? "bg-[#333333]" : ""}
            w-full h-[120px] my-[75px] flex items-center justify-center
          `}
        >
          <Link href="/admin/questions">
            <Games_icon strokeColor={`${selection === 1 ? "#E84393" : "#6C5CE7"}`} />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar