"use client";

import { useState } from "react";
import ShareLink from "../../component/ShareLink";

export default function page() {
  const [links, setLinks] = useState([]);
  const [createLinkStatus, setCreateLinkStatus] = useState(false);
  const [numOfTimes, setNumOfTimes] = useState([]);
  const [n, setN] = useState(0);
  function removeEl(e) {
    console.log(numOfTimes);
    setN((n) => n - 1);
    // setNumOfTimes(numOfTimes.filter(el => el.id != numOfTimes[e].id))
  }

  return (
    <div className="p-8 sm:py-5 sm:px-0 sm:h-[90vh] sm:bg-[#FAFAFA] sm:w-full flex">
      <div className="hidden sm:flex sm:w-2/5 bg-white justify-center items-center h-full sm:mr-5">
        <img
          className="w-1/4"
          src="assets\images\illustration-phone-mockup.svg"
        />
      </div>
      <div className="sm:w-3/5 sm:overflow-y-scroll sm:flex sm:flex-col sm:justify-between h-full">
        <div className="sm:overflow-y-auto h-5/6 bg-white sm:p-9">
          <h1 className="text-2xl font-bold">Customize your links</h1>
          <p className="pt-2 pb-10 text-gray-400 text-sm leading-6">
            Add/edit/remove klinks below and then share all your profiles with
            the world!
          </p>
          <button
            onClick={() => {
              setCreateLinkStatus(true);
              setN((n) => n + 1);
              setNumOfTimes([
                ...numOfTimes,
                <ShareLink
                  key={numOfTimes.length}
                  onchange={(e) => console.log(e.target.value)}
                  onremove={() => removeEl(numOfTimes.length)}
                  getText={(e) => console.log(e.target.value)}
                />,
              ]);
            }}
            className="w-full text-purple-600 border border-solid border-purple-600 rounded py-2"
          >
            Add new link
          </button>
          {numOfTimes.length == 0 ? (
            <div className="mt-10 flex flex-col items-center sm:h-96">
              <img src="/assets/images/illustration-empty.svg" />
              <h2 className="text-xl font-bold py-5">Let's get you started</h2>
              <div className="w-5/6">
                <p className="text-gray-400 text-sm">
                  Use the "Add new link" button to get started. Once you have
                  more than one link, you can reorder and edit them. We're here
                  to help you share your profile with everyone!
                </p>
              </div>
            </div>
          ) : (
            <div>{numOfTimes}</div>
          )}
        </div>
        <div className="sm:h-1/6 sm:mt-2 bg-white p-5">
          <button className="w-full py-2 sm:w-20 sm:float-right text-white bg-purple-600 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
