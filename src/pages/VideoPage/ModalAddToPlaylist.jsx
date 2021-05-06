import { useState } from 'react';
import faker from 'faker';
import { IoIosCloseCircle } from 'react-icons/io';
import { MdPlaylistAdd } from 'react-icons/md';
import { BtnIcon, Btn } from '../../components/morphine-ui';
import { useLibraryContext } from '../../context/libraryState';
import { AddToPlaylistBtn } from './AddToPlaylistBtn';

export const ModalAddToPlaylist = ({
  desiredVideoId,
  showModal,
  setShowModal,
}) => {
  const {
    state: { playlists, videos },
    dispatch: playlistDispatch,
  } = useLibraryContext();
  const [newPlaylistName, setNewPlaylistName] = useState('');

  return (
    <dvi className="flex flex--column align-items--c justify-content--c">
      <div
        style={{
          display: showModal ? 'block' : 'none',
          height: '200vh',
          width: '100vw',
          opacity: '0.6',
          backgroundColor: 'black',
          position: 'absolute',
          zIndex: '8999', // with respect to modal
          overflow: 'hidden',
        }}></div>
      <div
        style={{
          display: showModal ? 'block' : 'none',
          borderRadius: 'var(--space-sm)',
          backgroundColor: 'var(--themeSecondary)',
          height: 'auto',
          width: 'auto',
          margin: 'var(--space-sm)',
          position: 'absolute',
          top: '20vh',
          zIndex: '9000',
        }}>
        {/* <div>{JSON.stringify(playlists)}</div> */}
        <BtnIcon
          btnSize="lg"
          styleProp={{
            position: 'absolute',
            right: 0,
          }}
          handleOnClickProp={() => setShowModal(false)}>
          <IoIosCloseCircle className="text--xl" />
        </BtnIcon>
        <div
          style={{
            borderBottom: '2px solid var(--grey-500)',
            padding: 'var(--space-sm)',
            fontWeight: '500',
          }}>
          Add To Playlist
        </div>
        <div
          style={{
            borderBottom: '2px solid var(--grey-500)',
            padding: 'var(--space-lg)',
          }}>
          {playlists.length < 1 && 'No Playlists available'}
          <ul>
            {playlists &&
              // loop over playlists
              playlists.map((playlistObj) => {
                return (
                  <div
                    key={playlistObj.id}
                    className="flex align-items--c justify-content--sb gap--sm">
                    <div>{playlistObj.name}</div>
                    <AddToPlaylistBtn
                      btnSize="lg"
                      // check if desiredVideo is present in any playlistObj
                      isVideoInGivenPlaylist={playlistObj.videos.find(
                        (playlistVideoId) => playlistVideoId === desiredVideoId
                      )}
                      //WORKING
                      handleAddToDesiredPlaylist={() => {
                        playlistDispatch({
                          type: 'ADD_VIDEO_TO_PLAYLIST',
                          payload: {
                            desiredVideoId,
                            desiredPlaylistId: playlistObj.id,
                          },
                        });
                      }}
                      handleRemoveFromDesiredPlaylist={() => {
                        playlistDispatch({
                          type: 'REMOVE_VIDEO_FROM_PLAYLIST',
                          payload: {
                            desiredVideoId,
                            desiredPlaylistId: playlistObj.id,
                          },
                        });
                      }}
                    />
                  </div>
                );
              })}
          </ul>
        </div>
        <div
          className="flex align-items--c justify-content--c gap--sm"
          style={{
            padding: 'var(--space-sm)',
          }}>
          <Btn
            variant="primary"
            shape="rounded"
            btnSize="xs"
            // Creates a new Playlist
            handleOnClickProp={() => {
              newPlaylistName !== '' &&
                playlistDispatch({
                  type: 'CREATE_NEW_PLAYLIST',
                  payload: {
                    id: faker.datatype.uuid(),
                    name: newPlaylistName,
                    videos: [],
                  },
                });
              setNewPlaylistName('');
            }}>
            Create New Playlist
          </Btn>
          <input
            placeholder="dope videos"
            style={{
              borderRadius: '4px',
              padding: 'var(--space-xxs)',
              border: '4px',
            }}
            value={newPlaylistName}
            onChange={(e) => {
              e.target.value && setNewPlaylistName(e.target.value);
            }}
          />
        </div>
      </div>
    </dvi>
  );
};
