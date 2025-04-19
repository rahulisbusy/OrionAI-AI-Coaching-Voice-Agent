import React from 'react'
import Image from 'next/image'
import { UserButton } from '@stackframe/stack'
function AppHeader() {
  return (
    <div className='flex justify-between items-center p-4 bg-gray-800 '>
      <Image src={'/logo2.svg'} alt='logo'
      width={200} height={50} />
      <UserButton/>
       </div>
  )
}

export default AppHeader