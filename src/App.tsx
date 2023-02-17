import React, {useState, useEffect} from 'react';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import logo from './logo.svg';
import {SearchPage} from './utilities/ui';
import './App.css';
import userEvent from '@testing-library/user-event';

function App() {
  const [play, setPlay] = useState<number>(Infinity);  
  const [source, setSource] = useState<Blob|undefined>();

  useEffect(() =>{
    if(source !== undefined) return;
    caches.match('./cache_resources/mergedAudio.mp3')
    .then((cacheRes)=> cacheRes?.blob())
    .then((blob) =>{
      if(blob){
        console.log('cache exists');
        setSource(blob);
      }
    })
  }, [play, source]);

  return (
    <div className="App">
      <BrowserRouter basename='/proj'>
        <Routes>
          <Route path='/' element={<SearchPage source={source} play={play} setPlay={setPlay} />} />          
          <Route path='/:urlParams' element={<SearchPage source={source} play={play} setPlay={setPlay} />} />       
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;