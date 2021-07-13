import { BtnIcon } from "morphine-ui";
import { RiThumbUpFill, RiThumbUpLine } from "react-icons/ri";

export const LikeVideoBtn = ({
  size,
  numberOfLikes,
  style,
  className,
  isVideoAlreadyLiked,
  handleAddtoLikedVideos,
  handleRemoveFromLikedVideos,
}) => {
  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {isVideoAlreadyLiked ? (
        <BtnIcon
          style={{ color: "var(--themePrimary)", ...style }}
          className={`${className}`}
          size={size}
          variant="rounded"
          onClick={handleRemoveFromLikedVideos}
        >
          <RiThumbUpFill className="text--lg" />
        </BtnIcon>
      ) : (
        <BtnIcon
          style={{ color: "var(--grey-400)", ...style }}
          className={`${className}`}
          size={size}
          variant="rounded"
          onClick={() => {
            console.log("From Add to Liked Videos");
            handleAddtoLikedVideos();
          }}
        >
          <RiThumbUpLine className="text--lg" />
        </BtnIcon>
      )}
      <div className="text--xs font-weight--500">{!isVideoAlreadyLiked ? `${numberOfLikes} Likes` : "Liked"}</div>
    </div>
  );
};
