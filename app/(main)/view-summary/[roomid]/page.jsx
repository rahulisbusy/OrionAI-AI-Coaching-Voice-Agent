"use client";
import React from "react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { CoachingOptions } from "@/services/Options";
import Image from "next/image";
import moment from "moment";
import Chatbox from "@/app/(main)/discussion-room/[roomid]/_components/Chatbox";
import Summarybox from "@/app/(main)/view-summary/_components/Summarybox";
function Viewsummary() {
  const { roomid } = useParams();
  

  const roomdata = useQuery(api.discussionRoom.GetDiscussionRoom, { id: roomid });
  console.log("Room data:", roomdata); // Debug roomdata
  if (!roomdata) {
    return <div>Loading...</div>;
  }
  const Getabstractimages = (option) => {
    const result = CoachingOptions.find(option => option.name === roomdata.coachingOption);
    return result?.abstract;
  }

  return (
    <div>
      <div className="flex  justify-between items-center  p-4  shadow-md  mb-4 rounded-2xl">
        <div className="flex items-center space-x-4 ">
          <Image src={Getabstractimages(roomdata.coachingOption)} alt={"abstract image"}
            width={100} height={100}
            className='rounded-full h-[60px] w-[60px]'

          />
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{roomdata.topicName}</h3>
            <p className="text-sm text-gray-500">{roomdata.coachingOption}</p>
            <p className="text-gray-600 text-sm">{roomdata.coachingExpert}</p>
       
          </div>
        </div>

        <p className="text-gray-400 text-sm">
          {moment(roomdata._creationTime).fromNow()}
        </p>
      </div>
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="col-span-2" > 
           <Summarybox summary={roomdata?.summary}/>
                 </div>
        <div className="col-span-2">
          {
            roomdata && (
              <>
              <h2 className="font-semibold text-lg">Your Conversation</h2>
              <Chatbox conversation={roomdata?.conversation} coachingOption={roomdata?.coachingOption}
                isFeedback={false} />
              </>
              
            )
          }


        </div>
      </div>
    </div>
  );
}

export default Viewsummary;