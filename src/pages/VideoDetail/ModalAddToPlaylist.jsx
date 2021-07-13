import { useState } from "react";
import faker from "faker";
import { IoIosCloseCircle } from "react-icons/io";
import { MdPlaylistAdd } from "react-icons/md";
import { BtnIcon, Btn } from "morphine-ui";
import { useLibraryContext } from "../../context/libraryState";
import { AddToPlaylistBtn } from "./AddToPlaylistBtn";
import { useToast } from "../../context/toastState";
import { addVideoToPlaylistDb, removeVideoFromPlaylistDb } from "../../utils/serverRequests";
import { BASE_URL } from "../../utils/apiRoutes";
import { getLocalCredentials } from "../../utils/localStorage";
import { isVideoIdPresentInAnyPlaylists, isVideoInPlaylist } from "../../utils/array-functions";

export const ModalAddToPlaylist = ({ desiredVideoId, showModal, setShowModal }) => {
  const {
    state: { playlists, videos },
    dispatch: playlistDispatch,
  } = useLibraryContext();
  const { toast, toggleToast } = useToast();
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const { token } = getLocalCredentials();
  console.log({ playlists });

  const playlistsContainTheVideo = playlists.filter((playlistObj) =>
    playlistObj.videos.find((videoObj) => videoObj._id === desiredVideoId)
  );

  console.log(playlistsContainTheVideo);

  return (
    <dvi className="flex flex--column align-items--c justify-content--c">
      <div
        style={{
          display: showModal ? "block" : "none",
          height: "200vh",
          width: "100vw",
          opacity: "0.6",
          backgroundColor: "black",
          position: "absolute",
          zIndex: "8999", // with respect to modal
          overflow: "hidden",
        }}
      ></div>
      <div
        style={{
          display: showModal ? "block" : "none",
          borderRadius: "var(--space-sm)",
          backgroundColor: "var(--themeSecondary)",
          height: "auto",
          width: "auto",
          margin: "var(--space-sm)",
          position: "absolute",
          top: "20vh",
          zIndex: "9000",
        }}
      >
        {/* <div>{JSON.stringify(playlists)}</div> */}
        <BtnIcon
          size="lg"
          style={{
            position: "absolute",
            right: 0,
          }}
          onClick={() => setShowModal(false)}
        >
          <IoIosCloseCircle className="text--xl" />
        </BtnIcon>
        <div
          style={{
            borderBottom: "2px solid var(--grey-500)",
            padding: "var(--space-sm)",
            fontWeight: "500",
          }}
        >
          Add To Playlist
        </div>
        <div
          style={{
            borderBottom: "2px solid var(--grey-500)",
            padding: "var(--space-lg)",
          }}
        >
          {playlists.length < 1 && "No Playlists available"}
          <ul>
            {playlists &&
              // loop over playlists
              playlists.map((playlistObj) => {
                return (
                  <div key={playlistObj._id} className="flex align-items--c justify-content--sb gap--sm">
                    <div>{playlistObj.name}</div>
                    <AddToPlaylistBtn
                      size="lg"
                      // check if desiredVideo is present in any playlistObj
                      isVideoInGivenPlaylist={isVideoInPlaylist({
                        userPlaylists: playlists,
                        playlistId: playlistObj._id,
                        videoId: desiredVideoId,
                      })}
                      // TODO: WRAP ALL(ACROSS-APP) REQUEST HANDLERS IN TRY CATCH and abstract them in a function
                      handleAddToDesiredPlaylist={async () => {
                        toggleToast(toast, "info", `Adding to ${playlistObj.name}...`);
                        const {
                          data: { success, response },
                        } = await addVideoToPlaylistDb({
                          url: `${BASE_URL}/playlist/${playlistObj._id}/${desiredVideoId}`,
                          toast,
                          token,
                          dispatch: playlistDispatch,
                        });

                        if (success) {
                          toggleToast(toast, "success", `Added to ${playlistObj.name}...`);
                          playlistDispatch({ type: "LOAD_VIDEOS_OF_A_PLAYLIST", payload: response });
                        }
                      }}
                      handleRemoveFromDesiredPlaylist={async () => {
                        toggleToast(toast, "info", `Removing from ${playlistObj.name}...`);
                        const {
                          data: { success, response },
                        } = await removeVideoFromPlaylistDb({
                          url: `${BASE_URL}/playlist/${playlistObj._id}/${desiredVideoId}`,
                          toast,
                          token,
                          dispatch: playlistDispatch,
                        });

                        if (success) {
                          toggleToast(toast, "success", `Removed from ${playlistObj.name}...`);
                          playlistDispatch({ type: "LOAD_VIDEOS_OF_A_PLAYLIST", payload: response });
                        }
                      }}
                    />
                  </div>
                );
              })}
          </ul>
        </div>
        <div
          className="flex align-items--c justify-content--c gap--sm"
          style={{
            padding: "var(--space-sm)",
          }}
        >
          <input
            placeholder="dope videos"
            style={{
              borderRadius: "4px",
              padding: "var(--space-xxs)",
              border: "4px",
            }}
            value={newPlaylistName}
            onChange={(e) => {
              e.target.value && setNewPlaylistName(e.target.value);
            }}
          />
          <Btn
            variant="primary"
            shape="rounded"
            size="xs"
            // Creates a new Playlist
            onClick={() => {
              newPlaylistName !== "" &&
                playlistDispatch({
                  type: "CREATE_NEW_PLAYLIST",
                  payload: {
                    id: faker.datatype.uuid(),
                    name: newPlaylistName,
                    videos: [],
                  },
                });
              setNewPlaylistName("");
            }}
          >
            Create New Playlist
          </Btn>
        </div>
      </div>
    </dvi>
  );
};