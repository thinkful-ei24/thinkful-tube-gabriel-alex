/* global Store */
console.log('API ran');

const Api = (function() {
  const API_KEY = 'AIzaSyDcTeEsCQx8Ls2BoieneCkklc27U4PPTt0';

  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const fetchVideos = function(searchTerm, callback) {
    const query = {
      part: 'snippet',
      q: searchTerm,
      key: API_KEY
    };
    $.getJSON(BASE_URL, query, callback);
  };
  return { fetchVideos };
})();
