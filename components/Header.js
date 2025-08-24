
'use client'
import Link from "next/link";
import { IoIosLogOut } from "react-icons/io";
import { RiHomeSmileFill } from 'react-icons/ri';
import { MdOutlineAddHomeWork } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import { useContext } from "react";
import { AppContext } from "@/context/AppContext";
export default function Header() {
  const { isLoggedIn } = useContext(AppContext)
  return (
    <header className="bg-white flex justify-between shadow p-4 text-center text-xl font-bold">
      <Link href="/" className="text-xl font-bold"
        style={{ fontFamily: "var(--font-albert-sans), sans-serif" }}
      >NextEstate</Link>
      <nav className="flex items-center gap-4">
        <Link href="/my-properties" className="hover:underline   text-black px-3 py-1 rounded"><RiHomeSmileFill /></Link>
        <Link href="/add-property" className="hover:underline"><MdOutlineAddHomeWork /></Link>
        {!isLoggedIn ?
          (<Link href="/login" className="hover:underline bg-blue-600 text-white px-3 py-1 rounded"><CiLogin /></Link>) :
          <Link href="/logout" > <IoIosLogOut className="cursor-pointer" /></Link>}
      </nav>
    </header>
  );
}
