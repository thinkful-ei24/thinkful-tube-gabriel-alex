// Store module
const Store = (function() {
  // Results object with videos array
  const results = {
    videos: [],
    previousPageToken: '',
    nextPageToken: ''
  };

  // Function for parsing videos array and setting Store.results.videos to match
  const setVideos = function(videos) {
    this.results.videos = [];
    videos.forEach(video => {
      this.results.videos.push(video);
    });
  };

  // Function for getting and setting the page tokens
  const setPageTokens = function(prevToken = '', nextToken = '') {
    this.results.previousPageToken = prevToken;
    this.results.nextPageToken = nextToken;
  };

  // Expose results, setVideos, and setPageTokens
  return { results, setVideos, setPageTokens };
})();
