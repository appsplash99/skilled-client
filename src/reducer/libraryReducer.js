import { Action } from "history";

// TODO: REMOVE UNWANTED REDUCERS
/**
 *  TODO: WATCH LATER and LIKED VIDEO ACTIONS NEED TO BE CHANGED:
 *  AS, their respective states(likedVideos, watchLater),
 *  won't be there in libraryState
 * */

export const playlistActions = {
  LOAD_ALL_PLAYLISTS: "LOAD_ALL_PLAYLISTS",
  CREATE_NEW_PLAYLIST: "CREATE_NEW_PLAYLIST",
  UPDATE_PLAYLIST: "UPDATE_PLAYLIST",
  DELETE_PLAYLIST: "DELETE_PLAYLIST",
  LOAD_LIKED_VIDEOS_IN_PLAYLIST: "LOAD_LIKED_VIDEOS_IN_PLAYLIST",
  // LOAD_WATCH_LATER_VIDEOS_IN_PLAYLIST: "LOAD_WATCH_LATER_VIDEOS_IN_PLAYLIST",
  LOAD_VIDEOS_OF_A_PLAYLIST: "LOAD_VIDEOS_OF_A_PLAYLIST",
};

export const videoActions = {
  LOAD_VIDEOS: "LOAD_VIDEOS",
  ADD_VIDEO_TO_PLAYLIST: "ADD_VIDEO_TO_PLAYLIST",
  REMOVE_VIDEO_FROM_PLAYLIST: "REMOVE_VIDEO_FROM_PLAYLIST",
};

// TODO: Remove below acrions and cases
// export const watchLaterActions = {
//   ADD_VIDEO_TO_WATCH_LATER: "ADD_VIDEO_TO_WATCH_LATER",
//   REMOVE_VIDEO_FROM_WATCH_LATER: "REMOVE_VIDEO_FROM_WATCH_LATER",
// };

// TODO: Remove below acrions and cases
// export const likedVideosActions = {
//   ADD_VIDEO_TO_LIKED_VIDEOS: "ADD_VIDEO_TO_LIKED_VIDEOS",
//   REMOVE_VIDEO_FROM_LIKED_VIDEOS: "REMOVE_VIDEO_FROM_LIKED_VIDEOS",
//   TOGGLE_LIKED_VIDEO: "TOGGLE_LIKED_VIDEO",
// };

export const libraryReducer = (prevState, { type, payload }) => {
  switch (type) {
    case "LOAD_CATEGORIES":
      // TODO: to add categories functionality:
      // map over prevState.videos and seperate different categories
      return { ...prevState, categories: payload };

    case playlistActions.CREATE_NEW_PLAYLIST: {
      console.log("added new playlist");
      return {
        ...prevState,
        playlists: prevState.playlists.concat(payload),
      };
    }
    case playlistActions.UPDATE_PLAYLIST: {
      return {
        ...prevState,
        playlists: prevState.playlists.map((item) => (item.id !== payload.id ? item : payload)),
      };
    }
    case playlistActions.DELETE_PLAYLIST: {
      console.log("deleted playlist");
      return {
        ...prevState,
        playlists: prevState.playlists.filter((playlist) => playlist.id !== payload),
      };
    }
    case videoActions.ADD_VIDEO_TO_PLAYLIST: {
      console.log("Added DesiredVideo to Selected Playlist");
      return {
        ...prevState,
        playlists: prevState.playlists.map((playlistObj) =>
          playlistObj.id !== payload.desiredPlaylistId
            ? // when playlist do not match
              playlistObj
            : // return playlist object with added videoId
              {
                ...playlistObj,
                // return new videos list with unique elements
                videos: [...new Set(playlistObj.videos.concat(payload.desiredVideoId))],
              }
        ),
      };
    }
    case videoActions.REMOVE_VIDEO_FROM_PLAYLIST:
      console.log("Removed DesiredVideo from selected playlist");
      return {
        ...prevState,
        playlists: prevState.playlists.map((playlistObj) =>
          playlistObj.id !== payload.desiredPlaylistId
            ? // when playlist do not match
              playlistObj
            : {
                ...playlistObj,
                // return all videos except the desiredVideo
                videos: playlistObj.videos.filter((video) => video !== payload.desiredVideoId),
              }
        ),
      };

    // case watchLaterActions.ADD_VIDEO_TO_WATCH_LATER:
    //   return {
    //     ...prevState,
    //     watchLater: [...new Set(prevState.watchLater.concat(payload))],
    //   };

    // case watchLaterActions.REMOVE_VIDEO_FROM_WATCH_LATER:
    //   return {
    //     ...prevState,
    //     watchLater: prevState.watchLater.filter((video) => video !== payload),
    //   };

    // case likedVideosActions.ADD_VIDEO_TO_LIKED_VIDEOS:
    //   console.log("video added to liked videos");
    //   return {
    //     ...prevState,
    //     likedVideos: [...new Set(prevState.likedVideos.concat(payload))],
    //   };

    // case likedVideosActions.REMOVE_VIDEO_FROM_LIKED_VIDEOS:
    //   return {
    //     ...prevState,
    //     likedVideos: prevState.likedVideos.filter((video) => video !== payload),
    //   };

    /** ====================== */
    /** NEW ACTIONS ===========*/
    /** ====================== */

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
