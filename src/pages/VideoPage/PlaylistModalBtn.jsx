import { BtnIcon } from '../../components/morphine-ui';
import { MdPlaylistAddCheck, MdPlaylistAdd } from 'react-icons/md';

export const PlaylistModalBtn = ({
  btnSize,
  styleProp,
  classNameProp,
  isVideoAddedInPlaylist,
  handleShowHideModal,
}) => {
  return (
    <div className="flex flex--column align-items--c justify-content--c">
      <BtnIcon
        styleProp={{
          color: isVideoAddedInPlaylist
            ? 'var(--themePrimary)'
            : 'var(--grey-400)',
          ...styleProp,
        }}
        classNameProp={`${classNameProp}`}
        btnSize={btnSize}
        variant="rounded"
        handleOnClickProp={handleShowHideModal}>
        {isVideoAddedInPlaylist ? (
          <MdPlaylistAddCheck className="text--lg" />
        ) : (
          <MdPlaylistAdd className="text--lg" />
        )}
      </BtnIcon>
      <div className="text--xs font-weight--500">
        {!isVideoAddedInPlaylist ? `Playlists` : 'Added'}
      </div>
    </div>
  );
};
