const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const songList = document.getElementById('songList');
const footerImg = document.getElementById('footerImg');
const footerTitle = document.getElementById('footerTitle');
const audioPlayer = document.getElementById('audioPlayer');

// Fetch recommended songs on page load
window.onload = function () {
  fetchSongs('Alan Walker'); // Default search
};

// Search songs
searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) fetchSongs(query);
});

// Fetch songs from Deezer API
async function fetchSongs(query) {
  const apiURL = `https://api.deezer.com/search?q=${query}&limit=10`;
  const proxyURL = `https://cors-anywhere.herokuapp.com/${apiURL}`; // Use proxy for CORS
  try {
    const response = await fetch(proxyURL);
    const data = await response.json();
    displaySongs(data.data);
  } catch (error) {
    console.error('Error fetching songs:', error);
  }
}

// Display songs in the UI
function displaySongs(songs) {
  songList.innerHTML = '';
  songs.forEach((song) => {
    const li = document.createElement('li');
    li.classList.add('song-item');
    li.innerHTML = `
      <img src="${song.album.cover_medium}" alt="${song.title}">
      <p>${song.title}</p>
      <p>${song.artist.name}</p>
    `;
    li.addEventListener('click', () => playSong(song));
    songList.appendChild(li);
  });
}

// Play selected song
function playSong(song) {
  footerImg.src = song.album.cover_medium;
  footerTitle.textContent = `${song.title} - ${song.artist.name}`;
  audioPlayer.src = song.preview;
  audioPlayer.play();
}