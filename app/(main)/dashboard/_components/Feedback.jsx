"use client";
import React, { useContext, useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { UserContext } from "@/app/_context/UserContext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import moment from "moment";
import Link from "next/link";

function Feedback() {
  const convex = useConvex();
  const { userData } = useContext(UserContext);
  const [result, setresult] = useState([]);
  console.log("User data in History component:", userData); // Debug userData

  // Define the function before useEffect
  const GetDiscussionRooms = async () => {
    if (!userData || !userData._id) {
      console.warn("⚠️ User data is missing or invalid.");
      return;
    }

    try {
      const result2 = await convex.query(api.discussionRoom.GetAllDiscussionRoom, {
        uid: userData._id,
      });
      console.log("Discussion Rooms:", result2);
      setresult(result2);
    } catch (error) {
      console.error("Error fetching discussion rooms:", error);
    }
  };
   
   
  // Call the function inside useEffect
  useEffect(() => {
    console.log("userData:", userData); // Debug userData
    if (userData) {
      GetDiscussionRooms();
    }
  }, [userData]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Your Previous Lectures</h2>
      {
        result?.length > 0 ? (
          <div className="grid grid-cols-1 gap-2">
            {result
              .filter((item) =>
                ['Ques Ans Prep', "Mock Interview"].includes(item.coachingOption)
              )
              .map((lecture) => {
                // Generate a random number between 1 and 5 for each lecture
                const picno = Math.floor(Math.random() * 5) + 1;

                return (
                  <div
                    key={lecture._id}
                    className="p-1 group border rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-7 items-center">
                        <div>
                          <Image
                            src={`/ab${picno}.png`}
                            height={50}
                            width={50}
                            alt={`Image ${picno}`}
                            className="h-[60px] w-[60px] rounded-full border"
                          />
                        </div>

                        <div>
                          <h3 className="text-md font-semibold text-gray-800">{lecture.topicName}</h3>
                          <p className="text-sm text-gray-500">{lecture.coachingOption}</p>
                          <p className="text-gray-600 text-sm">{lecture.coachingExpert}</p>
                          <p className="text-gray-400 text-sm">
                            {moment(lecture._creationTime).fromNow()}
                          </p>
                        </div>
                      </div>

                      <div>
                       <Link href={`/view-summary/${lecture._id}`} >
                       <Button variant="outline" className="invisible group-hover:visible cursor-pointer">
                          View Feedback
                        </Button>
                       </Link>
                        
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <h2 className="text-lg font-semibold text-gray-400 text-center">
            You don't have any previous feedbacks yet.
          </h2>
        )
      }
    </div>
  );
}

export default Feedback