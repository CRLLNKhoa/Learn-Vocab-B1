import React from 'react'
import CardTopic from '../ui/card-topic'
import CardTest from '../ui/card-test'

function Topics() {
  return (
    <div className='flex flex-col'>
        <h1 className='font-bold text-3xl mb-6'>Chủ đề</h1>
        <div className='flex flex-col gap-4'>
            <CardTopic />
            <CardTest />
        </div>
    </div>
  )
}

export default Topics