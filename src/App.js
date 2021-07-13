import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { LoaderCometSpinner } from "morphine-ui";
import { PrivateRoute } from "./components/PrivateRoute";
import { SkilledNavbar } from "./components/SkilledNavbar/SkilledNavbar";
import { Login, SignUp, VideoDetail, VideoListing, LikedVideos, WatchLater, Playlists } from "./pages";
import "./App.css";
import { PLAYLIST_ROUTE, VIDEOS_URL } from "./utils/apiRoutes";
import { getLocalCredentials } from "./utils/localStorage";
import { loadVideosFromDB, loadUserPlaylists } from "./utils/serverRequests";
import { useLibraryContext } from "./context/libraryState";
import { useToast } from "./context/toastState";

function App() {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = getLocalCredentials();
  const { dispatch } = useLibraryContext();
  const { ToastContainer, toast } = useToast();


  useEffect(() => {
    setIsLoading(true);
    token && loadUserPlaylists({ dispatch, url: PLAYLIST_ROUTE, token, toast });
    setIsLoading(false);
  }, [token]);

  if (isLoading === true) {
    return (
      <div
        style={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <LoaderCometSpinner color="lightblue" style={{ height: "100px", width: "100px" }} />
      </div>
    );
  }

  return (
    <div className="App">
      <SkilledNavbar setShowMobileNav={setShowMobileNav} showMobileNav={showMobileNav}></SkilledNavbar>
      <div style={{ marginTop: "7rem", paddingBottom: "7rem", overflowX: "hidden" }}>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<VideoListing />} />
          <Route path="videos/:_id" element={<VideoDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* PRIVATE ROUTES */}
          <PrivateRoute path="/playlist" element={<Playlists />} />
          <PrivateRoute path="/watch-later" element={<WatchLater />} />
          <PrivateRoute path="/liked-videos" element={<LikedVideos />} />

          <Route path="*" element={<>Route Not Found</>} />
        </Routes>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
