import React from 'react'

function Info() {
  return (
    <div className='flex flex-col border p-4 rounded-lg gap-2 font-semibold text-muted-foreground'>
        <h1 className='font-bold mb-2 text-xl'>Tiến độ học</h1>
        <div className='grid grid-cols-3'>
            <p className='col-span-2'>Tổng kinh nghiệm: </p>
            <p className='text-end font-bold text-yellow-500'>0 exp</p>
        </div>
        <div className='grid grid-cols-3'>
            <p className='col-span-2'>Chủ đề hoàn thành: </p>
            <p className='text-end font-bold text-blue-500'>0/14</p>
        </div>
        <div className='grid grid-cols-3'>
            <p className='col-span-2'>Kiểm tra hoàn thành: </p>
            <p className='text-end font-bold text-red-500'>0/3</p>
        </div>
    </div>
  )
}

export default Info