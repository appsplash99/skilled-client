import { useParams, useNavigate } from "react-router-dom";
import { FaRegCalendar } from "react-icons/fa";
import { playlistsContainTheVideo, kFormatter, getIdOfAPlaylist, isVideoInPlaylist } from "../../utils/array-functions";
import { LoaderCometSpinner } from "morphine-ui";
import { useWidth } from "../../hooks/useWidth";
import { ModalAddToPlaylist } from "./ModalAddToPlaylist";
import { useState, useEffect } from "react";
import { CustomVideoIFrame } from "./CustomIframe";
import { useLibraryContext } from "../../context/libraryState";
import { LikeVideoBtn } from "./LikeVideoBtn";
import { AddToWatchLaterBtn } from "./AddToWatchLaterBtn";
import { PlaylistModalBtn } from "./PlaylistModalBtn";
import { getLocalCredentials } from "../../utils/localStorage";
import { SaveVideoBtn } from "./SaveVideoBtn";
import { addVideoToPlaylistDb, removeVideoFromPlaylistDb } from "../../utils/serverRequests";
import { BASE_URL } from "../../utils/apiRoutes";
import axios from "axios";
import { toast } from "react-toastify";

export const VideoDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [desiredVideo, setDesiredVideo] = useState({});
  const navigate = useNavigate();
  const { token } = getLocalCredentials();
  const customIFrameWidth = useWidth();
  const { _id } = useParams();

  const {
    state: { playlists },
    dispatch,
  } = useLibraryContext();

  useEffect(() => {
    let mounted = true;
    if (!token) {
      navigate("/login");
    }
    const source = axios.CancelToken.source();
    mounted &&
      (async () => {
        try {
          setIsLoading(true);
          const {
            data: { response, success },
          } = await axios.get(`${BASE_URL}/videos/${_id}`, {
            cancelToken: source.token,
          });
          if (success) setDesiredVideo(response);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          toast.error("Unable to Ftech Video Details");
        }
      })();
    return () => {
      mounted = false;
      source.cancel("Cancelling in cleanup");
    };
  }, []);

  const likedVideosPlaylistId = getIdOfAPlaylist(playlists, "Liked Videos");
  const savedVideosPlaylistId = getIdOfAPlaylist(playlists, "Saved Videos");
  const watchLaterPlaylistId = getIdOfAPlaylist(playlists, "Watch Later");

  if (isLoading && !desiredVideo) {
    return (
      <div className="flex flex--column align-items--c justify-content--c" style={{ height: "80vh" }}>
        <LoaderCometSpinner color="lightblue" style={{ height: "100px", width: "100px" }} />
      </div>
    );
  }

  return (
    <div className="flex flex--column align-items--c justify-content--c mx--md">
      <ModalAddToPlaylist desiredVideoId={desiredVideo._id} showModal={showModal} setShowModal={setShowModal} />
      <div
        className="flex align-items--c justify-content--c gap--lg"
        style={{ filter: showModal ? "blur(1px)" : "blur(0px)" }}
      >
        <div className="flex flex--column">
          <div>
            <CustomVideoIFrame
              title={desiredVideo.title}
              videoId={desiredVideo.videoId}
              currentWindowWidth={customIFrameWidth}
            />
          </div>
        </div>
        <div className="flex flex--column align-items--c justify-content--se gap" style={{ height: "100%" }}>
          <div className="flex flex--column align-items--c justify-content--c">
            {/* opens modal */}
            <PlaylistModalBtn
              isVideoAddedInPlaylist={playlists && playlistsContainTheVideo({ playlists, video_Id: _id })}
              handleShowHideModal={() => setShowModal(true)}
              style={{ backgroundColor: "var(--grey-200)", height: "3.5rem", width: "3.5rem" }}
            />
          </div>
          <div className="flex flex--column align-items--c justify-content--c">
            <LikeVideoBtn
              style={{ backgroundColor: "var(--grey-200)", height: "3.5rem", width: "3.5rem" }}
              numberOfLikes={kFormatter(desiredVideo.likes)}
              isVideoAlreadyLiked={
                playlists &&
                isVideoInPlaylist({ userPlaylists: playlists, playlistId: likedVideosPlaylistId, videoId: _id })
              }
              handleAddtoLikedVideos={async () => {
                toast.info("Liking Video...");
                const {
                  data: { success, response },
                } = await addVideoToPlaylistDb({
                  url: `${BASE_URL}/playlist/${likedVideosPlaylistId}/${_id}`,
                  token,
                  dispatch,
                });
                if (success) {
                  toast.success("Video Liked!");
                  dispatch({ type: "LOAD_VIDEOS_OF_A_PLAYLIST", payload: response });
                }
              }}
              handleRemoveFromLikedVideos={async () => {
                toast.info("Disliking Video...");
                const {
                  data: { success, response },
                } = await removeVideoFromPlaylistDb({
                  url: `${BASE_URL}/playlist/${likedVideosPlaylistId}/${_id}`,
                  token,
                });
                if (success) {
                  toast.success("Disliked the Video!");
                  dispatch({ type: "LOAD_VIDEOS_OF_A_PLAYLIST", payload: response });
                }
              }}
            />
          </div>
          <div className="flex flex--column align-items--c justify-content--c">
            <AddToWatchLaterBtn
              isVideoAddedToWatchLater={
                playlists &&
                isVideoInPlaylist({ userPlaylists: playlists, playlistId: watchLaterPlaylistId, videoId: _id })
              }
              handleAddToWatchLater={async () => {
                toast.info("Adding to Watch Later...");
                const {
                  data: { success, response },
                } = await addVideoToPlaylistDb({
                  url: `${BASE_URL}/playlist/${watchLaterPlaylistId}/${_id}`,
                  token,
                  dispatch,
                });
                if (success) {
                  toast.success("Video Added to Watch Lat!");
                  dispatch({ type: "LOAD_VIDEOS_OF_A_PLAYLIST", payload: response });
                }
              }}
              handleRemoveFromWatchLater={async () => {
                toast.info("Removing Video from Watch Later...");
                const {
                  data: { success, response },
                } = await removeVideoFromPlaylistDb({
                  url: `${BASE_URL}/playlist/${watchLaterPlaylistId}/${_id}`,
                  token,
                });
                if (success) {
                  toast.success("Video Removed from Watch Later!");
                  dispatch({ type: "LOAD_VIDEOS_OF_A_PLAYLIST", payload: response });
                }
              }}
              style={{
                backgroundColor: "var(--grey-200)",
                height: "3.5rem",
                width: "3.5rem",
              }}
            />
          </div>
          <div className="flex flex--column align-items--c justify-content--c">
            <SaveVideoBtn
              isVideoAddedToSavedVideos={
                playlists &&
                isVideoInPlaylist({ userPlaylists: playlists, playlistId: savedVideosPlaylistId, videoId: _id })
              }
              handleAddToSavedVideos={async () => {
                toast.info("Saving Video...");
                const {
                  data: { success, response },
                } = await addVideoToPlaylistDb({
                  url: `${BASE_URL}/playlist/${savedVideosPlaylistId}/${_id}`,
                  token,
                });
                if (success) {
                  toast.success("Added to Saved Videos!");
                  dispatch({ type: "LOAD_VIDEOS_OF_A_PLAYLIST", payload: response });
                }
              }}
              handleRemoveFromSavedVideos={async () => {
                toast.info("Removing Saved Video...");
                const {
                  data: { success, response },
                } = await removeVideoFromPlaylistDb({
                  url: `${BASE_URL}/playlist/${savedVideosPlaylistId}/${_id}`,
                  token,
                });
                if (success) {
                  toast.success("Removed from Saved Videos!");
                  dispatch({ type: "LOAD_VIDEOS_OF_A_PLAYLIST", payload: response });
                }
              }}
              style={{
                backgroundColor: "var(--grey-200)",
                height: "3.5rem",
                width: "3.5rem",
              }}
            />
          </div>
        </div>
      </div>
      <div
        className="flex align-items--c justify-content--c gap--xxs"
        style={{
          borderTop: "2px solid var(--themeSecondary)",
          margin: "0 auto",
        }}
      >
        <FaRegCalendar className="text--md" />
        <div className="text--sm">{desiredVideo.date}</div>
      </div>
      <div style={{ maxWidth: customIFrameWidth / 1.7, marginTop: "1rem" }}>
        {customIFrameWidth}
        {desiredVideo.description}
      </div>
    </div>
  );
};
