'use client'
import { useState } from "react";
import "./globals.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [error, setError] = useState({})
  async function onSubmitForm(){
    if(email == '' && password == ''){
      setError({email:"can't be empty",password:"please check again"})
      return
    }
    else if(email == '' && !password == ''){
      setError({email:"can't be empty"})
      return
    }
    else if(!email == '' && password == ''){
      setError({password:"please check again"})
      return
    }else{
      setError({})
    }
    let userInfo = {
      email, password
    }
    try{
      let response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(userInfo)
      })
      if(response.ok){
        router.push(`/editor`)
      }else{
        setError(await response.json())
      }
    }catch( error){
      console.log(error)
    }finally{
      setEmail('')
      setPassword('')
    }
  }
  return (
    <div className="p-5 md:flex md:justify-center">
      <div className="md:w-68 md:flex md:flex-col md:items-center md:justify-center md:h-screen  md:p-1">
        <div className="custom">
          <div className="h-12 flex items-center md:text-center md:justify-center">
            <img
              className=""
              src="assets/images/logo-devlinks-small.svg"
            />
            <span className="text-2xl ml-3 font-bold md:text-center ">devlinks</span>
          </div>
        </div>
        <form className="mt-16 mb-10 md:shadow-md md:p-8" onSubmit={(e) => {onSubmitForm();e.preventDefault()}}>
          <h2 className="text-xl font-bold">Login</h2>
          <p className="pt-2 text-gray-400 text-sm">
            Add your details below to get back into the app
          </p>
          <div className="pt-10 grid gap-7 mb-5">
            <div>
            {error.error ? <span className="bg-rose-600 text-white p-3 block my-2 w-full">{error.error}</span> : <></>}

              <label htmlFor="email" className={`text-sm ${error.email ? 'text-rose-600' : ''}`}>Email address</label>
              <div className="relative">
                <input
                  type="email"
                  className= {`w-full py-2 px-3 ${error.email ? 'pr-32' : ''} block border-solid border rounded border-gray-300 pl-10`}
                  placeholder="e.g. <username>@gmail.com"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  value={email}
                />
                <img className="img" src="assets\images\icon-email.svg"></img>
                <span className={`error-class text-sm ${error.email ? 'text-rose-600' : ''}`}>{error.email}</span>
              </div>
            </div>
            <div>
              <label  htmlFor="password" className={`text-sm ${error.password ? 'text-rose-600' : ''}`}>Password</label>
              <div className="relative h-10">
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className={`w-full py-2 px-3 ${error.password ? 'pr-44' : ''} block border-solid border rounded border-gray-300 pl-10`}
                  placeholder="Enter your password"
                  onChange={(e) => {setPassword(e.target.value)}}
                  value={password}
                  // minLength={8}
                />
                <img className="img" src="assets\images\icon-password.svg" />
                <span className={`error-class text-sm ${error.password ? 'text-rose-600' : ''}`}>{error.password}</span>
              </div>
            </div>
          </div>
          <button type="submit" className="w-full bg-purple-600 py-3 rounded text-white">
            Login
          </button>
          <div className="text-center pt-6">
          <p className="text-gray-400 text-sm md:inline">Don't have an account?</p>
          <Link href="register" className="text-purple-600 md:text-sm">
            Create account
          </Link>
        </div>
        </form>
      
      </div>
    </div>
  );
}
