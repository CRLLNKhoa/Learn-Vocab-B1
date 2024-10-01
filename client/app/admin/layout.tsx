import TabsAdmin from '@/components/layouts/admin/tabs-admin'
import React from 'react'
import 'react-tooltip/dist/react-tooltip.css'

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <div className='flex p-4 bg-white min-h-screen mt-4 rounded-lg shadow-lg mb-6'>
        <div className='w-[200px] min-h-screen border-r pr-2 pt-4'>
            <TabsAdmin />
        </div>
        <div className='flex-1 p-4'>{children}</div>
    </div>
  )
}

export default layout