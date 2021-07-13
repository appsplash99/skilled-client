import { useLibraryContext } from "../../context/libraryState";
import { Btn, BtnIcon } from "morphine-ui";
import { IoIosCloseCircle } from "react-icons/io";
import { deletePlaylistFromDb } from "../../utils/serverRequests";
import { toggleToast } from "../../utils/cutomToastStyles";
import { useToast } from "../../context/toastState";
import { BASE_URL } from "../../utils/apiRoutes";
import { getLocalCredentials } from "../../utils/localStorage";
import { Link } from "react-router-dom";
import { toUrlFriendly } from "../../utils/utils";

export const Playlists = () => {
  const {
    state: { playlists },
    dispatch,
  } = useLibraryContext();
  const { toast } = useToast();
  const { token } = getLocalCredentials();

  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {!playlists | (playlists.length < 1) && <div>why so empty....</div>}
      {playlists &&
        playlists.map((playlistObj, index) => (
          <div
            key={index}
            className="flex flex--column align-items--c justify-content--c gap p--xl m--xxs bg--secondary border-radius--md"
            style={{ position: "relative" }}
          >
            <div className="cursor--pointer">
              <h1 className="font-weight--600 ">
                <Link to={`/playlist/${toUrlFriendly(playlistObj.name)}/${playlistObj._id}`}>{playlistObj.name}</Link>
              </h1>
              {index > 2 && (
                <div>
                  <BtnIcon
                    size="lg"
                    variant="error"
                    style={{ position: "absolute", top: "0.5rem", right: "0.5rem" }}
                    onClick={async () => {
                      toggleToast(toast, "info", "Removing Playlist...");
                      try {
                        const { data } = await deletePlaylistFromDb({
                          token,
                          url: `${BASE_URL}/playlist/${playlistObj._id}`,
                          headers: { authorizaton: token },
                        });
                        if (data.success) {
                          dispatch({ type: "DELETE_PLAYLIST", payload: data.response });
                          toggleToast(toast, "success", "Successfully deleted Playlist");
                        }
                      } catch (error) {
                        toggleToast(toast, "error", "Unable to delete Playlist");
                      }
                    }}
                  >
                    <IoIosCloseCircle className="text--xl text--danger m0" />
                  </BtnIcon>
                </div>
              )}
            </div>
            {/* <div>{JSON.stringify(playlistObj.videos)}</div> */}
          </div>
        ))}
    </div>
  );
};
