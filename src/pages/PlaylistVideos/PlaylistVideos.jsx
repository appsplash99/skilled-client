import React from "react";
import { Link, useParams } from "react-router-dom";
import { toSpacedTitleCase } from "../../utils/utils";
import { getVideosOfPlaylistCategory } from "../../utils/array-functions";
import { useLibraryContext } from "../../context/libraryState";
import { VideoCardHorizontal } from "../../components/VideoCardHorizontal";

export const PlaylistVideos = () => {
  const { playlistName, playlistId } = useParams();
  const {
    state: { playlists },
  } = useLibraryContext();

  const originalPlaylistName = toSpacedTitleCase(playlistName);

  return (
    <div className="flex-center margin-left-4">
      {
        <div className="flex flex--column gap">
          <div className="back_link">
            <Link to="/" className="text-decoration--none text--primary">{`Back to My Videos`}</Link>
          </div>
          <h2 className="heading">{`${originalPlaylistName}`}</h2>

          {getVideosOfPlaylistCategory(playlists, playlistId)?.length ? (
            getVideosOfPlaylistCategory(playlists, playlistId).map((videoObj) => {
              return (
                <div key={playlistId} className="text-decoration--none text--dark">
                  <VideoCardHorizontal
                    key={videoObj._id}
                    video={videoObj.video}
                    videoObj={videoObj}
                    playlistName={originalPlaylistName}
                    playlistId={playlistId}
                  />
                </div>
              );
            })
          ) : (
            <div className="no-videos">"No videos to show"</div>
          )}
        </div>
      }
    </div>
  );
};
