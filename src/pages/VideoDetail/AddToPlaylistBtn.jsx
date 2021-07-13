import { BtnIcon } from "morphine-ui";
import { MdPlaylistAdd, MdPlaylistAddCheck } from "react-icons/md";

export const AddToPlaylistBtn = ({
  size,
  style,
  className,
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
        <BtnIcon style={style} className={`${className}`} size={size} onClick={handleRemoveFromDesiredPlaylist}>
          <MdPlaylistAddCheck className="text--lg" />
        </BtnIcon>
      ) : (
        <BtnIcon style={style} className={`${className}`} size={size} onClick={handleAddToDesiredPlaylist}>
          <MdPlaylistAdd className="text--lg" />
        </BtnIcon>
      )}
    </>
  );
};
