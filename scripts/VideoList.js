/* global Store, Api */

// VideoList module
const VideoList = (function() {
  // Function for generating HTML for a given video object
  const generateListItem = function(video) {
    // URL definitions
    const youtubeVideoURL = 'https://www.youtube.com/watch?v=';
    const youtubeChannelURL = 'https://www.youtube.com/channel/';

    // Return generated HTML
    return `
    <li>
      <a href='${youtubeVideoURL}${video.id}' data-lity><img src='${
    video.thumbnail
  }'></a>
      <span class="title"> ${video.title}</span>
       <span class="link"> <a href="${youtubeVideoURL}${
    video.id
  }">Link</a></span>
      Channel: <a href='${youtubeChannelURL}${video.channelID}'>${
    video.channelTitle
  }</a>
    </li>
    `;
  };

  // Function for rendering page
  const render = function() {
    const html = Store.results.videos.map(video => generateListItem(video));
    // Update the button disabled status based on presence of page tokens in store
    updateButtonDisabledStatus();
    $('.results').html(html.join(''));
  };

  // Fucntion for creating event listener on form
  const handleFormSubmit = function() {
    $('#js-search-form').submit(event => {
      event.preventDefault();
      const searchTerm = getSearchTerm('#search-term');
      // Create query for search
      const query = {
        part: 'snippet',
        q: searchTerm,
        key: Api.API_KEY,
        type: 'video'
      };
      setVideosAndRender(query);
    });
  };

  // Function for getting search term from search field
  const getSearchTerm = function(cssClass) {
    const searchField = $(cssClass);
    return searchField.val();
  };

  // Function for binding next button listener
  const bindNextButtonListener = function() {
    $('#next').on('click', function() {
      const searchTerm = getSearchTerm('#search-term');
      const query = {
        part: 'snippet',
        q: searchTerm,
        key: Api.API_KEY,
        pageToken: Store.results.nextPageToken,
        type: 'video'
      };

      // Call fetch videos
      setVideosAndRender(query);
    });
  };

  // Function for binding previous button listener
  const bindPreviousButtonListener = function() {
    $('#previous').on('click', function() {
      console.log('previous button clicked');
      const searchField = $('#search-term');
      const searchTerm = searchField.val();
      const query = {
        part: 'snippet',
        q: searchTerm,
        key: Api.API_KEY,
        pageToken: Store.results.prevPageToken,
        type: 'video'
      };
      setVideosAndRender(query);
    });
  };

  // Function for calling fetchvideos and setting the store
  const setVideosAndRender = function(query) {
    Api.fetchVideos(query, function(response) {
      Store.setVideos(decorateItemsArray(response));
      render();
    });
  };

  // Function for producing a decorated array of objects
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

  // Update the disabled status of the previous and next buttons
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
