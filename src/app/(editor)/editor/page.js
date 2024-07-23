"use client";

import { useEffect, useState } from "react";
import ShareLink from "../../component/ShareLink";
import { genRand } from "../../utilities/randomGenerator";
import Popup from "@/app/component/Notify";
import LinkBar from "@/app/component/LinkBar";

export default function page() {
  const [id, setId] = useState(genRand(5));
  let [numOfActiveLinks, setNumOfActiveLinks] = useState([]);
  let [links, setLinks] = useState({});
  const [createLinkStatus, setCreateLinkStatus] = useState(false);
  let [numOfTimes, setNumOfTimes] = useState([]);
  let [link, setLink] = useState({});
  let [pop, Setpop] = useState("");
  let [inputValue, setInputValue] = useState("");
  let [selectValue, setSelectValue] = useState("github");
  let [top, setTop] = useState(44)
  function removeEl(index) {
    setNumOfTimes((numOfTimes) => numOfTimes.filter((el) => el.key != index));
  }
  const handleInputChange = (id, field, value) => {
    if (value == "" || !value) {
      Setpop("field cannot be empty");
      return;
    }
    // setLink(link = {platform:"github"})
    setLink((link = { ...link, id, [field]: value }));
    setLinks((links) => (links = { ...links, [link.id]: link }));
    setInputValue(value);
  };

  const handleSubmit = async () => {
    console.log(links);
    const response = await fetch("/api/editor", {
      method: "POST",
      body: JSON.stringify(links),
    });
    if (response.ok) {
      const f = await response.json();
      console.log(f);
      // Setpop((pop) => (pop = f.message));
    }
  };

  useEffect(() => {
    async function getLinks() {
      const data = await fetch("/api/editor");
      const response = await data.json();
      if (response.message == "no items found") return;
      let arr = [];
      let res = [];
      // console.log(Object.values(response[1]))
      for (const key in response) arr.push(response[key]);
      for (let i = 0; i < arr.length; i++) {
        for (const key in arr[i]) {
          res.push(arr[i][key]);
        }
      }
      setNumOfTimes(
        (numOfTimes = res.map((el, index) => (
          <ShareLink
            key={el.id}
            optionvalue={el.platform}
            linkValue={el.link}
            number={index}
          />
        )))
      );
      setNumOfActiveLinks(
        (numOfActiveLinks =
          numOfTimes.length > 4 ? numOfTimes.slice(0, 5) : [...numOfTimes])
      );
      console.log(numOfActiveLinks);
    }
    getLinks();
  }, []);

  return (
    <div className="p-8 sm:py-5 sm:px-0 sm:h-[90vh] sm:bg-[#FAFAFA] sm:w-full flex">
      <div className="hidden sm:flex sm:w-2/5  justify-center items-center h-full sm:mr-5">
        <div className="w-fit flex justify-center relative">
          <img
            className="md:w-4/6 aspect-auto md:h-4/5 "
            src="assets\images\illustration-phone-mockup.svg"
          />
          {numOfActiveLinks.length > 0 ? (
            numOfActiveLinks.map((el, index) => {
              if(index > 0){
                top += 10
              }
               return <LinkBar link={el.props.optionvalue} top={`${top}%`} />;
            })
          ) : (
            <></>
          )}
        </div>
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
              setLink((link = { id, platform: "github" }));
              setInputValue("");
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
              handleSubmit();
            }}
            value="Save"
          />
        </div>
      </div>
      {pop != "" ? <Popup message={pop} close={() => Setpop("")} /> : <></>}
    </div>
  );
}
