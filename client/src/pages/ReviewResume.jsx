import React from 'react'
import { Sparkles , Eraser, FileText } from 'lucide-react';


const ReviewResume = () => {
  const [input, setInput] = React.useState('');
    const onsubmitHandler = async (e) => {
        e.preventDefault();
      }
  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-col lg:flex-row items-start gap-4 text-slate-700'>
      {/* left col */}
      <form onSubmit={onsubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 '>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'> Resume Review</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Resume</p>
        <input onChange={(e) => setInput(e.target.files[0])} type='file' accept='application/pdf' className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600' required />
        <p className='text-xs text-gray-500 font-light mt-1'>Supports PDF resume only! </p>
        <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white px-4 py-2 rounded-lg mt-6 text-sm cursor-pointer hover:opacity-90 transition-all duration-200'>
          <FileText className='w-5' /> Review Resume
        </button>
      </form>
      {/* right col */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <FileText className='w-5 h-5 text-[#00DA83]' />
          <h1 className='text-xl font-semibold'> Analysis results</h1>
        </div>
        <div className='flex-1 flex justify-center items-center '>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
            <FileText className='w-9 h-9 ' />
            <p>Upload an image and "Review Resume" to get started!</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewResume