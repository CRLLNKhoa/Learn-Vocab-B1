import React from 'react'

function CardTest() {
  return (
    <div className='h-[124px] w-full rounded-lg bg-gradient-to-r from-[#4485F2] to-[#EE5351]
     flex items-center p-4 cursor-pointer hover:scale-[1.02] duration-300 hover:shadow-lg'>
        <div className='bg-white size-20 p-2 rounded-full'>
            <img src="/ic_beginner.webp" alt="" />
        </div>
        <p className='text-white font-semibold ml-4 text-2xl'>Kiểm tra chủ đề</p>
        <div className='bg-white p-1 rounded-full flex items-center justify-between
        ml-auto'>
            <p className='bg-yellow-500 p-2 rounded-full text-white mr-2'>exp</p>
            <p className='text-yellow-500 font-semibold text-lg'>1000</p>
        </div>
    </div>
  )
}

export default CardTest