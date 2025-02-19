const searchButton = document.getElementById('searchButton');
const artistInput = document.getElementById('artistInput');
const titleInput = document.getElementById('titleInput');
const lyricsResult = document.getElementById('lyricsResult');

searchButton.addEventListener('click', () => {
  const artist = artistInput.value.trim();
  const title = titleInput.value.trim();

  if (!artist || !title) {
    lyricsResult.innerHTML = 'Por favor, escribe el artista y la canción.';
    return;
  }

  fetchLyrics(artist, title);
});

async function fetchLyrics(artist, title) {
  try {
    lyricsResult.innerHTML = 'Buscando...';
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    if (response.ok) {
      const data = await response.json();
      lyricsResult.innerHTML = data.lyrics || 'No se encontraron letras.';
    } else {
      lyricsResult.innerHTML = 'No se encontraron letras para esta canción.';
    }
  } catch (error) {
    console.error('Error al buscar las letras:', error);
    lyricsResult.innerHTML = 'Hubo un error al buscar las letras.';
  }
}