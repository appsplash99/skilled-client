import { useLibraryContext } from "../../context/libraryState";
import { Btn, BtnIcon } from "morphine-ui";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaPlayCircle, FaRegTrashAlt } from "react-icons/fa";

export const WatchLater = () => {
  const {
    state: { watchLater },
    dispatch,
  } = useLibraryContext();

  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {!watchLater && <div>why so empty....</div>}
      {watchLater &&
        watchLater.map((videoId) => (
          <div className="flex align-items--c gap p--xxs m--xxs p--xs bg--secondary border-radius--md" key={videoId}>
            <div>
              <Link to={`/:${videoId}`}>
                <img
                  alt=""
                  src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                  height="calc(4*var(--space-xl))"
                  width="calc(4*var(--space-xl))"
                  className="border-radius--md"
                />
              </Link>
              <BtnIcon
                variant="error"
                size="lg"
                onClick={() =>
                  dispatch({
                    type: "REMOVE_VIDEO_FROM_WATCH_LATER",
                    payload: videoId,
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
