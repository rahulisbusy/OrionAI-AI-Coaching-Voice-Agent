import React from 'react';

function Chatbox({ conversation }) {
    return (
        <div>
            <div className="h-[60vh] bg-gray-200 rounded-4xl p-4 overflow-y-auto">
                <div>
                    {
                        conversation?.map((item, index) => (
                            <div key={index} className={`mb-2 ${item.role === 'user' ? 'text-right' : 'text-left'}`}>
                                <div
                                    className={`inline-block px-4 py-2 rounded-xl ${
                                        item.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                                    }`}
                                >
                                    {item?.content}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mt-2">
                <h1 className="text-gray-500 font-medium text-sm text-center">
                    At the end of the conversation we will automatically generate your feedback!!
                </h1>
            </div>
        </div>
    );
}

export default Chatbox;