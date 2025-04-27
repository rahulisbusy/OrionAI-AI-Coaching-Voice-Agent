"use client"
import React, { use } from 'react'
import { useUser } from '@stackframe/stack';
import { Button } from '@/components/ui/button';
import { CoachingOptions } from '@/services/Options';
import { BlurFade } from '@/components/magicui/blur-fade';
import Image from 'next/image';
import UserInputDialog from './UserInputDialog';
import Profile from './Profile';

function FeatureAssistants() {
    const user = useUser();
    return (
        <div>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='font-medium text-gray-500'>My Workspace</h1>
                    <h1 className='text-2xl font-bold'>Welcome Back,{user?.displayName}</h1>
                </div>
                <Profile>
                    <Button className={"cursor-pointer"}>Profile</Button>
                </Profile>

            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5
            gap-4 mt-10'>
                {CoachingOptions.map((item, index) => (
                    <BlurFade key={item.icon} delay={0.25 + index * 0.05} inView>
                        <div key={index} className='flex flex-col justify-center cursor-pointer items-center p-4 border rounded-2xl shadow-md hover:border-primary '>
                            <UserInputDialog coachingitem={item}>
                                <div key={index} className='flex flex-col justify-center items-center '>
                                    <Image
                                        src={item.icon} alt={item.name} width={150} height={150} className='h-[70px] w-[70px] hover:rotate-12 cursor-pointer duration-300 ease-in-out' />
                                    <h1 className='font-medium mt-2'>{item.name}</h1>
                                </div>
                            </UserInputDialog>
                        </div>
                    </BlurFade>

                ))}
            </div>

        </div>
    )
}

export default FeatureAssistants