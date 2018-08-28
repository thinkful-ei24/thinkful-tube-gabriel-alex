/* global Store, Api */
console.log('VideoList ran');
const VideoList = (function() {
  const generateListItem = function(video) {
    console.log('generating list items');
    const youtubeURL = 'https://www.youtube.com/watch?v=';
    return `
    <li>
      <img src='${video.thumbnail}'>
      Title: ${video.title}
      Link: <a href="${youtubeURL}${video.id}">Link</a>
    </li>
    `;
  };
  const render = function() {
    const html = Store.videos.map(video => generateListItem(video));
    $('.results').html(html.join(''));
  };
  const handleFormSubmit = function() {
    console.log('handling form submit');
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
            title: item.snippet.title
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
