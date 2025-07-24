import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react';
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart } from 'lucide-react';

const Community = () => {
  const [creations, setCreations] = React.useState([]);
  const { user } = useUser();

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  }
  
  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);
  
  return (
    <div className='h-full overflow-y-scroll p-6 flex flex-col gap-4 text-slate-700'>
      <h1 className='text-xl font-semibold'>Creations</h1>
      <div className='bg-white flex-1 rounded-xl overflow-y-scroll p-3'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {creations.map((creation, index) => (
            <div key={index} className='relative group'>
              <img 
                src={creation.content} 
                alt={creation.title} 
                className='w-full h-48 object-cover rounded-lg' 
              />
              <div className='absolute inset-0 flex items-end justify-between p-3 opacity-0 group-hover:opacity-100 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg transition-all duration-200'>
                <p className='text-sm flex-1 mr-2'>{creation.prompt}</p>
                <div className='flex items-center gap-1 flex-shrink-0'>
                  <p>{creation.likes.length}</p>
                  <Heart className={`w-5 h-5 hover:scale-110 cursor-pointer transition-transform ${creation.likes.includes(user?.id) ? 'fill-red-500 text-red-600' : 'text-white'}`}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Community