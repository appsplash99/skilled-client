import { useLibraryContext } from "../../context/libraryState";
import { Btn, BtnIcon } from "morphine-ui";
import { IoIosCloseCircle } from "react-icons/io";

export const Playlists = () => {
  const {
    state: { playlists },
    dispatch,
  } = useLibraryContext();

  return (
    <div className="flex flex--column align-items--c justify-content--c">
      {!playlists && <div>why so empty....</div>}
      {playlists &&
        playlists.map((playlistObj, index) => (
          <div
            key={index}
            className="flex flex--column align-items--c justify-content--c gap p--xxs m--xxs bg--secondary border-radius--md"
            // style={{ minHeight: "10rem", minWidth: "25rem" }}
          >
            <div style={{ backgroundColor: "lightgreen" }}>
              <div className="font-weight--600 text--sm">{playlistObj.name}</div>
              <div>
                <BtnIcon
                  size="lg"
                  variant="error"
                  onClick={() => dispatch({ type: "DELETE_PLAYLIST", payload: playlistObj.id })}
                >
                  <IoIosCloseCircle className="text--xl text--danger m0" />
                </BtnIcon>
              </div>
            </div>
            <div>{JSON.stringify(playlistObj.videos)}</div>
          </div>
        ))}
    </div>
  );
};
