import axios from "axios";
import { BASE_URL } from "../../utils/apiRoutes";
import { DataBadgeIcon } from "morphine-ui";
import { BsTrashFill } from "react-icons/bs";
import { useLibraryContext } from "../../context/libraryState";
import { useToast } from "../../context/toastState";
import { Link } from "react-router-dom";
import { getLocalCredentials } from "../../utils/localStorage";

export const VideoCardHorizontal = ({ video, playlistId, playlistName, videoObj }) => {
  const { videoId, title, channelTitle } = video;
  const { dispatch } = useLibraryContext();
  const { toggleToast, toast } = useToast();
  const { token } = getLocalCredentials();

  const deleteFromPlaylist = async () => {
    toggleToast(toast, "info", "Removing Video From Playlist...");
    try {
      const {
        data: { success, response },
      } = await axios({
        method: "DELETE",
        url: `${BASE_URL}/playlist/${playlistId}/${video._id}`,
        headers: { authorization: token },
      });
      if (success) {
        dispatch({ type: "LOAD_VIDEOS_OF_A_PLAYLIST", payload: response });
        toggleToast(toast, "success", "Video Removed from Playlist");
      }
    } catch (error) {
      toggleToast(toast, "error", "Unable to Remove VIdeo from Playlist");
    }
  };
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
        icon={<BsTrashFill className="text--xl text--danger" onClick={deleteFromPlaylist} />}
      ></DataBadgeIcon>
    </div>
  );
};
