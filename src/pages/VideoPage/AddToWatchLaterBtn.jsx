import { BtnIcon } from '../../components/morphine-ui';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';
import { AiOutlineClockCircle, AiFillClockCircle } from 'react-icons/ai';

export const AddToWatchLaterBtn = ({
  btnSize,
  styleProp,
  classNameProp,
  isVideoAddedToWatchLater,
  handleAddToWatchLater,
  handleRemoveFromWatchLater,
}) => {
  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {isVideoAddedToWatchLater ? (
        <BtnIcon
          styleProp={{ color: 'var(--themePrimary)', ...styleProp }}
          classNameProp={`${classNameProp}`}
          btnSize={btnSize}
          variant="rounded"
          handleOnClickProp={handleRemoveFromWatchLater}>
          <AiFillClockCircle className="text--lg" />
        </BtnIcon>
      ) : (
        <BtnIcon
          styleProp={{ color: 'var(--grey-400)', ...styleProp }}
          classNameProp={`${classNameProp}`}
          btnSize={btnSize}
          variant="rounded"
          handleOnClickProp={handleAddToWatchLater}>
          <AiOutlineClockCircle className="text--lg" />
        </BtnIcon>
      )}
      <div className="text--xs font-weight--500">
        {!isVideoAddedToWatchLater ? `Add` : 'Added'}
      </div>
    </div>
  );
};
