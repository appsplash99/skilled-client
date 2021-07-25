import React, { useState, useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { VIDEOS_URL } from "../../utils/apiRoutes";
import { Link, useNavigate } from "react-router-dom";
import { loadVideosFromDB } from "../../utils/serverRequests";
import { getLocalCredentials } from "../../utils/localStorage";
import { useLibraryContext } from "../../context/libraryState";
import { VideoCardBig, BtnInverted, LoaderCometSpinner } from "morphine-ui";
import { kFormatter, getIdOfAPlaylist, isVideoInPlaylist, playlistsContainTheVideo } from "../../utils/array-functions";
import { toast } from "react-toastify";

export const VideoListing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    state: { videos, playlists },
    dispatch,
  } = useLibraryContext();
  const { token } = getLocalCredentials();

  useEffect(() => {
    // (async () => {
    // })();
    setIsLoading(true);
    loadVideosFromDB({ dispatch, url: VIDEOS_URL, token });
    setIsLoading(false);
    // setTimeout(() => {}, 2000);
    // }, []);
  }, [playlists, dispatch, token]);

  const likedVideosPlaylistId = getIdOfAPlaylist(playlists, "Liked Videos");
  const watchLaterPlaylistId = getIdOfAPlaylist(playlists, "Watch Later");

  if (isLoading && !videos) {
    return (
      <div className="flex flex--column align-items--c justify-content--c" style={{ height: "80vh" }}>
        <LoaderCometSpinner color="lightblue" style={{ height: "100px", width: "100px" }} />
      </div>
    );
  }

  return (
    <div className="flex flex--column align-self--c justify-content--c mx text-align--c">
      <div
        style={{
          display: "grid",
          gridGap: "var(--space-md)",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        }}
      >
        {videos.map((videoObj, index) => {
          return (
            <div
              key={index}
              className="cursor--pointer"
              onClick={() => {
                toast.info("Enjoy the Video");
                navigate(`videos/${videoObj._id}`);
              }}
            >
              <VideoCardBig
                videoId={videoObj.videoId}
                title={videoObj.title.slice(0, 30)}
                description={videoObj.description}
                length={videoObj.length}
                views={videoObj.views}
                likes={kFormatter(videoObj.likes)}
                category={videoObj.category[0]}
                date={videoObj.date}
                thumbnail={videoObj.thumbnail}
                channelLogo={videoObj.channelLogo}
                isPlaylistItem={playlists && playlistsContainTheVideo({ playlists, video_Id: videoObj._id })}
                isWatchLaterItem={
                  playlists
                    ? isVideoInPlaylist({
                        userPlaylists: playlists,
                        playlistId: watchLaterPlaylistId,
                        videoId: videoObj._id,
                      })
                    : false
                }
                isLikedVideo={
                  playlists
                    ? isVideoInPlaylist({
                        userPlaylists: playlists,
                        playlistId: likedVideosPlaylistId,
                        videoId: videoObj._id,
                      })
                    : false
                }
                /** TODO: COMPLETE ABOVE ERROR */
                playNowBtn={
                  <Link to={`/:${videoObj.videoId}`}>
                    <BtnInverted variant="primary" size="sm" style={{ border: "2px solid var(--themePrimary)" }}>
                      <div className="flex align-items--c justify-content--sb gap--xxs">
                        <FaPlayCircle className="text--lg" />
                        <div className="text--xxs">Play Now</div>
                      </div>
                    </BtnInverted>
                  </Link>
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
