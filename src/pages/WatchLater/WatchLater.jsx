import { useLibraryContext } from "../../context/libraryState";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { BtnIcon } from "morphine-ui";
import { getIdOfAPlaylist } from "../../utils/array-functions";
import { getLocalCredentials } from "../../utils/localStorage";
import { deleteVideoFromPlaylist } from "../../utils/serverRequests";
import { BASE_URL } from "../../utils/apiRoutes";
import { EmptyPlaylistComponent } from "../../components/EmptyPlaylistComponent/EmptyPlaylistComponent";

export const WatchLater = () => {
  const {
    state: { playlists },
    dispatch,
  } = useLibraryContext();
  const { token } = getLocalCredentials();

  const watchLater = playlists.filter((playlistObj) => playlistObj.name === "Watch Later")[0].videos;

  const watchLaterPlaylistId = getIdOfAPlaylist(playlists, "Watch Later");

  if (watchLater && watchLater.length === 0) {
    return <EmptyPlaylistComponent videosOf="Watch Later" />;
  }

  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {watchLater &&
        watchLater.map((videoObj) => (
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
                    url: `${BASE_URL}/playlist/${watchLaterPlaylistId}/${videoObj._id}`,
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
