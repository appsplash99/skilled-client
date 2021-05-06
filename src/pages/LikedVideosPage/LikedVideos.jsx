import { useLibraryContext } from '../../context/libraryState';
import { Link } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BtnIcon } from '../../components/morphine-ui';

export const LikedVideosPage = () => {
  const {
    state: { likedVideos },
    dispatch,
  } = useLibraryContext();
  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {!likedVideos && <div>why so empty....</div>}
      {likedVideos &&
        likedVideos.map((videoId) => (
          <div
            className="flex align-items--c gap p--xxs m--xxs p--xs bg--secondary border-radius--md"
            key={videoId}>
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
                btnSize="lg"
                handleOnClickProp={() =>
                  dispatch({
                    type: 'REMOVE_VIDEO_FROM_LIKED_VIDEOS',
                    payload: videoId,
                  })
                }>
                <FaRegTrashAlt className="text--xl text--danger m0" />
              </BtnIcon>
            </div>
          </div>
        ))}
    </div>
  );
};
