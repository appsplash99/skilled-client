import { BtnIcon } from "morphine-ui";
import { BsBookmarkPlus, BsBookmarkFill } from "react-icons/bs";

// TODO: ADD RESTAPI HANDLERS
export const SaveVideoBtn = ({
  size,
  style,
  className,
  isVideoAddedToSavedVideos,
  handleAddToSavedVideos,
  handleRemoveFromSavedVideos,
}) => {
  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {isVideoAddedToSavedVideos ? (
        <BtnIcon
          style={{ color: "var(--themePrimary)", ...style }}
          className={`${className}`}
          size={size}
          variant="rounded"
          onClick={handleRemoveFromSavedVideos}
        >
          <BsBookmarkFill className="text--lg" />
        </BtnIcon>
      ) : (
        <BtnIcon
          style={{ color: "var(--grey-400)", ...style }}
          className={`${className}`}
          size={size}
          variant="rounded"
          onClick={handleAddToSavedVideos}
        >
          <BsBookmarkPlus className="text--lg" />
        </BtnIcon>
      )}
      <p className="text--xs font-weight--500 align-self--c">
        {!isVideoAddedToSavedVideos ? "Save Video" : "VIdeo Saved"}
      </p>
    </div>
  );
};
