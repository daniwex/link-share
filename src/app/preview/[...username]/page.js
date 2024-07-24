"use client";
import LinkBar from "@/app/component/LinkBar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Suspense } from "react";

export default function page() {
  const pathname = usePathname();
  const id = useState(pathname.split("/")[2]);
  const [data, setData] = useState({});
  const [links, setLinks] = useState([]);
  let [showInfo, setShowInfo] = useState(false)
  useEffect(() => {
    async function getUser() {
      const data = await fetch("/api/preview", {
        method: "POST",
        body: JSON.stringify(id),
      });
      if (data.ok) {
        const response = await data.json();
        if (response.message == "user not found") {
          setData({});
          setLinks([]);
          setShowInfo(true)
          return
        }
        setData({ ...response });
        setLinks(response.links);
        setShowInfo(false)
      }
    }
    getUser();
  }, []);
  if (showInfo) {
    return (
      <>
        <div className="w-screen h-screen text-center py-10">
          <h2 className="text-3xl">404</h2>
          <div className="mt-5 font-bold">User not found</div>
        </div>
      </>
    );
  }

  return (
    <div className="h-screen">
      {data.loggedIn ? (
        <Suspense fallback={<p>loading</p>}>
          <div className="flex justify-between p-5">
            <Link
              href="/editor"
              className="py-2 px-4 border h-full flex items-center rounded border-solid border-[#633CFF] text-[#633CFF]"
            >
              Back to Editor
            </Link>
            <Link
              href=""
              className=" text-white bg-purple-600 rounded py-2 px-6"
            >
              Share Link
            </Link>
          </div>
        </Suspense>
      ) : (
        <></>
      )}

      <div className="flex flex-col p-7 items-center justify-center">
        <span>
          <h2 className="text-3xl font-semibold pb-4">
            {data ? data.full_name : <>User not found</>}
          </h2>
        </span>
        <span> {data ? data.email : <></>}</span>
        <div className="w-full flex flex-col items-center justify-center">
          {links.length > 0 ? (
            links
              .map((el) => el[Object.keys(el)])
              .map((el) =>
                el?.id != undefined ? (
                  <div className="my-2">
                    <a href={el.link} className="" target="_blanck">
                      <LinkBar
                        position="relative"
                        src="\assets\images\icon-arrow-right.svg"
                        link={el.platform}
                        left="0"
                        width="230px"
                        padding="20px"
                      />
                    </a>
                  </div>
                ) : (
                  ""
                )
              )
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
