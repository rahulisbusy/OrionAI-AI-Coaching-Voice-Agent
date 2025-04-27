import { Button } from '@/components/ui/button';
import React, { useState, useRef, useEffect } from 'react';
import { Feedbackgenerator } from '@/services/GlobalServices';
import { LoaderCircle } from 'lucide-react';
import { useMutation } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';

function Chatbox({ conversation, coachingOption, isFeedback }) {
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackText, setFeedbackText] = useState("");
    const chatEndRef = useRef(null);
    const updatesummary=useMutation(api.discussionRoom.Updatesummary);
    const {roomid}=useParams();
    const GenrateFeedback = async () => {
        setIsLoading(true);
        try{
            const feedback = await Feedbackgenerator(coachingOption, conversation);
            setFeedbackText(feedback.content);
            setIsLoading(false);
            await updatesummary({id:roomid,summary:feedback.content});
            toast.success("Feedback generated successfully!");
        }
        catch (error) {
            setIsLoading(false);
            toast.error("Error generating feedback. Please try again later.");
        }
        
    };

    // Scroll to bottom when messages update
    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [conversation, feedbackText]);

    return (
        <div className="flex flex-col h-full">
            <div className="h-[60vh] bg-white border border-gray-300 shadow-md rounded-3xl p-4 overflow-y-auto space-y-3">
                {conversation?.map((item, index) => (
                    <div
                        key={index}
                        className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                                item.role === 'user'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-900'
                            }`}
                        >
                            {item?.content}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef}></div>
            </div>

            <div className="mt-3 flex flex-col items-center space-y-3">
                {!isFeedback ? (
                    <p className="text-gray-500 font-medium text-sm text-center">
                        ✅ At the end of the conversation, we’ll generate your feedback automatically!
                    </p>
                ) : (
                    <Button
                        onClick={GenrateFeedback}
                        disabled={isLoading}
                        className="w-full max-w-[200px]"
                    >
                        {isLoading ? (
                            <span className="flex items-center">
                                <LoaderCircle className="animate-spin mr-2" />
                                Generating...
                            </span>
                        ) : (
                            "Generate Feedback"
                        )}
                    </Button>
                )}

                {feedbackText && (
                    <div className="w-full bg-yellow-50 border border-yellow-300 text-yellow-900 p-4 rounded-xl text-sm shadow-inner">
                        <h3 className="font-semibold mb-1">📝 Your Feedback:</h3>
                        <p className="whitespace-pre-wrap">{feedbackText}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Chatbox;
