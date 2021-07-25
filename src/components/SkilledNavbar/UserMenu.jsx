import React from "react";
import { BtnInverted, Btn, DataBadgeIcon } from "morphine-ui";
import { BsBookmarkFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { RiPlayList2Fill, RiLogoutCircleRFill } from "react-icons/ri";
import { MdWatchLater } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { useLibraryContext } from "../../context/libraryState";
import { getLocalCredentials, removeLocalCredentials } from "../../utils/localStorage";
import "./UserMenu.css";

export const UserMenu = () => {
  const { token } = getLocalCredentials();
  const navigate = useNavigate();
  const {
    state: { playlists },
    dispatch,
  } = useLibraryContext();

  const logOutHandler = () => {
    dispatch({ type: "LOGOUT_USER" });
    removeLocalCredentials();
    navigate("/");
  };

  if (token) {
    return (
      <>
        <Link className="nav__link text--dark flex align-items--c gap" to="/playlist">
          <DataBadgeIcon
            iconstyle={{
              backgroundColor: "inherit",
              margin: 0,
            }}
            data={playlists.length}
            variant="square"
            icon={<RiPlayList2Fill className="text--xxl" />}
          ></DataBadgeIcon>
          <h3 className="non-desktop-title">Playlists</h3>
        </Link>
        <Link className="nav__link text--dark flex align-items--c gap" to="/watch-later">
          <DataBadgeIcon
            iconstyle={{
              backgroundColor: "inherit",
              margin: 0,
            }}
            data={
              playlists
                ? playlists && playlists?.find((playlistObj) => playlistObj.name === "Watch Later")?.videos?.length
                : 0
            }
            variant="square"
            icon={<MdWatchLater className="text--xxl" />}
          ></DataBadgeIcon>
          <h3 className="non-desktop-title">Watch Later</h3>
        </Link>
        <Link className="nav__link text--dark flex align-items--c gap" to="/liked-videos">
          <DataBadgeIcon
            iconstyle={{
              backgroundColor: "inherit",
              margin: 0,
            }}
            data={playlists ? playlists?.find((playlistObj) => playlistObj.name === "Liked Videos")?.videos?.length : 0}
            variant="square"
            icon={<AiFillLike className="text--xxl" />}
          ></DataBadgeIcon>
          <h3 className="non-desktop-title">Liked Videos</h3>
        </Link>
        <Link className="nav__link text--dark flex align-items--c gap" to="/saved-videos">
          <DataBadgeIcon
            iconstyle={{
              backgroundColor: "inherit",
              margin: 0,
            }}
            data={playlists ? playlists?.find((playlistObj) => playlistObj.name === "Saved Videos")?.videos?.length : 0}
            variant="square"
            icon={<BsBookmarkFill className="text--xxl" />}
          ></DataBadgeIcon>
          <h3 className="non-desktop-title">Saved Videos</h3>
        </Link>
        <Link className="nav__link text--dark flex align-items--c gap" to="/">
          <DataBadgeIcon
            iconstyle={{
              backgroundColor: "inherit",
              margin: 0,
            }}
            data={0}
            variant="square"
            icon={<RiLogoutCircleRFill className="text--xxl" onClick={logOutHandler} />}
          ></DataBadgeIcon>
          <h3 className="non-desktop-title">Log Out</h3>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to="/login">
        <BtnInverted
          shape="rounded"
          variant="primary"
          size="sm"
          style={{
            padding: "var(--space-xxxs) var(--space-md)",
            fontWeight: "500",
            border: "2px solid var(--themePrimary)",
          }}
        >
          Login
        </BtnInverted>
      </Link>
      <Link to="/signup">
        <Btn
          variant="primary"
          size="sm"
          style={{
            padding: "var(--space-xxxs) var(--space-md)",
            fontWeight: "500",
            border: "2px solid var(--themePrimary)",
          }}
        >
          SignUp
        </Btn>
      </Link>
    </>
  );
};
