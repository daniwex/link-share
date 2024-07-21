'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'


export default function Navbar() {
  const pathname = usePathname()
  return (
    <nav className="flex h-16 items-center">
      <div className="flex w-full  h-1/2  justify-around">
        <Link href='/'><img className="inline" src="/assets/images/logo-devlinks-small.svg" alt="" /><span className="hidden sm:inline">devlinks</span></Link>
        <div className="flex justify-around basis-1/3 md:basis-2/3 sm:justify-center">
          <Link href="/editor" className={` ${pathname == '/editor' ? 'bg-[#EFEBFF] text-[#633CFF]' : '' }  flex px-4 py-1`}>
            <img className="inline sm:pr-2" src="/assets/images/icon-link.svg" />
            <span className="hidden sm:inline">Links</span>
          </Link>
          <Link href="/profile"  className={` ${pathname == '/profile' ? 'bg-[#EFEBFF] text-[#633CFF]' : '' } px-4 py-1 flex  h-full`}>
            <img className="inline sm:pr-2" src="/assets/images/icon-profile-details-header.svg" />
            <span className="hidden sm:inline">Profile Details</span>
          </Link>
        </div>
        <div className="py-2 px-4 border h-full flex items-center rounded border-solid border-[#633CFF]">
          <Link href="/editor">
            <img className="sm:hidden" src="/assets/images/icon-preview-header.svg" />
            <span className="hidden sm:inline text-[#633CFF]">Preview</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
