import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Layout from './pages/Layout';
import Dashboad from './pages/Dashboard';
import WriteArticle from './pages/WriteArticle';
import BlogTitles from './pages/BlogTitles';
import Community from './pages/Community';
import ReviewResume from './pages/ReviewResume';
import RemoveObject from './pages/RemoveObject';
import RemoveBackground from './pages/RemoveBackground';
import GenerateImages from './pages/GenerateImages';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

const App = () => {

  const { getToken } = useAuth();
  useEffect(() => {
    getToken().then((token) => {
      console.log("Token retrieved successfully", token);
    }).catch((error) => {
      console.error("Error retrieving token:", error);
    }
    );
  }, []);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/ai' element={<Layout />}>
          <Route index element={<Dashboad />} />
          <Route path='write-article' element={<WriteArticle />} />
          <Route path='blog-titles' element={<BlogTitles />} />
          <Route path='generate-images' element={<GenerateImages />} />
          <Route path='remove-object' element={<RemoveObject />} />
          <Route path='remove-background' element={<RemoveBackground />} />
          <Route path='review-resume' element={<ReviewResume />} />
          <Route path='community' element={<Community />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App