console.log('Store ran');
const Store = (function() {
  // const videos = [];

  const results = {
    videos: [],
    previousPageToken: '',
    nextPageToken: ''
  };

  const setVideos = function(videos) {
    console.log('this is this');
    console.log(this);
    this.results.videos = [];
    videos.forEach(video => {
      this.results.videos.push(video);
    });
  };

  const setPageTokens = function(prevToken = '', nextToken = '') {
    this.results.previousPageToken = prevToken;
    this.results.nextPageToken = nextToken;
  };

  return { results, setVideos, setPageTokens };
})();
