import { bindActionCreators } from 'redux';
import store from '../store';

const showLoadingSymbol = () => (dispatch, getState) => {
  const currentState = getState();
  if (!currentState.utilsReducer.isLoading) {
    dispatch({ type: 'ACTION_SHOW_LOADING' });
  }
};

const hideLoadingSymbol = () => (dispatch, getState) => {
  const currentState = getState();
  if (currentState.utilsReducer.isLoading) {
    dispatch({ type: 'ACTION_HIDE_LOADING' });
  }
};

const showNotificationMessage = (message, kind, timeout) => (dispatch) => {
  dispatch({
    type: 'ACTION_SHOW_NOTIFICATION',
    payload: {
      message, kind,
    },
  });
  const notificationTimeOut = timeout || 5000;
  setTimeout(() => {
    dispatch({ type: 'ACTION_HIDE_NOTIFICATION' });
  }, notificationTimeOut);
};

const loadingActions = bindActionCreators(
  {
    showLoadingSymbol,
    hideLoadingSymbol,
    showNotificationMessage
  },
  store.dispatch,
);

export default loadingActions;
