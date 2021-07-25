import axios from "axios";
import { toast } from "react-toastify";

export const loadVideosFromDB = async ({ dispatch, url, token }) => {
  const res = await axios({
    method: "GET",
    url,
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  if (res.status === 200 || res.status === 201) {
    dispatch({ type: "LOAD_VIDEOS", payload: res.data.response });
  } else {
    toast.error("Failed to load Videos from server");
    throw new Error("Failed to load Videos from server");
  }
};

export const loadUserPlaylists = async ({ dispatch, url, token }) => {
  try {
    const { data, status } = await axios({ method: "GET", url, headers: { authorization: token } });
    if (status === 200) {
      console.log({ data });
      dispatch({ type: "LOAD_ALL_PLAYLISTS", payload: data.response });
    }
  } catch (error) {
    toast.error("Unable to Load User Playlist");
  }
};

export const addVideoToPlaylistDb = async ({ url, token }) => {
  try {
    return await axios({ method: "POST", url, headers: { authorization: token } });
  } catch (error) {
    toast.error("Unable TO ADD Video into Playlist");
  }
};

export const removeVideoFromPlaylistDb = async ({ url, token }) => {
  try {
    return await axios({ method: "DELETE", url, headers: { authorization: token } });
  } catch (error) {
    toast.error("Unable TO Remove Video from Playlist");
    console.log(error);
  }
};

export const createNewPlaylistInDb = async ({ url, token, newPlaylistName }) => {
  return await axios({
    method: "POST",
    url,
    data: { name: newPlaylistName },
    headers: { authorization: token },
  });
};

export const deletePlaylistFromDb = async ({ url, token }) => {
  return await axios({ method: "DELETE", url, headers: { authorization: token } });
};

export const deleteVideoFromPlaylist = async ({ url, token, dispatch }) => {
  toast.info("Removing Video From Playlist...");
  try {
    const {
      data: { success, response },
    } = await axios({
      method: "DELETE",
      url,
      headers: { authorization: token },
    });
    if (success) {
      dispatch({ type: "LOAD_VIDEOS_OF_A_PLAYLIST", payload: response });

      toast.success("Video Removed from Playlist");
    }
  } catch (error) {
    toast.error("Unable to Remove VIdeo from Playlist");
  }
};
