/* global Store, Api */
console.log('VideoList ran');
const VideoList = (function() {
  const generateListItem = function(video) {
    console.log('generating list items');
    const youtubeVideoURL = 'https://www.youtube.com/watch?v=';
    const youtubeChannelURL = 'https://www.youtube.com/channel/';
    console.log(video);
    return `
    <li>
      <a href='${youtubeVideoURL}${video.id}' data-lity><img src='${
    video.thumbnail
  }'></a>
      Title: ${video.title}
      - <a href="${youtubeVideoURL}${video.id}">Link</a>
      Channel: <a href='${youtubeChannelURL}${video.channelID}'>${
    video.channelTitle
  }</a>
    </li>
    `;
  };
  const render = function() {
    const html = Store.videos.map(video => generateListItem(video));
    $('.results').html(html.join(''));
  };
  const handleFormSubmit = function() {
    $('#js-search-form').submit(event => {
      event.preventDefault();
      const searchField = $('#search-term');
      const searchTerm = searchField.val();
      searchField.val('');

      Api.fetchVideos(searchTerm, function(response) {
        const decoratedArray = response.items.map(item => {
          return {
            id: item.id.videoId,
            thumbnail: item.snippet.thumbnails.default.url,
            title: item.snippet.title,
            channelID: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle
          };
        });
        Store.setVideos(decoratedArray);
        render();
      });
    });
  };

  const bindEventListeners = function() {
    console.log('binding event listener');
    handleFormSubmit();
  };
  return { render, bindEventListeners };
})();
