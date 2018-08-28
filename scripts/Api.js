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

// Api.fetchVideos('test', function(response) {
//   const decoratedArray = response.items.map(item => {
//     return {
//       id: item.id.videoId,
//       thumbnail: item.snippet.thumbnails.default,
//       title: item.snippet.title
//     };
//   });
//   Store.setVideos(decoratedArray);
// });
