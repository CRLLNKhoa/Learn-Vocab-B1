import React from 'react'

function Dashboard() {
  return (
    <div className='grid grid-cols-3 gap-4 mt-6'>
        <div className='border p-4 rounded-lg flex flex-col gap-2'>
            <h2 className='font-bold'>Số từ hiện có:</h2>
            <p className='text-end text-xl font-bold'>248</p>
        </div>
        <div className='border p-4 rounded-lg flex flex-col gap-2'>
            <h2 className='font-bold'>Số bài học đã thêm:</h2>
            <p className='text-end text-xl font-bold'>248</p>
        </div>
        <div className='border p-4 rounded-lg flex flex-col gap-2'>
            <h2 className='font-bold'>Số bài nghe đã thêm:</h2>
            <p className='text-end text-xl font-bold'>248</p>
        </div>
        <div className='border p-4 rounded-lg flex flex-col gap-2'>
            <h2 className='font-bold'>Số bài đọc đã thêm:</h2>
            <p className='text-end text-xl font-bold'>248</p>
        </div>
        <div className='border p-4 rounded-lg flex flex-col gap-2'>
            <h2 className='font-bold'>Số bài nghe đã được làm:</h2>
            <p className='text-end text-xl font-bold'>248</p>
        </div>
        <div className='border p-4 rounded-lg flex flex-col gap-2'>
            <h2 className='font-bold'>Số bài đọc đã được làm:</h2>
            <p className='text-end text-xl font-bold'>248</p>
        </div>
        <div className='border p-4 rounded-lg flex flex-col gap-2'>
            <h2 className='font-bold'>Số người dùng:</h2>
            <p className='text-end text-xl font-bold'>248</p>
        </div>
    </div>
  )
}

export default Dashboard