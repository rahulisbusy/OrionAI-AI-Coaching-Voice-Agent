import React from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { CoachingExpert } from '@/services/Options'
import Image from 'next/image'
import { useState,useContext } from 'react'
import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { LoaderCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { UserContext } from '@/app/_context/UserContext'
function UserInputDialog({ children, coachingitem }) {
    const [selectedExp, setselectedExp] = useState();
    const [selectedTopic, setselectedTopic] = useState();
    const createDiscussionRoom=useMutation(api.discussionRoom.CreateDiscussionRoom)
    const [loading, setloading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const {userData}=useContext(UserContext);
    const router = useRouter();
    
        const onClickNext=async()=>{
        setloading(true)
     const result=await createDiscussionRoom({
        topicName:selectedTopic,
        coachingOption:coachingitem.name,
        coachingExpert:selectedExp,
        uid:userData?._id
     })
     setloading(false);
     setOpenDialog(false);
     router.push(`/discussion-room/${result}`)
    }
    
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{coachingitem.name}</DialogTitle>
                    <DialogDescription asChild>
                        <div className='mt-2'>
                            <h2 className='text-black'>Enter your topic to master your skills in {coachingitem.name}</h2>
                            <Textarea placeholder="Enter your topic here..." className="mt-2" onChange={(e)=>{setselectedTopic(e.target.value)}} />
                            <h2 className='text-black mt-2'>Please select your Coaching Expert</h2>
                            <div className='grid grid-cols-2 md:grid-cols-4 mt-2 gap-3'>
                                {CoachingExpert.map((item, index) => (
                                    <div
                                        onClick={() => setselectedExp(item.name)}
                                        key={index}
                                        className={`flex flex-col justify-center items-center`}
                                    >
                                        <Image
                                            src={item.avatar}
                                            alt={item.name}
                                            width={150}
                                            height={150}
                                            className={`h-[70px] w-[70px] rounded-xl object-cover cursor-pointer hover:scale-105 transition-all p-1 duration-300 ease-in-out  ${
                                            selectedExp === item.name ? 'border-2 border-secondary' : 'border border-gray-300'
                                        }`}
                                        />
                                        <h1 className="font-medium text-center text-black">{item.name}</h1>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-5 justify-end mt-2">
                                <DialogClose asChild>
                                <Button variant={'ghost'}>Cancel</Button>
                                </DialogClose>
                                
                                <Button disabled={!selectedTopic || !selectedExp || loading} onClick={onClickNext}>
                                {loading ? <LoaderCircle className="animate-spin" /> : "Next"}
                                </Button>
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}

export default UserInputDialog