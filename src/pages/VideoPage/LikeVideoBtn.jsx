import { BtnIcon } from '../../components/morphine-ui';
import { RiThumbUpFill, RiThumbUpLine } from 'react-icons/ri';

export const LikeVideoBtn = ({
  btnSize,
  numberOfLikes,
  styleProp,
  classNameProp,
  isVideoAlreadyLiked,
  handleAddtoLikedVideos,
  handleRemoveFromLikedVideos,
}) => {
  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {isVideoAlreadyLiked ? (
        <BtnIcon
          styleProp={{ color: 'var(--themePrimary)', ...styleProp }}
          classNameProp={`${classNameProp}`}
          btnSize={btnSize}
          variant="rounded"
          handleOnClickProp={handleRemoveFromLikedVideos}>
          <RiThumbUpFill className="text--lg" />
        </BtnIcon>
      ) : (
        <BtnIcon
          styleProp={{ color: 'var(--grey-400)', ...styleProp }}
          classNameProp={`${classNameProp}`}
          btnSize={btnSize}
          variant="rounded"
          handleOnClickProp={handleAddtoLikedVideos}>
          <RiThumbUpLine className="text--lg" />
        </BtnIcon>
      )}
      <div className="text--xs font-weight--500">
        {!isVideoAlreadyLiked ? `${numberOfLikes} Likes` : 'Liked'}
      </div>
    </div>
  );
};
