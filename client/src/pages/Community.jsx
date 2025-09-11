import React, { useEffect } from 'react'
import { useUser } from '@clerk/clerk-react';
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart } from 'lucide-react';

import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const { getToken } = useAuth();
  const { user } = useUser();

  const fetchCreations = async () => {
    try {

      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false);
  }

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post('/api/user/toggle-like-creation', { creationId : id }, {
        headers: {
          Authorization: `Bearer ${await getToken()}`
        }
      });
      if (data.success) {
        toast.success(data.message);
        await fetchCreations();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return !loading ?  (
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
                  <Heart onClick={() => imageLikeToggle(creation.id)} className={`w-5 h-5 hover:scale-110 cursor-pointer transition-transform ${creation.likes.includes(user?.id) ? 'fill-red-500 text-red-600' : 'text-white'}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className='h-full flex justify-center items-center'>
      <span className='w-10 h-10 rounded-full border-3 border-t-transparent border-blue-500 animate-spin'></span>
    </div>
  )
}

export default Community