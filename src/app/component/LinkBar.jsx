import React from 'react'

export default function LinkBar({link, top, left, position='absolute', src='assets/images/icon-arrow-right.svg'}) {
  return (
    <div className={`${link == 'github' ?  'bg-[#1E1E1E]' : link == 'youtube' ? 'bg-[#EE3939]' : 'bg-[#2D68FF]'} flex justify-between text-white left-[24%] xl:left-[11%] xl:h-[45px] xl:w-[240px] rounded text-xs w-[158px] h-[30px] items-center px-3`} style={{top, position, left}}>
       <span>{link = link[0].toUpperCase() + link.slice(1)}</span>
       <span><img className='w-2/3' src={src} /></span>
    </div>
  )
}
