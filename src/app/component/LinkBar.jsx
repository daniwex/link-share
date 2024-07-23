import React from 'react'

export default function LinkBar({link, top}) {
  return (
    <div className={`${link == 'github' ?  'bg-[#1E1E1E]' : link == 'Youtube' ? 'bg-[#EE3939]' : 'bg-[#2D68FF]'} flex justify-between absolute text-white left-[24%] rounded text-xs w-[158px] h-[30px] items-center px-3`} style={{top}}>
       <span>{link = link[0].toUpperCase() + link.slice(1)}</span>
       <span><img className='w-2/3' src='assets\images\icon-arrow-right.svg' /></span>
    </div>
  )
}
