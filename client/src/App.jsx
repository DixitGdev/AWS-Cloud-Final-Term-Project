import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { logo } from './assets';
import { Home, CreatePost, Api, About } from './page';

const App = () => (
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-white sm:px-10 px-2 py-2 border-b border-b-[#e6ebf4]">
      <Link to="/" className='flex items-center'>
        <img src={logo} alt="logo" className="w-11 object-contain" />
        <h1 className='text-4xl font-bold mx-5'>PixelPen</h1>
      </Link>
      <Link to="/api" className='ml-auto'>Api</Link>
      <Link to="/about" className='mx-7'>About</Link>
      <Link to="/create-post" className="font-inter font-medium  bg-[#0366d6] text-white px-8 py-2 rounded-md hover:bg-[#1872da]">Create</Link>

    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/create-post" element={<CreatePost />} />
        <Route path='/api' element={<Api />} />
        <Route path='/about' element={<About />}/>
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
