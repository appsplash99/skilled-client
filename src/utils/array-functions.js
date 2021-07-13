export const findItemInArray = (itemsArray, currVideo_id) => {
  return itemsArray.find((item) => item._id === currVideo_id);
};

export const isVideoIdPresentinArray = (desiredArray, videoId) => {
  return desiredArray.filter((eachVideoId) => eachVideoId === videoId).length > 0;
};

export const concatNewVideoId = (itemsArray, payloadVideoId) => {
  return itemsArray.concat(payloadVideoId);
};

export const removeExistingVideoIdFromArray = (itemsArray, payloadVideoId) => {
  return itemsArray.filter((videoId) => {
    return videoId !== payloadVideoId;
  });
};

export const isVideoIdPresentInAnyPlaylists = (playlistsArray, videoId) => {
  return playlistsArray.filter((videoObj) => videoObj.videos.find((eachVideoId) => eachVideoId === videoId)).length > 0;
};

export const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

/** NEW ARRAY FUNCTIONS */
export const getIdOfAPlaylist = (myPlaylist, playlistCategory) => {
  return myPlaylist.find((library) => library.name === playlistCategory)?._id;
};

export const isVideoInPlaylist = ({ userPlaylists, playlistId, videoId }) => {
  const currentPlaylist = userPlaylists.find((playlist) => playlist._id === playlistId);
  if (!currentPlaylist) return false;
  const allVideoIDsOfCurrentPlaylist = currentPlaylist.videos.map((video) => video._id);
  return allVideoIDsOfCurrentPlaylist.includes(videoId);
};

export const playlistsContainTheVideo = ({ playlists, video_Id }) =>
  playlists.filter((playlistObj) => playlistObj.videos.find((videoObj) => videoObj._id === video_Id)).length > 0;
