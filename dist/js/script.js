const image = document.querySelector('img'),
      title = document.getElementById('title'),
      artist = document.getElementById('artist'),
      music = document.querySelector('audio'),
      progressContainer = document.getElementById('progress-container'),
      progress = document.getElementById('progress'),
      currentTimeEl = document.getElementById('current-time'),
      durationEl = document.getElementById('duration'),
      prevBtn = document.getElementById('prev'),
      playBtn = document.getElementById('play'),
      nextBtn = document.getElementById('next');
  

const songs = [
    {
        name: 'sweet-dreams',
        displayName: 'Sweet Dreams',
        artist: 'Eurythmics'
    },
    {
        name: 'paradise',
        displayName: "Gangsta's Paradise",
        artist: 'Coolio'
    },
    {
        name: 'happy-nation',
        displayName: 'Нappy Nation',
        artist: 'Ace Of Base'
    },
];

let isPlaying = false;

function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `../music/${song.name}.mp3`;
    image.src = `../img/${song.name}.jpeg`;
}

let songIndex = 0;

function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]); 
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex > songs.length -1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]); 
    playSong();
}

loadSong(songs[songIndex]); 


prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('ended', nextSong)
