import { useParams } from 'react-router-dom';
import { FaRegCalendar, FaThumbsUp, FaRegClock } from 'react-icons/fa';
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/md';
import {
  findItemInArray,
  isVideoIdPresentinArray,
  isVideoIdPresentInAnyPlaylists,
} from '../../utils/array-functions';
import { VIDEOSDATA } from '../../videosDB';
import { BtnIcon } from '../../components/morphine-ui';
import { useWidth } from '../../hooks/useWidth';
import { ModalAddToPlaylist } from './ModalAddToPlaylist';
import { useState } from 'react';
import { CustomVideoIFrame } from './CustomIframe';
import { useLibraryContext } from '../../context/libraryState';
import { LikeVideoBtn } from './LikeVideoBtn';
import { AddToWatchLaterBtn } from './AddToWatchLaterBtn';
import { PlaylistModalBtn } from './PlaylistModalBtn';

export const VideoPage = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    state: { likedVideos, playlists, watchLater },
    dispatch,
  } = useLibraryContext();

  const customIFrameWidth = useWidth();
  const { videoId } = useParams(); // console.log(videoId);
  const correctVideoId = videoId.substring(1);
  const desiredVideo = findItemInArray(VIDEOSDATA, videoId.substring(1)); // console.log(desiredVideo);

  console.log({ playlists, likedVideos, watchLater });

  return (
    <div className="flex flex--column align-items--c justify-content--c mx--md">
      <ModalAddToPlaylist
        desiredVideoId={correctVideoId}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div
        className="flex align-items--c justify-content--c gap--lg"
        style={{ filter: showModal ? 'blur(1px)' : 'blur(0px)' }}>
        <div className="flex flex--column">
          <div>
            <CustomVideoIFrame
              title={desiredVideo.title}
              videoId={correctVideoId}
              currentWindowWidth={customIFrameWidth}
            />
          </div>
        </div>
        <div
          className="flex flex--column align-items--fs justify-content--se gap"
          style={{ height: '100%' }}>
          <div className="flex flex--column align-items--c justify-content--c">
            {/* opens modal */}
            <PlaylistModalBtn
              isVideoAddedInPlaylist={isVideoIdPresentInAnyPlaylists(
                playlists,
                correctVideoId
              )}
              handleShowHideModal={() => setShowModal(true)}
              styleProp={{
                backgroundColor: 'var(--grey-200)',
                height: '3.5rem',
                width: '3.5rem',
              }}
            />
          </div>
          <div className="flex flex--column align-items--c justify-content--c">
            <LikeVideoBtn
              numberOfLikes={desiredVideo.likes}
              isVideoAlreadyLiked={isVideoIdPresentinArray(
                likedVideos,
                correctVideoId
              )}
              handleAddtoLikedVideos={() => {
                dispatch({
                  type: 'ADD_VIDEO_TO_LIKED_VIDEOS',
                  payload: correctVideoId,
                });
              }}
              handleRemoveFromLikedVideos={() =>
                dispatch({
                  type: 'REMOVE_VIDEO_FROM_LIKED_VIDEOS',
                  payload: correctVideoId,
                })
              }
              styleProp={{
                backgroundColor: 'var(--grey-200)',
                height: '3.5rem',
                width: '3.5rem',
              }}
            />
          </div>
          <div className="flex flex--column align-items--c justify-content--c">
            <AddToWatchLaterBtn
              isVideoAddedToWatchLater={isVideoIdPresentinArray(
                watchLater,
                correctVideoId
              )}
              handleAddToWatchLater={() => {
                dispatch({
                  type: 'ADD_VIDEO_TO_WATCH_LATER',
                  payload: correctVideoId,
                });
              }}
              handleRemoveFromWatchLater={() =>
                dispatch({
                  type: 'REMOVE_VIDEO_FROM_WATCH_LATER',
                  payload: correctVideoId,
                })
              }
              styleProp={{
                backgroundColor: 'var(--grey-200)',
                height: '3.5rem',
                width: '3.5rem',
              }}
            />
          </div>
        </div>
      </div>
      <div
        className="flex align-items--c justify-content--c gap--xxs"
        style={{
          borderTop: '2px solid var(--themeSecondary)',
          margin: '0 auto',
        }}>
        <FaRegCalendar className="text--md" />
        <div className="text--sm">{desiredVideo.date}</div>
      </div>
      <div>{desiredVideo.description}</div>
    </div>
  );
};
