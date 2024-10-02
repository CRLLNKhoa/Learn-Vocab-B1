"use client"
import React, { useEffect, useState } from 'react'
import CardTopic from '../ui/card-topic'
import CardTest from '../ui/card-test'
import { getLessionsFromDB, TLesson } from '@/actions/lesson'
import CardLesson from '../ui/card-topic'

function Topics({data}:{data: any[]}) {
  console.log(data)
  return (
    <div className='flex flex-col'>
        <h1 className='font-bold text-3xl mb-6'>Chủ đề</h1>
        <div className='flex flex-col gap-4'>
            {data.map((item:any) => (
              <div key={item.topic_id} className='flex flex-col gap-2'>
                <h2 className='font-bold text-lg cursor-default'>{item.topic_name}</h2>
                  {item.lessons.map((lesson: TLesson) => (
                    <CardLesson key={lesson.lesson_id} lesson={lesson} />
                  ))}
              </div>
            ))}
            <CardTest />
        </div>
    </div>
  )
}

export default Topics