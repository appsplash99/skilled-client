import React from "react";
import { getLocalCredentials } from "../../utils/localStorage";
import { useLibraryContext } from "../../context/libraryState";
import { Link } from "react-router-dom";
import { BtnIcon } from "morphine-ui";
import { FaRegTrashAlt } from "react-icons/fa";

export const SavedVideos = () => {
  const { token } = getLocalCredentials();
  const {
    dispatch,
    state: { playlists },
  } = useLibraryContext();

  const savedVideos = playlists.filter((playlistObj) => playlistObj.name === "Saved Videos")[0].videos;

  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {!savedVideos && <div>why so empty....</div>}
      {savedVideos &&
        savedVideos.map((videoObj) => (
          <div
            className="flex align-items--c gap p--xxs m--xxs p--xs bg--secondary border-radius--md"
            key={videoObj._id}
          >
            <div>
              <Link to={`/videos/${videoObj._id}`}>
                <img
                  alt={videoObj.title}
                  src={videoObj.video.thumbnail}
                  height="calc(4*var(--space-xl))"
                  width="calc(4*var(--space-xl))"
                  className="border-radius--md"
                />
              </Link>
              <BtnIcon
                variant="error"
                size="lg"
                onClick={() => {
                  // dispatch({
                  //   type: "REMOVE_VIDEO_FROM_LIKED_VIDEOS",
                  //   payload: videoObj.videoId,
                  // })
                }}
              >
                <FaRegTrashAlt className="text--xl text--danger m0" />
              </BtnIcon>
            </div>
          </div>
        ))}
    </div>
  );
};
