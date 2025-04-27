"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { CoachingExpert } from "@/services/Options";
import Image from "next/image";
import { UserButton } from "@stackframe/stack";
import { Button } from "@/components/ui/button";
import { AIModel, getToken, speakText } from "@/services/GlobalServices";
import { Loader2Icon } from "lucide-react";
import Chatbox from "./_components/Chatbox";
import { toast } from "sonner";
import { UserContext } from "@/app/_context/UserContext";
function DiscussionRoom() {
    const { roomid } = useParams();
    const {userdata,setuserdata} =useContext(UserContext);
    const [expert, setexpert] = useState();
    const [enableMic, setenableMic] = useState(false);
    const [transcription, setTranscription] = useState('');
    const roomdata = useQuery(api.discussionRoom.GetDiscussionRoom, { id: roomid });
    const [isFeedback, setIsFeedback] = useState(false);
    const updateconvo=useMutation(api.discussionRoom.Updateconversation);
    const [conversation, setConversation] = useState([
        {
            role: 'assistant',
            content:'Hi'
        },
        {
            role: 'user',
            content: 'Hello'
        }
    ]);
    const [canPlayAudio, setCanPlayAudio] = useState(true);
    
    const [isLoading, setIsLoading] = useState(false);
    const mediaRecorderRef = useRef(null);
    const socketRef= useRef(null);
    const updateUserTokens=useMutation(api.users.Updatetokens);

    useEffect(() => {
        if (!roomdata) return;
        const Expert = CoachingExpert.find((item) => item.name === roomdata.coachingExpert);
        setexpert(Expert);
    }, [roomdata]);

    const connecttoServer = async () => {
        setIsLoading(true);
        setCanPlayAudio(true);
        const response = await getToken();
        const apiKey = response.apiKey;
        navigator.mediaDevices.getUserMedia({ audio: true }).then(async (stream) => {
            const mediaRecorder = new MediaRecorder(stream, { mimeType: "audio/webm" });
            const socket = new WebSocket('wss://api.deepgram.com/v1/listen', ['token', apiKey]);
            mediaRecorderRef.current = mediaRecorder;
            socketRef.current = socket;
            socket.onopen = () => {
                mediaRecorder.addEventListener('dataavailable', event => {
                    if (socket.readyState === WebSocket.OPEN) {
                        socket.send(event.data);
                    }
                });
                mediaRecorder.start(250);
                setIsLoading(false);
                setenableMic(true);
                toast("Connected...", { duration: 2000 });
            }

            socket.onmessage = async(event) => {
                const received = JSON.parse(event.data);
                const transcript = received.channel.alternatives[0]?.transcript;
                if (transcript && received.is_final) {
                    setTranscription(prev => prev + ' ' + transcript);
                    setConversation(prev => [...prev, { role: 'user', content: transcript }]);
                }
            }
        }).catch(error => {
            console.error("Error:", error);
            setenableMic(false);
            setIsLoading(false);
        });
    };

    useEffect(() => {
        async function fetchData() {
            if (
                conversation[conversation.length - 1]?.role === 'user' &&
                roomdata?.topicName &&
                roomdata?.coachingOption
            ) {
                const lastTwomsg = conversation.slice(-2);
                const AIresponse = await AIModel(
                    roomdata.topicName,
                    roomdata.coachingOption,
                    roomdata.coachingExpert,
                    lastTwomsg
                );
    
                // Add AI response to the conversation
                setConversation((prev) => [
                    ...prev,
                    { role: 'assistant', content: AIresponse.content },
                ]);
    
                // Trigger TTS if audio playback is enabled
                if (canPlayAudio) {
                    speakText(AIresponse.content, expert?.voice);
                }
            }
        }
    
        fetchData();
    }, [conversation, roomdata, canPlayAudio]);

    const disconnecttoServer = async (e) => {
        e.preventDefault();
    
        // Stop MediaRecorder
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
            mediaRecorderRef.current.stop();
        }
    
        // Close WebSocket
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.close();
        }
    
        // Reset refs
        socketRef.current = null;
        mediaRecorderRef.current = null;
    
        setenableMic(false);
        updateconvo(
            {
                id: roomdata._id,
                conversation: conversation,
            }
        )
        setIsFeedback(true);
        setIsLoading(false);
        toast("Disconnected...", { duration: 2000 });
    };
    const Updatetokens =async() => {
    const result=await updateUserTokens({
        id:roomdata?._id,
        credits:Number(userdata?.credits)-1000

    })
    setuserdata((prev) =>(
        {...prev,
       credits:result.credits
    }))

    };

    return (
        <div className="-mt-12 mb-20">
            <h1 className="text-lg font-bold">{roomdata?.coachingOption}</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 mt-5 gap-5">
                <div className="lg:col-span-2">
                    <div className="h-[60vh] bg-gray-200 rounded-4xl flex flex-col items-center justify-center relative">
                        {expert?.avatar && (
                            <Image
                                src={expert.avatar}
                                alt="avatar"
                                height={180}
                                width={180}
                                priority
                                style={{ height: "70px", width: "70px" }}
                                className="rounded-full object-cover animate-pulse"
                            />
                        )}
                        <h2>{expert?.name}</h2>
                        <div className="flex items-center justify-center bg-gray-300 rounded-xl py-4 px-10 mt-2 absolute bottom-5 right-5">
                            <div style={{pointerEvents: 'none'}} >
                            <UserButton/>
                            </div>
                            
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-5">
                        {!enableMic ? (
                            <Button onClick={connecttoServer} disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <Loader2Icon className="animate-spin mr-2" /> Connecting...
                                    </span>
                                ) : (
                                    "Connect"
                                )}
                            </Button>
                        ) : (
                            <Button variant="destructive" onClick={disconnecttoServer} disabled={isLoading}>
                                {isLoading ? (
                                    <span className="flex items-center">
                                        <Loader2Icon className="animate-spin mr-2" /> Disconnecting...
                                    </span>
                                ) : (
                                    "Disconnect"
                                )}
                            </Button>
                        )}
                    </div>
                </div>

                <div>
                    <Chatbox conversation={conversation} coachingOption={roomdata?.coachingOption} isFeedback={isFeedback}/>
                </div>
            </div>
        </div>
    );
}

export default DiscussionRoom;
