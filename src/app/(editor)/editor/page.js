"use client";

import { useEffect, useState } from "react";
import ShareLink from "../../component/ShareLink";
import { genRand } from "../../utilities/randomGenerator";
import Popup from "@/app/component/Notify";

export default function page() {
  const [id, setId] = useState(genRand(5));
  const [links, setLinks] = useState([]);
  const [createLinkStatus, setCreateLinkStatus] = useState(false);
  const [numOfTimes, setNumOfTimes] = useState([]);
  const [link, setLink] = useState({});
  let [pop, Setpop] = useState("");
  function removeEl(index) {
    setNumOfTimes((numOfTimes) => numOfTimes.filter((el) => el.key != index));
    setLink(links.map((link) => console.log(link.id)));
  }
  const handleInputChange = (id, field, value) => {
    setLink((link) => (link = { ...link, id, [field]: value }));
  };

  const handleSubmit = async () => {
    const response = await fetch("/api/editor", {
      method: "POST",
      body: JSON.stringify(links),
    });
    if (response.ok) {
      const f = await response.json();
      console.log(f)
      // Setpop((pop) => (pop = f.message));
    }
  };

  useEffect(() => {
    async function getLinks() {
      const data = await fetch("/api/editor");
      const response = await data.json();
      console.log(response)
      if(response.message == "no items found") return
      setNumOfTimes(
        (numOfTimes) =>
          (numOfTimes = [
            response.map((el) => (
              <ShareLink
                optionvalue={el.platform}
                key={el.id}
                linkValue={el.link}
                onremove={() => removeEl(el.id)}
              />
            )),
          ])
      );
    }
    getLinks();
  }, []);

  return (
    <div className="p-8 sm:py-5 sm:px-0 sm:h-[90vh] sm:bg-[#FAFAFA] sm:w-full flex">
      <div className="hidden sm:flex sm:w-2/5 bg-white justify-center items-center h-full sm:mr-5">
        <img
          className="w-2/5"
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
              setId(genRand(5));
              setNumOfTimes((numOfTimes) => [
                ...numOfTimes,
                <ShareLink
                  key={id}
                  number={numOfTimes.length}
                  onremove={() => removeEl(id)}
                  onsubmit={(e) => console.log(e)}
                  selectValue={(e) =>
                    handleInputChange(id, "platform", e.target.value)
                  }
                  inputValue={(e) =>
                    handleInputChange(id, "link", e.target.value)
                  }
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
            <div>{numOfTimes.map((el) => el)}</div>
          )}
        </div>
        <div className="sm:h-1/6 sm:mt-2 bg-white p-5">
          <input
            type="submit"
            className="w-full py-2 sm:w-20 sm:float-right text-white bg-purple-600 rounded cursor-pointer"
            onClick={() => {
              setLinks((links) => (links = [...links, link]));
              handleSubmit();
            }}
            value="Save"
          />
        </div>
      </div>
      {pop != "" ? <Popup message={pop} close={() => Setpop('')} /> : <></>}
    </div>
  );
}
