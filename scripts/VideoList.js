console.log('VideoList ran');
const VideoList = (function() {
  const generateListItem = function(video) {
    const youtubeURL = 'https://www.youtube.com/watch?v=';
    return `
    <li> Title: ${video.title}
        Image: ${video.thumbnail}
        Link: <a href="${youtubeURL}${video.id}">Link</a>
    </li>
    `;
  };
  const render = function() {
    const html = store.videos.map(video => generateListItem(video));
    console.log(html);
  };
  return { render };
})();
