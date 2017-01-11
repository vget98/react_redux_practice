const FETCHING_DATA = 'redux-example/hello/FETCHING_DATA';
const DATA_FETCHED = 'redux-example/hello/DATA_FETCHED';
const DATA_ERROR = 'redux-example/hello/DATA_ERROR';
const REPO_ISSUE_FETCHING = 'redux-example/hello/REPO_ISSUE_FETCHING';
const REPO_ISSUE_FETCHED = 'redux-example/hello/REPO_ISSUE_FETCHED';
const REPO_ERROR = 'redux-example/hello/REPO_ERROR';
const CHANGE_USER = 'redux-example/hello/CHANGE_USER';

import axios from 'axios';

const initialState = {
  data: [],
  fetching: false,
  fetched: true,
  user: ''
};

const initialRepoState = {
  issueData: [],
  fetchingIssues: false,
  fetchedIssues: true
};

const githubURL = 'https://api.github.com/';

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCHING_DATA:
      return Object.assign({}, state, {
        fetching: true
      });
    case DATA_FETCHED:
      return Object.assign({}, state, {
        fetching: true,
        fetched: false,
        data: action.payload
      });
    case DATA_ERROR:
      return Object.assign({}, state, {
        fetching: false,
        fetched: true,
        error: action.payload
      });
    case CHANGE_USER:
      return Object.assign({}, state, {
        user: action.user
      });
    default:
      return state;
  }
};

const issueReducer = (state = initialRepoState, action) => {
  switch (action.type) {
    case REPO_ISSUE_FETCHING:
      return Object.assign({}, state, {
        fetchingIssues: true
      });
    case REPO_ISSUE_FETCHED:
      return Object.assign({}, state, {
        fetchingIssues: true,
        fetchedIssues: false,
        data: action.payload
      });
    case REPO_ERROR:
      return Object.assign({}, state, {
        fetchingIssues: false,
        fetchedIssues: true,
        error: action.payload
      });
    default:
      return state;
  }
};

export function getUserData(username) {
  return (dispatch) => {
    dispatch({type: FETCHING_DATA});
    axios.get(`${githubURL}users/${username}/repos`)
      .then((res) => {
        console.log('was called', res);
        dispatch({
          type: DATA_FETCHED,
          payload: res.data
        });
      })
      .catch((error) => {
        dispatch({
          type: DATA_ERROR,
          error: error
        });
      });
  };
}

export function getRepoIssues(reponame, username) {
  return (dispatch) => {
    dispatch({type: REPO_ISSUE_FETCHING});
    console.log('repo issue call');
    axios.get(`${githubURL}repo/${username}/${reponame}/issues`)
      .then((res) => {
        console.log('repo res', res.data);
        dispatch({
          type: REPO_ISSUE_FETCHED,
          payload: res.data
        });
      })
      .catch((error) => {
        dispatch({
          type: REPO_ERROR,
          error: error
        });
      });
  };
}

export function changeUser(username) {
  return (dispatch) => {
    dispatch({
      type: CHANGE_USER,
      user: username
    });
  };
}

export {
  dataReducer,
  issueReducer
};
