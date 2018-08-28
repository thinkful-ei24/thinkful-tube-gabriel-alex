/* global Store */

// Creates an API module
const Api = (function() {
  // Store API URL and key
  const API_KEY = 'AIzaSyDcTeEsCQx8Ls2BoieneCkklc27U4PPTt0';
  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  // Create a function to make API call to Youtube
  const fetchVideos = function(query, callback) {
    $.getJSON(BASE_URL, query, callback);
  };

  // Expose fetchVideos and API_KEY
  return { fetchVideos, API_KEY };
})();
