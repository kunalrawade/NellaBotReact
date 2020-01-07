import { loadingActions } from '../redux';

const setLanguage = (language) => {
  let status = false;
  switch (language) {
    case 'de-DE':
      loadingActions.showLanguage('es');
      status = true;
      break;
    case 'en-US':
      loadingActions.showLanguage('en');
      status = true;
      break;
    default:
      status = true;
      break;
  }
  return status;
};

export default setLanguage;
