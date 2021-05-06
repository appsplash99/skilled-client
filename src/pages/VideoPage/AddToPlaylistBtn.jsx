import { BtnIcon } from '../../components/morphine-ui';
import { MdPlaylistAdd, MdPlaylistAddCheck } from 'react-icons/md';

export const AddToPlaylistBtn = ({
  btnSize,
  styleProp,
  classNameProp,
  // isVideoInPlaylist,
  isVideoInGivenPlaylist,
  handleAddToDesiredPlaylist,
  handleRemoveFromDesiredPlaylist,
}) => {
  /*
  playlistIdWithDesiredVideo = string ("" | "playlistId") 
  */
  return (
    <>
      {isVideoInGivenPlaylist ? (
        <BtnIcon
          styleProp={styleProp}
          classNameProp={`${classNameProp}`}
          btnSize={btnSize}
          handleOnClickProp={handleRemoveFromDesiredPlaylist}>
          <MdPlaylistAddCheck className="text--lg" />
        </BtnIcon>
      ) : (
        <BtnIcon
          styleProp={styleProp}
          classNameProp={`${classNameProp}`}
          btnSize={btnSize}
          handleOnClickProp={handleAddToDesiredPlaylist}>
          <MdPlaylistAdd className="text--lg" />
        </BtnIcon>
      )}
    </>
  );
};
