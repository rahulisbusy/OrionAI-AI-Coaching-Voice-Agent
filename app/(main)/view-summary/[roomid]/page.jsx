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
    return <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans bg-[length:600%_600%] animate-[gradientShift_10s_ease_infinite] bg-[linear-gradient(45deg,#1a1a1a,#ff6b6b,#2a2a2a,#ffd93d,#1e1e1e,#6bcf7f,#252525,#4ecdc4,#1f1f1f,#45b7d1,#2c2c2c,#96ceb4)]">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-20 h-20 rounded-full bg-[#1a1a1a] opacity-10 shadow-[0_0_20px_rgba(26,26,26,0.3)] animate-[float_6s_ease-in-out_infinite]"></div>
          <div className="absolute top-[60%] right-[20%] w-16 h-16 rounded-full bg-black opacity-10 shadow-[0_0_25px_rgba(0,0,0,0.4)] animate-[float_6s_ease-in-out_infinite_-2s]"></div>
          <div className="absolute bottom-[30%] left-[20%] w-[100px] h-[100px] rounded-full bg-[#6bcf7f] opacity-10 shadow-[0_0_15px_rgba(107,207,127,0.3)] animate-[float_6s_ease-in-out_infinite_-4s]"></div>
          <div className="absolute top-[40%] right-[10%] w-[70px] h-[70px] rounded-full bg-[#2a2a2a] opacity-10 shadow-[0_0_18px_rgba(42,42,42,0.3)] animate-[float_6s_ease-in-out_infinite_-1s]"></div>
          <div className="absolute bottom-[20%] right-[30%] w-[90px] h-[90px] rounded-full bg-[#1e1e1e] opacity-10 shadow-[0_0_22px_rgba(30,30,30,0.3)] animate-[float_6s_ease-in-out_infinite_-3s]"></div>
        </div>
        <div className="text-center z-10">
          <div className="relative w-[120px] h-[120px] mx-auto mb-10 animate-spin">
            <div className="absolute -inset-2 rounded-full bg-[conic-gradient(#000000,#ff0000,#1a1a1a,#ff8000,#2a2a2a,#ffff00,#1e1e1e,#80ff00,#252525,#00ff00,#1f1f1f,#00ff80,#2c2c2c,#00ffff,#000000,#0080ff,#1a1a1a,#0000ff,#2a2a2a,#8000ff,#1e1e1e,#ff00ff,#252525,#ff0080,#000000)] animate-[spin_2.5s_linear_infinite_reverse] z-[-1]"></div>
            <div className="absolute inset-2 rounded-full bg-black/85 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_2px_8px_rgba(255,255,255,0.1)] border border-white/10"></div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-black via-[#ff6b6b] to-[#45b7d1] bg-[length:400%_400%] bg-clip-text text-transparent animate-[textGradient_4s_ease_infinite,textFloat_2s_ease-in-out_infinite] drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] filter drop-shadow-[0_0_10px_rgba(255,255,255,0.1)] mb-4">
            Loading
          </h1>
          <p className="uppercase text-sm text-white/80 tracking-widest font-light animate-[pulse_2s_ease-in-out_infinite,subtitleShimmer_3s_ease_infinite] bg-gradient-to-r from-white via-black to-white bg-[length:200%_100%] bg-clip-text text-transparent shadow-[0_2px_4px_rgba(0,0,0,0.5)] mb-6">
            Please Wait
          </p>
          <div className="w-[200px] h-[4px] mx-auto rounded bg-black/30 border border-white/10 overflow-hidden">
            <div className="h-full animate-[progressFill_4s_ease-in-out_infinite] rounded bg-gradient-to-r from-black via-[#ff6b6b] to-[#45b7d1] shadow-[0_0_10px_rgba(255,255,255,0.2)]"></div>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            <div className="w-3 h-3 rounded-full bg-[#1a1a1a] shadow-[0_0_10px_rgba(26,26,26,0.5)] animate-[dotBounce_1.4s_ease-in-out_infinite_-0.32s]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ff6b6b] shadow-[0_0_10px_rgba(255,107,107,0.5)] animate-[dotBounce_1.4s_ease-in-out_infinite_-0.16s]"></div>
            <div className="w-3 h-3 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.8)] animate-[dotBounce_1.4s_ease-in-out_infinite_0s]"></div>
            <div className="w-3 h-3 rounded-full bg-[#4ecdc4] shadow-[0_0_10px_rgba(78,205,196,0.5)] animate-[dotBounce_1.4s_ease-in-out_infinite_0.16s]"></div>
            <div className="w-3 h-3 rounded-full bg-[#2a2a2a] shadow-[0_0_10px_rgba(42,42,42,0.5)] animate-[dotBounce_1.4s_ease-in-out_infinite_0.32s]"></div>
          </div>
        </div>

      </div>;
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