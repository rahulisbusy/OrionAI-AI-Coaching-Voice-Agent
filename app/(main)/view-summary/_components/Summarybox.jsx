import React from 'react'
import ReactMarkdown from 'react-markdown'
function Summarybox({summary}) {
  return (
    
      <div className='text-center p-4 h-[60vh] overflow-y-auto mb-6'>
        <h2 className="text-xl font-extrabold mb-2">Summary of the conversation</h2>
        <ReactMarkdown>{summary}</ReactMarkdown>
      </div>
    
  )
}   

export default Summarybox