import { useLibraryContext } from "../../context/libraryState";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { BtnIcon } from "morphine-ui";
import { getIdOfAPlaylist } from "../../utils/array-functions";
import { useToast } from "../../context/toastState";
import { getLocalCredentials } from "../../utils/localStorage";
import { deleteVideoFromPlaylist } from "../../utils/serverRequests";
import { BASE_URL } from "../../utils/apiRoutes";

export const WatchLater = () => {
  const {
    state: { playlists },
    dispatch,
  } = useLibraryContext();
  const { toast } = useToast();
  const { token } = getLocalCredentials();

  const watchLater = playlists.filter((playlistObj) => playlistObj.name === "Watch Later")[0].videos;

  const watchLaterPlaylistId = getIdOfAPlaylist(playlists, "Watch Later");

  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {!watchLater && <div>why so empty....</div>}
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
                    toast,
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
