"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [npassword, setnPassword] = useState("");
  const [error, seterror] = useState({});

  const router = useRouter();

  async function handleSubmit() {
    if (npassword != password) {
      seterror({password:"password do not match"})
      return
    }
    let userInfo = {
      email,
      password,
    };
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(userInfo),
      });
      if (response.ok) {
        router.push("/");
      }else{
        seterror(await response.json())
      }
    } catch (error) {
      console.log(error);
    } finally {
      setEmail("");
      setPassword("");
      setnPassword("");
    }
  }

  return (
    <div className="p-5 md:flex md:justify-center">
      <div className="md:w-4/12  md:p-9  md:flex md:flex-col md:justify-center md:h-screen  ">
        <div className="custom">
          <div className="h-12 flex items-center md:text-center md:justify-center">
            <img className="" src="assets/images/logo-devlinks-small.svg" />
            <span className="text-2xl ml-3 font-bold ">devlinks</span>
          </div>
        </div>
        <form
          className="mt-16 mb-10 md:shadow-md md:p-5"
          onSubmit={(e) => {
            handleSubmit();
            e.preventDefault();
          }}
        >
          <h2 className="text-xl font-bold">Create account</h2>
          <p className="pt-2 text-gray-400 text-sm">
            Let's get you started sharing your links!
          </p>
          <div className="pt-10 grid gap-7 mb-5">
            <div>
              {error.error ? <span className="bg-rose-600 text-white p-3 block my-2 w-full">{error.error}</span> : <></>}
              <label htmlFor="email">Email address</label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  className="w-full py-2 px-3 block border-solid border rounded border-gray-300 pl-10"
                  placeholder="e.g. <username>@gmail.com"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
                <img className="img" src="assets\images\icon-email.svg"></img>
                <span></span>
              </div>
            </div>
            <div>
              <label htmlFor="password">Create password</label>
              <div className="relative h-10">
                <input
                  type="password"
                  name="password"
                  className="w-full h-full block border-solid border rounded border-gray-300 pl-10"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  minLength={8}
                />
                <img className="img" src="assets\images\icon-password.svg" />
              </div>
            </div>
            <div>
              <label htmlFor="npassword">Confirm password</label>
              <div className="relative h-10">
                <input
                  type="password"
                  name="npassword"
                  className="w-full h-full block border-solid border rounded border-gray-300 pl-10"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
                  required
                  onChange={(e) => {
                    setnPassword(e.target.value);
                  }}
                  value={npassword}
                  minLength={8}
                />
                <img className="img" src="assets\images\icon-password.svg" />
              </div>
            </div>
          </div>
          <p className="my-3 text-xs text-gray-400">
            Password must contain at least 8 characters
          </p>
          <button className="w-full bg-purple-600 py-3 rounded text-white">
            Create new account
          </button>
          <div className="text-center pt-6">
            <p className="text-gray-400 text-sm md:inline">
              Already have an account?
            </p>
            <Link href="/" className="text-purple-600 md:text-sm">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
