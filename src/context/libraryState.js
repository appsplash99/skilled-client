import faker from "faker";
import { createContext, useContext, useReducer } from "react";
import { libraryReducer } from "../reducer/libraryReducer";

const LibraryContext = createContext();

export const LibraryContextProvider = ({ children }) => {
  const initialState = {
    errorMessage: "",
    videos: [],
    playlists: [],
    categories: [], // TODO: ADD CATEGORIES LATER
    toast: { value: false, message: "" },
    /**REMOVE BELOW STATES
     * AS THEY ARE ALREADY PRESENT IN PLAYLISTS STATE
     */
    watchLater: [],
    savedVideos: [],
    likedVideos: [],
  };
  const [state, dispatch] = useReducer(libraryReducer, initialState);
  return (
    <LibraryContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => useContext(LibraryContext);
