import { BtnIcon } from "morphine-ui";
import { AiOutlineClockCircle, AiFillClockCircle } from "react-icons/ai";

export const AddToWatchLaterBtn = ({
  size,
  style,
  className,
  isVideoAddedToWatchLater,
  handleAddToWatchLater,
  handleRemoveFromWatchLater,
}) => {
  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {isVideoAddedToWatchLater ? (
        <BtnIcon
          style={{ color: "var(--themePrimary)", ...style }}
          className={`${className}`}
          size={size}
          onClick={handleRemoveFromWatchLater}
        >
          <AiFillClockCircle className="text--lg" />
        </BtnIcon>
      ) : (
        <BtnIcon
          style={{ color: "var(--grey-400)", ...style }}
          className={`${className}`}
          size={size}
          onClick={handleAddToWatchLater}
        >
          <AiOutlineClockCircle className="text--lg" />
        </BtnIcon>
      )}
      <p className="text--xs font-weight--500 align-self--c pt--xxs">
        {!isVideoAddedToWatchLater ? "WATCH LATER" : "Added"}
      </p>
    </div>
  );
};
