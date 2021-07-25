/**
 * TODO:
 *  1. seperate actions
 *  2. remove unwanted actions and reducers
 *  */
export const playlistActions = {
  LOAD_ALL_PLAYLISTS: "LOAD_ALL_PLAYLISTS",
  CREATE_NEW_PLAYLIST: "CREATE_NEW_PLAYLIST",
  CONCAT_CREATED_PLAYLIST: "CONCAT_CREATED_PLAYLIST",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
  DELETE_PLAYLIST: "DELETE_PLAYLIST",
  LOAD_LIKED_VIDEOS_IN_PLAYLIST: "LOAD_LIKED_VIDEOS_IN_PLAYLIST",
  LOAD_VIDEOS_OF_A_PLAYLIST: "LOAD_VIDEOS_OF_A_PLAYLIST",
};

export const videoActions = {
  LOAD_VIDEOS: "LOAD_VIDEOS",
};

export const userActions = {
  LOGOUT_USER: "LOGOUT_USER",
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

    case playlistActions.CONCAT_CREATED_PLAYLIST:
      return {
        ...prevState,
        // add created playlist in context
        playlists: prevState.playlists.concat(payload),
      };

    case playlistActions.LOAD_VIDEOS_OF_A_PLAYLIST:
      return {
        ...prevState,
        // replace desired object with payload
        playlists: prevState.playlists.map((playlistObj) => (playlistObj._id === payload._id ? payload : playlistObj)),
      };

    case userActions.LOGOUT_USER:
      return { ...prevState, videos: [], playlists: [], categories: [] };

    default:
      console.log("this action migh not be present in reducer");
      return prevState;
  }
};
