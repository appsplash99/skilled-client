import { VIDEOSDATA } from '../../videosDB';
import { VideoCard, BtnInverted } from '../../components/morphine-ui';
import { Link } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';

export const VideoListing = () => {
  return (
    <div className="flex flex--column align-self--c justify-content--c mx text-align--c">
      <div
        style={{
          display: 'grid',
          gridGap: 'var(--space-md)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        }}>
        {VIDEOSDATA.map((videoObj) => {
          return (
            <VideoCard
              date={videoObj.date}
              length={videoObj.length}
              title={videoObj.title}
              description={videoObj.description}
              thumbnail={videoObj.thumbnail}
              playNowBtn={
                <Link to={`/:${videoObj.videoId}`}>
                  <BtnInverted
                    variant="primary"
                    btnSize="sm"
                    styleProp={{
                      border: '2px solid var(--themePrimary)',
                    }}>
                    <div className="flex align-items--c justify-content--sb gap--xxs">
                      <FaPlayCircle className="text--lg" />
                      <div className="text--xxs">Play Now</div>
                    </div>
                  </BtnInverted>
                </Link>
              }
            />
          );
        })}
      </div>
    </div>
  );
};
