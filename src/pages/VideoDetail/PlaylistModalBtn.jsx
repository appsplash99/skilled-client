import { BtnIcon } from "morphine-ui";
import { MdPlaylistAddCheck, MdPlaylistAdd } from "react-icons/md";

export const PlaylistModalBtn = ({ size, style, className, isVideoAddedInPlaylist, handleShowHideModal }) => {
  return (
    <div className="flex flex--column align-items--c justify-content--c">
      <BtnIcon
        style={{
          color: isVideoAddedInPlaylist ? "var(--themePrimary)" : "var(--grey-400)",
          ...style,
        }}
        className={`${className}`}
        size={size}
        variant="rounded"
        onClick={handleShowHideModal}
      >
        {isVideoAddedInPlaylist ? <MdPlaylistAddCheck className="text--lg" /> : <MdPlaylistAdd className="text--lg" />}
      </BtnIcon>
      <div className="text--xs font-weight--500">{!isVideoAddedInPlaylist ? `Playlists` : "Added"}</div>
    </div>
  );
};
