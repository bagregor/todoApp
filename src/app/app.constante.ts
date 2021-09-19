/* Fichier env */

//export const VERSION = process.env.VERSION;
//export const DEBUG_INFO_ENABLED = Boolean(process.env.DEBUG_INFO_ENABLED);
//export const SERVER_API_URL = 'https://gestionhopital.herokuapp.com/api';
export const SERVER_API_URL = 'http://localhost:8080/api';

//export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';

export const EMAIL_ALREADY_USED_TYPE = SERVER_API_URL + '/email-already-used';
export const LOGIN_ALREADY_USED_TYPE = SERVER_API_URL + '/login-already-used';
