export const playlistActions = {
  LOAD_ALL_PLAYLISTS: "LOAD_ALL_PLAYLISTS",
  CREATE_NEW_PLAYLIST: "CREATE_NEW_PLAYLIST",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
  DELETE_PLAYLIST: "DELETE_PLAYLIST",
  LOAD_LIKED_VIDEOS_IN_PLAYLIST: "LOAD_LIKED_VIDEOS_IN_PLAYLIST",
  LOAD_VIDEOS_OF_A_PLAYLIST: "LOAD_VIDEOS_OF_A_PLAYLIST",
};

export const videoActions = {
  LOAD_VIDEOS: "LOAD_VIDEOS",
};

export const libraryReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "LOAD_CATEGORIES":
      // TODO: to add categories functionality:
      // map over prevState.videos and seperate different categories
      return { ...prevState, categories: payload };

    case playlistActions.DELETE_PLAYLIST: {
      console.log("deleted playlist");
      return {
        ...prevState,
        playlists: prevState.playlists.filter((playlist) => playlist._id !== payload),
      };
    }

    /** VIDEO ACTIONS */
    case videoActions.LOAD_VIDEOS:
      console.log("LOAD_VIDEOS");
      return { ...prevState, videos: payload };

    /** NEW PLAYLIST ACTIONS */
    case playlistActions.LOAD_ALL_PLAYLISTS:
      return { ...prevState, playlists: payload };

    case playlistActions.LOAD_VIDEOS_OF_A_PLAYLIST:
      return {
        ...prevState,
        // replace desired object with payload
        playlists: prevState.playlists.map((playlistObj) => (playlistObj._id === payload._id ? payload : playlistObj)),
      };

    default:
      console.log("this action migh not be present in reducer");
      return prevState;
  }
};
