import React, { useState } from "react";

export default function ShareLink({ number = 0, onremove, onsubmit, optionvalue, linkValue, selectValue, inputValue}) {
  return (
    <div className="mt-7 bg-[#FAFAFA] p-5">
      <div className="flex justify-between">
        <span>Link #{number}</span>
        <button className="text-gray-400 text-sm" onClick={onremove}>
          Remove
        </button>
      </div>
      <form className="mt-2">
        <div>
          <label className="text-sm">Platform</label>
          <select defaultValue={optionvalue} className="block w-full my-2 h-10 px-2" onChange={selectValue}>
            <option value="github">&#xf167; &nbsp;  Github</option>
            <option value="youtube">Youtube</option>
            <option value="linkedin">Linkedin</option>
            <option value="dev.to">Dev.to</option>
            <option value="codewars">Codewars</option>
            <option value="freecodecamp">freeCodeCamp</option>
          </select>
        </div>
        <div>
          <label>Link</label>
          <div className="relative h-10 mt-2">       
            <input
              type="text"
              className="w-full h-full block border-solid border rounded border-gray-300 pl-10"
              placeholder="e.g https://github.com/<username>"
              onChange={inputValue}
              defaultValue={linkValue}
              required
            />
            <img className="img" src="assets/images/icon-link.svg" />
          </div>
        </div>

      </form>
    </div>
  );
}
