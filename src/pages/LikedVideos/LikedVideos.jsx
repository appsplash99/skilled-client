import { useLibraryContext } from "../../context/libraryState";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { BtnIcon } from "morphine-ui";
import { BASE_URL } from "../../utils/apiRoutes";
import { getLocalCredentials } from "../../utils/localStorage";
import { getIdOfAPlaylist } from "../../utils/array-functions";
import { deleteVideoFromPlaylist } from "../../utils/serverRequests";
import { EmptyPlaylistComponent } from "../../components";

export const LikedVideos = () => {
  const {
    state: { playlists },
    dispatch,
  } = useLibraryContext();
  const { token } = getLocalCredentials();

  const likedVideos = playlists.filter((playlistObj) => playlistObj.name === "Liked Videos")[0].videos;

  const likedVideosPlaylistId = getIdOfAPlaylist(playlists, "Liked Videos");

  if (likedVideos && likedVideos.length === 0) {
    return <EmptyPlaylistComponent videosOf="Liked Videos" />;
  }

  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {likedVideos &&
        likedVideos.map((videoObj) => (
          <div
            className="flex align-items--c gap p--xxs m--xxs p--xs bg--secondary border-radius--md"
            key={videoObj._id}
          >
            <div>
              <Link to={`/videos/${videoObj._id}`}>
                <img
                  alt=""
                  src={videoObj.video.thumbnail}
                  height="calc(4*var(--space-xl))"
                  width="calc(4*var(--space-xl))"
                  className="border-radius--md"
                />
              </Link>
              <BtnIcon
                variant="error"
                size="lg"
                onClick={() =>
                  deleteVideoFromPlaylist({
                    url: `${BASE_URL}/playlist/${likedVideosPlaylistId}/${videoObj._id}`,
                    dispatch,
                    token,
                  })
                }
              >
                <FaRegTrashAlt className="text--xl text--danger m0" />
              </BtnIcon>
            </div>
          </div>
        ))}
    </div>
  );
};
