(function (window) {
  window.__env = window.__env || {};

  // API url dev
  window.__env.apiEndpoint = 'https://samadonneurapi.herokuapp.com/api';
 // window.__env.apiEndpoint = 'http://127.0.0.1:8082/api';


  // API url prod//
  //window.__env.apiEndpoint = 'http://127.0.0.1:8082/api';

  // Whether or not to enable debug mode
  // Setting this to false will disable console output
  window.__env.enableDebug = true;
}(this));
