import { combineReducers } from "redux-immutable";
import { reducer as recommendReducer } from "../pages/discover/c-pages/recommend/store";
import { reducer as playerReducer } from "../components/player/store";
import { reducer as userLoginReducer } from "../components/login-store";
import { reducer as rankingReducer } from "../pages/discover/c-pages/ranking/store";
import { reducer as songsReducer } from "../pages/discover/c-pages/songs/store";
const reducer = combineReducers({
  recommend: recommendReducer,
  player: playerReducer,
  userLogin: userLoginReducer,
  ranking: rankingReducer,
  songs: songsReducer,
});

export default reducer;
