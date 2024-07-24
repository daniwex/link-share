"use client";
import LinkBar from "@/app/component/LinkBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const pathname = usePathname();
  const id = useState(pathname.split("/")[2]);
  const [data, setData] = useState({});
  const [links, setLinks] = useState([]);
  // console.log(pathname.split('/')[2])
  useEffect(
    () =>
      async function getUser() {
        const data = await fetch("/api/preview", {
          method: "POST",
          body: JSON.stringify(id),
        });
        if (data.ok) {
          const response = await data.json();
          setData({ ...response });
          setLinks(response.links);
        }
        // console.log(response.links)
      },
    []
  );
  return (
    <div className="h-screen">
      {data.loggedIn ? (
        <div className="flex justify-between p-5">
          <Link
            href="/editor"
            className="py-2 px-4 border h-full flex items-center rounded border-solid border-[#633CFF] text-[#633CFF]"
          >
            Back to Editor
          </Link>
          <Link href="" className=" text-white bg-purple-600 rounded py-2 px-6">
            Share Link
          </Link>
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col h-full items-center justify-center">
        <span>
          <h2>{data.full_name}</h2>
        </span>
        <span>{data.email}</span>
        <div>
          {console.log(links)}
          {links.map(el => el[Object.keys(el)]).map( el => el?.id != undefined ? <div className="my-5"><a href={el.link} target="_blanck"><LinkBar position="relative" src='\assets\images\icon-arrow-right.svg' link={el.platform} left='0' /></a></div> : '')}
          {/* {data.links.map(el => <ShareLink />)} */}
        </div>
      </div>
    </div>
  );
}
