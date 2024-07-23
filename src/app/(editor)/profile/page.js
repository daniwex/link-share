"use client";
import { useState, useEffect } from "react";
import Popup from "@/app/component/Popup";

export default function page() {
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  let [submitted, setSubitted] = useState(false);
  let [pop, Setpop] = useState("");
  async function submitInfo(e) {
    e.preventDefault();
    if(fname == '' || lname == ''){
      Setpop("First / Last name cannot be empty")
      setSubitted(false)
      return
    }
    setSubitted(true)
    const data = {
      firstName: fname,
      lastName: lname,
    };
    const response = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const f = await response.json();
      console.log(f);
      setFName(f.firstName);
      setLName(f.lastName);
      Setpop("Your information has been successfully saved!")
    }
  }

  async function updateInfo(e) {
    e.preventDefault();
    console.log(fname, lname)
    if(fname == '' || lname == ''){
      Setpop("First / Last name cannot be empty")
      setSubitted(false)
      return
    }
    const data = {
      firstName: fname,
      lastName: lname,
    };
    const response = await fetch("/api/profile", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const f = await response.json();
      Setpop(f.message)
    }
  }

  useEffect(() => {
    async function getData() {
      const data = await fetch("/api/profile", {
        method: "GET",
      });
      const response = await data.json();
      console.log(response)
      if ( typeof response != 'object') {
        console.log(response)
        setSubitted(false)
        setEmail(response);
      } else {
        setFName(response.firstName);
        setLName(response.lastName);
        setEmail(response.email);
      }
    }
    // getData();
  }, []);
  return (
    <div className="p-8 sm:py-5 sm:px-0 sm:flex sm:bg-[#FAFAFA] h-[90vh]">
      <div className="hidden sm:flex sm:w-2/5 bg-white justify-center items-center mr-5">
        <img
          className="w-2/5"
          src="assets\images\illustration-phone-mockup.svg"
        />
      </div>
      <div className="sm:w-3/5 sm:overflow-y-scroll sm:flex sm:flex-col sm:justify-between h-full">
        <div className="sm:overflow-y-auto sm:h-5/6 bg-white sm:p-9">
          <h1 className="text-2xl font-bold">Profile Details</h1>
          <p className="pt-2 pb-10 text-gray-400 text-sm leading-6">
            Add your details to create a personal touch to your profile.
          </p>
          <div className="sm:flex sm:items-center sm:h-fit sm:gap-3 bg-[#FAFAFA] py-5 px-5">
            <p className="text-gray-400 text-sm sm:basis-1/3">
              Profile picture
            </p>
            <label className="h-64 bg-[#EFEBFF] w-3/5 flex flex-col items-center justify-center rounded my-5">
              <img
                src="assets/images/icon-upload-image.svg"
                className="sm:basis-1/3"
              />
              <span className="text-[#633CFF]">Upload Image</span>
              <input className="hidden" type="file" />
            </label>
            <p className="text-gray-400 text-sm ">
              Image must be below 1024x1024 px. Use PNG or JPG format
            </p>
          </div>
          <form className="bg-[#FAFAFA] p-5 mt-5">
            <div>
              <div className="my-5 sm:flex sm:justify-between">
                <label className="text-sm">First name</label>
                <input
                  type="text"
                  className="w-full sm:w-2/3 sm:inline py-2 px-3 block border-solid border rounded border-gray-300"
                  value={fname}
                  onChange={(e) => setFName(e.target.value)}
                />
              </div>
              <div className="mb-5 sm:flex sm:justify-between">
                <label className="text-sm">Last name</label>
                <input
                  type="text"
                  className="w-full py-2 px-3 block sm:w-2/3 sm:inline border-solid border rounded border-gray-300"
                  value={lname}
                  onChange={(e) => setLName(e.target.value)}
                />
              </div>
              <div className="sm:flex sm:justify-between">
                <label className="text-sm">Email</label>
                <input
                  type="email"
                  className="w-full sm:w-2/3 sm:inline py-2 px-3 block border-solid border rounded border-gray-300"
                  disabled
                  value={email}
                />
              </div>
            </div>
          </form>
        </div>
        <div className="sm:h-1/6 my-5 sm:my-0 w-full sm:mt-2 sm:p-5">
          {submitted ? (
            <button
              type="submit"
              className="w-full sm:w-20 sm:float-right text-white bg-purple-600 rounded py-2 my-10 sm:my-2"
              onClick={updateInfo}
            >
              Update
            </button>
          ) : (
            <button
              type="submit"
              className="w-full sm:w-20 sm:float-right text-white bg-purple-600 rounded py-2 my-10 sm:my-2"
              onClick={submitInfo}
            >
              Save
            </button>
          )}
        </div>
      </div>
      {pop != "" ? <Popup message={pop} close={() => Setpop("")} /> : <></>}
    </div>
  );
}
