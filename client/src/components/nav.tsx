"use client";
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSession, signOut } from "next-auth/react"
import { usePathname } from 'next/navigation'
import Link from 'next/link';

function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const { data } = useSession();
  function handleClick() {
    router.push('/signup')
  }

  function handleUploadCick(){
    router.push('/upload');
  }

  return (
    <div className='bg-nav_color flex justify-between items-center h-16 px-4 border-b-2 border-red-500 '>
      <span className='font-bold text-white ml-16'><Link href={"/"}>EduMastery</Link></span>
      <ul className={`flex flex-row gap-3 ${pathname === "/dashboard" ? "hidden": ""}`}>
        <li className="px-5 py-2 font-semibold text-gray-400 cursor-pointer hover:text-white"><a href="#home">HOME</a></li>
        <li className="px-5 py-2 font-semibold text-gray-400 cursor-pointer hover:text-white"><a href="#about">ABOUT</a></li>
        <li className="pr-28 pl-5 py-2 font-semibold text-gray-400 cursor-pointer hover:text-white"><Link href="/dashboard">COURSES</Link></li>
      </ul>
      {data ? (<div className='mr-16'>
        <button className='bg-[#D4312B] rounded-full px-3 py-2 text-white font-semibold mr-3' onClick={handleUploadCick} >Upload</button>
        <button className='bg-[#D4312B] rounded-full px-3 py-2 text-white font-semibold' onClick={() => signOut()}>SignOut</button>
        </div>
      ) : (
        <button className='bg-[#D4312B] rounded-full px-3 py-2 text-white font-semibold mr-16' onClick={handleClick}>SignUp/LogIn</button>
      )}
    </div>
  );
}

export default Nav;