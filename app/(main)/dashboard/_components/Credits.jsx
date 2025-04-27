import React, { useContext } from 'react'
import { UserContext } from '@/app/_context/UserContext'
import { useUser } from '@stackframe/stack';
import Image from 'next/image'
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
function Credits() {
    const {userData} = useContext(UserContext);
    const user=useUser();
    const calculateProgress=()=>{
        if(userData?.subscriptionId){
            return (500000-Number(userData?.credits))*100/500000
        }
        else{
            return (50000-Number(userData?.credits))*100/50000
        }
    }
  return (
   
    <div>
        <div className='flex gap-3 items-center'>
        <div>
            <Image src={user?.profileImageUrl} height={70} width={70} className='rounded-full h-[50px] w-[50px] ' />
        </div>
           <div>
            <h2 className=' text-lg font-bold text-black'>{user?.displayName}</h2>
            <h2 className='text-gray-700 '>{user?.primaryEmail}</h2>
           </div>
        </div>
        <hr className='my-3'/>
        <div>
            <h2 className='font-semibold text-black'>Token Usage</h2>
            <h2 className='text-sm text-black'>{userData?.credits}/{userData?.subscriptionId ? "500000" : "50000"  }</h2>
            <Progress value={calculateProgress()} className={"mt-2 "}/>
        </div>
        <div className='flex justify-between items-center my-2'>
            <h2 className='font-bold text-black'>Current Plan</h2>
            {userData?.subscriptionId ?  <h2 className=' bg-gray-300 rounded-lg p-2 font-semibold text-black'>Free Plan</h2>: <h2 className=' bg-gray-300 rounded-lg p-2 font-semibold text-black'>Pro Plan</h2>}
           

        </div>
        <div className='mt-3 p-2 border rounded-2xl'>
            <div className='flex justify-between'>
               <div>
                <h2 className='font-bold text-black'>Pro Plan</h2>
                <h2>500000 tokens</h2>
               </div>
                <h2 className='font-bold text-black'>8$/month</h2>

            </div>
        </div>
        <hr  className='my-2'/>
        <div className="flex justify-center">
  <Button className="w-1/2">
    <Wallet /> Upgrade to Pro
  </Button>
</div>

    </div>
    
  )
}

export default Credits