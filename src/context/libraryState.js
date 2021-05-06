import faker from 'faker';
import { createContext, useContext, useReducer } from 'react';
import { libraryReducer } from '../reducer/libraryReducer';

const LibraryContext = createContext();

export const LibraryContextProvider = ({ children }) => {
  const initialState = {
    playlists: [
      {
        id: faker.datatype.uuid(),
        name: 'default playlist',
        videos: ['uvY3VWe4O4k'],
      },
    ],
    videos: [],
    watchLater: ['gfyCzLbcAvk'],
    watchHistory: [],
    likedVideos: ['NUs6NDsMWVI'],
  };
  const [state, dispatch] = useReducer(libraryReducer, initialState);
  return (
    <LibraryContext.Provider
      value={{
        state,
        dispatch,
      }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibraryContext = () => useContext(LibraryContext);
