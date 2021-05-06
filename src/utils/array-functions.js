export const findItemInArray = (itemsArray, videoID) => {
  return itemsArray.find(item => item.videoId === videoID)
}

export const isVideoIdPresentinArray = (desiredArray, videoId) => {
  return desiredArray.filter((eachVideoId) => eachVideoId === videoId).length > 0
}

export const concatNewVideoId = (itemsArray, payloadVideoId) => {
  return itemsArray.concat(payloadVideoId);
};

export const removeExistingVideoIdFromArray = (itemsArray, payloadVideoId) => {
  return itemsArray.filter((videoId) => {
    return videoId !== payloadVideoId;
  });
};

export const isVideoIdPresentInAnyPlaylists = (playlistsArray, videoId) => {
  return playlistsArray.filter((videoObj) => (
    videoObj.videos.find((eachVideoId) => eachVideoId === videoId)
  )).length > 0
}