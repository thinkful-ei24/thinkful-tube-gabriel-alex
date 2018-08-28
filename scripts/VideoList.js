/* global Store, Api */
console.log('VideoList ran');
const VideoList = (function() {
  const generateListItem = function(video) {
    const youtubeVideoURL = 'https://www.youtube.com/watch?v=';
    const youtubeChannelURL = 'https://www.youtube.com/channel/';

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
    const html = Store.results.videos.map(video => generateListItem(video));
    updateButtonDisabledStatus();
    $('.results').html(html.join(''));
  };

  const handleFormSubmit = function() {
    $('#js-search-form').submit(event => {
      event.preventDefault();
      const searchTerm = getSearchTerm('#search-term');
      // searchField.val('');
      const query = {
        part: 'snippet',
        q: searchTerm,
        key: Api.API_KEY
      };
      Api.fetchVideos(searchTerm, query, function(response) {
        Store.setVideos(decorateItemsArray(response));
        render();
      });
    });
  };

  const getSearchTerm = function(cssClass) {
    const searchField = $(cssClass);
    return searchField.val();
  };

  const bindNextButtonListener = function() {
    $('#next').on('click', function() {
      const searchTerm = getSearchTerm('#search-term');
      const query = {
        part: 'snippet',
        q: searchTerm,
        key: Api.API_KEY,
        pageToken: Store.results.nextPageToken
      };

      Api.fetchVideos(searchTerm, query, function(response) {
        Store.setVideos(decorateItemsArray(response));
        render();
      });
    });
  };

  const bindPreviousButtonListener = function() {
    $('#previous').on('click', function() {
      console.log('previous button clicked');
      const searchField = $('#search-term');
      const searchTerm = searchField.val();
      const query = {
        part: 'snippet',
        q: searchTerm,
        key: Api.API_KEY,
        pageToken: Store.results.prevPageToken
      };

      Api.fetchVideos(searchTerm, query, function(response) {
        Store.setVideos(decorateItemsArray(response));
        render();
      });
    });
  };

  const decorateItemsArray = function(response) {
    Store.setPageTokens(response.prevPageToken, response.nextPageToken);

    return response.items.map(item => {
      return {
        id: item.id.videoId,
        thumbnail: item.snippet.thumbnails.default.url,
        title: item.snippet.title,
        channelID: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        nextPage: response.nextPageToken
      };
    });
  };

  const updateButtonDisabledStatus = function() {
    if (Store.results.nextPageToken) {
      $('#next').prop('disabled', false);
    } else {
      $('#next').prop('disabled', true);
    }
    if (Store.results.previousPageToken) {
      $('#previous').prop('disabled', false);
    } else {
      $('#previous').prop('disabled', true);
    }
  };

  const bindEventListeners = function() {
    console.log('binding event listener');
    updateButtonDisabledStatus();
    bindNextButtonListener();
    bindPreviousButtonListener();
    handleFormSubmit();
  };
  return { render, bindEventListeners };
})();
