import api from "../services/api";
import {
  SET_CURRENT_USER,
  ASYNC_START,
  LOG_OUT,
  HANDLE_SEARCH,
  SEARCH_VIEW,
  UPDATES_VIEW,
  INDIVIDUAL_CHARITY_VIEW,
  RESET_SEARCH,
  ADD_SUPPORT,
  ADD_PLEDGE,
  ADD_UPDATES,
  CLEAR_SEARCH,
  CHANGE_PLEDGE,
  MODIFY_DONATIONS_VIEW,
  HANDLE_ERROR,
  EDIT_CHARITY_VIEW,
  ADD_UPDATE_VIEW,
  CHARITY_CARD,
  CREATE_UPDATE
} from "./types";

export const fetchUser = () => dispatch => {
  dispatch({ type: ASYNC_START });
  api.auth.getCurrentUser().then(user => {
    dispatch({ type: SET_CURRENT_USER, user });
  });
};

export const login = (username, password, history) => dispatch => {
  dispatch({ type: ASYNC_START });
  api.auth.login(username, password).then(user => {
    if (user.error) {
      const message = user.error;
      dispatch({ type: LOG_OUT, user });
      dispatch({ type: HANDLE_ERROR, message });
    } else {
      localStorage.setItem("token", user.token);
      const message = null;
      dispatch({ type: SET_CURRENT_USER, user });
      dispatch({ type: HANDLE_ERROR, message });
      history.push("/");
    }
  });
};

export const signup = (
  username,
  password,
  email,
  firstName,
  lastName,
  history
) => dispatch => {
  dispatch({ type: ASYNC_START });
  api.auth.signup(username, password, email, firstName, lastName).then(user => {
    localStorage.setItem("token", user.token);
    const message = null;
    dispatch({ type: SET_CURRENT_USER, user });
    dispatch({ type: HANDLE_ERROR, message });
    history.push("/");
  });
};

export const logout = history => dispatch => {
  let user = null;
  localStorage.removeItem("token");
  dispatch({ type: LOG_OUT, user });
  history.push("/login");
};

export const signupCharity = (
  username,
  password,
  charityName,
  tagline,
  URL,
  icon,
  banner,
  mission,
  history
) => dispatch => {
  dispatch({ type: ASYNC_START });
  api.auth
    .signupCharity(
      username,
      password,
      charityName,
      tagline,
      URL,
      icon,
      banner,
      mission,
      history
    )
    .then(user => {
      localStorage.setItem("token", user.token);
      const message = null;
      dispatch({ type: SET_CURRENT_USER, user });
      dispatch({ type: HANDLE_ERROR, message });
      history.push("/");
    });
};

export const handleSearch = searchQuery => dispatch => {
  dispatch({ type: HANDLE_SEARCH, searchQuery });
};

export const resetSearch = supports => dispatch => {
  dispatch({ type: RESET_SEARCH, supports });
};

export const clearSearch = supports => dispatch => {
  dispatch({ type: CLEAR_SEARCH });
};

export const searchView = supports => dispatch => {
  dispatch({ type: SEARCH_VIEW, supports });
};

export const updatesView = () => dispatch => {
  dispatch({ type: UPDATES_VIEW });
};
export const modifyDonationsView = () => dispatch => {
  dispatch({ type: MODIFY_DONATIONS_VIEW });
};

export const individualCharityView = (charity, supports) => dispatch => {
  dispatch({ type: INDIVIDUAL_CHARITY_VIEW, charity, supports });
};

export const addSupport = (user, charity, pledge) => dispatch => {
  dispatch({ type: ASYNC_START });
  api.support.addSupport(user, charity, pledge).then(updates => {
    if (updates.updates) {
      updates.updates.forEach(updateToAdd => {
        dispatch({ type: ADD_UPDATES, updateToAdd });
      });
    }
  });
  dispatch({
    type: ADD_SUPPORT,
    charity
  });
  dispatch({
    type: ADD_PLEDGE,
    charity,
    pledge
  });
  dispatch({ type: UPDATES_VIEW });
};

export const changePledge = (id, donation, charity, user_id) => dispatch => {
  dispatch({ type: ASYNC_START });
  api.support.changeSupport(id, donation, user_id);
  dispatch({
    type: CHANGE_PLEDGE,
    charity,
    donation
  });
};

export const handleError = message => dispatch => {
  dispatch({ type: HANDLE_ERROR, message });
};

export const editCharity = () => dispatch => {
  dispatch({ type: EDIT_CHARITY_VIEW });
};
export const addUpdate = () => dispatch => {
  dispatch({ type: ADD_UPDATE_VIEW });
};
export const charityCard = () => dispatch => {
  dispatch({ type: CHARITY_CARD });
};

export const createUpdate = (title, content, userId) => dispatch => {
  dispatch({ type: ASYNC_START });
  api.manager.addUpdate(title, content, userId);
};
