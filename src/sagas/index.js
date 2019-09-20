import { put, takeLatest, all, call } from 'redux-saga/effects';
import axios from "axios";

function* actionWatcher() {
  yield takeLatest('GET_NEWS', fetchNews)
}

function getNews(optionName) {
    return axios({
      method: "get",
      url: `https://cors-anywhere.herokuapp.com/http://www.reddit.com/r/${optionName}.json?limit=99`
    });
}

function* fetchNews(optionName) {
    try {
      const response = yield call(getNews, optionName.payload);
      const { data } = response.data
      const news = data.children;
      const randomNews = news[Math.floor(Math.random()*news.length)]
      yield put({ type: "NEWS_RECEIVED", news, randomNews, currentOption: optionName.payload });
    
    } catch (error) {
      yield put({ type: "FETCH_ALL_FAIL", error });
    }
  }


export default function* rootSaga() {
  yield all([
    actionWatcher(),
  ]);
}
