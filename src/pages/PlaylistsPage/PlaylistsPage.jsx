import { useLibraryContext } from '../../context/libraryState';
import { Btn, BtnIcon } from '../../components/morphine-ui';
import { IoIosCloseCircle } from 'react-icons/io';

export const PlaylistsPage = () => {
  const {
    state: { playlists },
    dispatch,
  } = useLibraryContext();

  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {!playlists && <div>why so empty....</div>}
      {playlists &&
        playlists.map((playlistObj) => (
          <div
            className="flex align-items--c gap p--xxs m--xxs bg--secondary border-radius--md"
            key={playlistObj.id}>
            <div className="font-weight--600 text--sm">{playlistObj.name}</div>
            <div>
              <BtnIcon
                variant="error"
                btnSize="lg"
                handleOnClickProp={() =>
                  dispatch({
                    type: 'DELETE_PLAYLIST',
                    payload: playlistObj.id,
                  })
                }>
                <IoIosCloseCircle className="text--xl text--danger m0" />
              </BtnIcon>
            </div>
          </div>
        ))}
    </div>
  );
};
