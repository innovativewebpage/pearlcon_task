import { all } from "redux-saga/effects";
import userSaga from "./userSaga";
import postSaga from "./postSaga";
import commentSaga from "./commentSaga";
import likeSaga from "./likeSaga";
export default function* rootSaga() {
 yield all([userSaga(),postSaga(),commentSaga(),likeSaga()]);
}