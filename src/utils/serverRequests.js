import axios from "axios";
import { toggleToast } from "./cutomToastStyles";

export const loadVideosFromDB = async ({ dispatch, url, token, toast }) => {
  const res = await axios({
    method: "GET",
    url,
    headers: { "Content-Type": "application/json", Authorization: token },
  });
  if (res.status === 200 || res.status === 201) {
    dispatch({ type: "LOAD_VIDEOS", payload: res.data.response });
  } else {
    toggleToast(toast, "error", "Failed to load Videos from server");
    throw new Error("Failed to load Videos from server");
  }
};

export const loadUserPlaylists = async ({ dispatch, url, token, toast }) => {
  try {
    const { data, status } = await axios({ method: "GET", url, headers: { authorization: token } });
    if (status === 200) dispatch({ type: "LOAD_ALL_PLAYLISTS", payload: data.response });
  } catch (error) {
    toggleToast(error, toast, "Unable to Load User Playlist");
  }
};

export const addVideoToPlaylistDb = async ({ url, token, toast }) => {
  try {
    return await axios({ method: "POST", url, headers: { authorization: token } });
  } catch (error) {
    toggleToast(toast, error, "Unable TO ADD Video into Playlist");
    console.log(error);
  }
};

export const removeVideoFromPlaylistDb = async ({ url, token, toast }) => {
  try {
    return await axios({ method: "DELETE", url, headers: { authorization: token } });
  } catch (error) {
    toggleToast(toast, error, "Unable TO Remove Video from Playlist");
    console.log(error);
  }
};