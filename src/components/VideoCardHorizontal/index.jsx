import { BASE_URL } from "../../utils/apiRoutes";
import { DataBadgeIcon } from "morphine-ui";
import { BsTrashFill } from "react-icons/bs";
import { useLibraryContext } from "../../context/libraryState";
import { Link } from "react-router-dom";
import { getLocalCredentials } from "../../utils/localStorage";
import { deleteVideoFromPlaylist } from "../../utils/serverRequests";

export const VideoCardHorizontal = ({ video, playlistId, playlistName, videoObj }) => {
  const { videoId, title, channelTitle } = video;
  const { dispatch } = useLibraryContext();
  const { token } = getLocalCredentials();
  return (
    <div
      className="flex flex--column gap border-radius--sm p"
      style={{ maxWidth: "25rem", margin: "0 auto", border: "0.2rem solid black" }}
    >
      <Link to={`/videos/${videoObj._id}`}>
        <img src={`https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`} alt={title} />
      </Link>
      <div className="">
        <div className="details__title">{title}</div>
        <div className="details__channeltitle">{channelTitle}</div>
      </div>
      <DataBadgeIcon
        size="xl"
        variant="error"
        shape="circular"
        icon={
          <BsTrashFill
            className="text--xl text--danger"
            onClick={() =>
              deleteVideoFromPlaylist({
                url: `${BASE_URL}/playlist/${playlistId}/${video._id}`,
                dispatch,
                token,
              })
            }
          />
        }
      ></DataBadgeIcon>
    </div>
  );
};
