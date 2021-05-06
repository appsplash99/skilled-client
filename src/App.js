import './App.css';
import { Routes, Route } from 'react-router-dom';
import { VideoListing } from './pages/VideoListing/VideoListing';
import { SkilledNavbar } from './components/SkilledNavbar/SkilledNavbar';
import { useState } from 'react';
import { VideoPage } from './pages/VideoPage/VideoPage';
import { PlaylistsPage } from './pages/PlaylistsPage/PlaylistsPage';
import { WatchLaterPage } from './pages/WatchLaterPage/WatchLaterPage';
import { LikedVideosPage } from './pages/LikedVideosPage/LikedVideos';

function App() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  return (
    <div className="App">
      <SkilledNavbar
        setShowMobileNav={setShowMobileNav}
        showMobileNav={showMobileNav}></SkilledNavbar>
      <div
        style={{
          marginTop: '7rem',
        }}>
        <Routes>
          <Route path="/" element={<VideoListing />} />
          <Route path="/:videoId" element={<VideoPage />} />
          <Route path="/playlist" element={<PlaylistsPage />} />
          <Route path="/watch-later" element={<WatchLaterPage />} />
          <Route path="/liked-videos" element={<LikedVideosPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
