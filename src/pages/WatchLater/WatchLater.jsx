import { useLibraryContext } from "../../context/libraryState";
import { Link } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import { BtnIcon } from "morphine-ui";

export const WatchLater = () => {
  const {
    state: { playlists },
  } = useLibraryContext();

  const watchLater = playlists.filter((playlistObj) => playlistObj.name === "Watch Later")[0].videos;

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
                // onClick={() =>
                //  { dispatch({
                //     type: "REMOVE_VIDEO_FROM_LIKED_VIDEOS",
                //     payload: videoObj.videoId,
                //   })}
                // }
              >
                <FaRegTrashAlt className="text--xl text--danger m0" />
              </BtnIcon>
            </div>
          </div>
        ))}
    </div>
  );
};
