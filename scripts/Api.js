console.log('API ran');

const Api = (function() {
  const API_KEY = 'AIzaSyDcTeEsCQx8Ls2BoieneCkklc27U4PPTt0';

  const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

  const fetchVideos = function(searchTerm, callback) {
    const query = {
      part: 'snippet',
      qL: searchTerm,
      key: API_KEY
    };
    const decoratedArray = $.getJSON(BASE_URL, query, function(response) {
      return response.items.map(item => {
        return {
          id: item.id.videoId,
          thumbnail: item.snippet.thumbnails.default,
          title: item.snippet.title
        };
      });
    });
    return decoratedArray;
  };
  return { fetchVideos };
})();
