import { FaRegCalendar, FaRegClock } from 'react-icons/fa';

export const VideoCard = ({
  title,
  videoId,
  size,
  isPlaylistItem,
  thumbnail,
  length,
  description,
  date,
  playNowBtn,
}) => {
  return (
    <div
      className="video-card flex flex--column align-items--c justify-content--c p--sm gap--sm border-radius--sm"
      style={{ backgroundColor: 'var(--grey-200)' }}>
      <img
        alt=""
        clasName="video-card__iframe border-radius--sm"
        width="200"
        height="112"
        src={`${thumbnail}`}
        style={{ borderRadius: '15px' }}
      />
      <div className="flex flex--column gap--sm">
        <div className="flex flex--column align-items--fs gap--xs">
          <div
            className="text--sm font-weight--600"
            style={{
              color: 'var(--grey-800)',
              whiteSpace: 'nowrap',
              width: '180px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {title}
          </div>
          <div
            className="text--xxs text-align--l"
            style={{
              color: 'var(--grey-800)',
              whiteSpace: 'nowrap',
              width: '150px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
            {description}
          </div>
          <div className="flex align-items--c gap--xxs">
            <FaRegCalendar className="text--md" />
            <div className="text--sm">{date}</div>
          </div>
          <div className="flex align-items--c gap--xxs">
            <FaRegClock className="text--md" />
            <div className="text--sm">
              {`${length.minutes}:${length.seconds}`}
            </div>
          </div>
        </div>
        <div className="flex align-items--c justify-content--se gap--sm">
          {playNowBtn}
        </div>
      </div>
    </div>
  );
};
