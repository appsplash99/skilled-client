export const kFormatter = (num) => {
  return Math.abs(num) > 999
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "k"
    : Math.sign(num) * Math.abs(num);
};

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

export const getVideosOfPlaylistCategory = (myPlaylist, playlistId) => {
  return myPlaylist.find((playlist) => playlist._id === playlistId)?.videos;
};
