
const utilsReducers = (state = {
  isLoading: false,
  loaderStyles: null,
  notificationConf: {
    showNotification: false,
    message: '',
    kind: '',
  },
  language: 'en',
  visibilityScope: []
}, action) => {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case 'ACTION_SHOW_LOADING':
      newState.isLoading = true;
      newState.loaderStyles = action.payload;
      return newState;
    case 'ACTION_HIDE_LOADING':
      newState.isLoading = false;
      return newState;
    case 'ACTION_SHOW_NOTIFICATION':
      newState.notificationConf.showNotification = true;
      newState.notificationConf.message = action.payload.message;
      newState.notificationConf.kind = action.payload.kind;
      return newState;
    case 'ACTION_HIDE_NOTIFICATION':
      newState.notificationConf.showNotification = false;
      newState.notificationConf.message = '';
      newState.notificationConf.kind = '';
      return newState;
    default: return state;
  }
};
export default utilsReducers;
