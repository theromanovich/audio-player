const image = document.querySelector("img") as HTMLImageElement,
  title = document.getElementById("title") as HTMLHeadingElement,
  artist = document.getElementById("artist") as HTMLHeadingElement,
  music = document.querySelector("audio") as HTMLAudioElement,
  progressContainer = document.getElementById(
    "progress-container"
  ) as HTMLDivElement,
  progress = document.getElementById("progress") as HTMLDivElement,
  currentTimeEl = document.getElementById("current-time") as HTMLSpanElement,
  durationEl = document.getElementById("duration") as HTMLSpanElement,
  prevBtn = document.getElementById("prev") as HTMLButtonElement,
  playBtn = document.getElementById("play") as HTMLButtonElement,
  nextBtn = document.getElementById("next") as HTMLButtonElement;

interface Song {
  name: string;
  displayName: string;
  artist: string;
}

const songs: Song[] = [
  {
    name: "sweet-dreams",
    displayName: "Sweet Dreams",
    artist: "Eurythmics",
  },
  {
    name: "paradise",
    displayName: "Gangsta's Paradise",
    artist: "Coolio",
  },
  {
    name: "happy-nation",
    displayName: "Нappy Nation",
    artist: "Ace Of Base",
  },
];

let isPlaying: boolean = false;

function playSong(): void {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

function pauseSong(): void {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

function loadSong(song: Song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `../music/${song.name}.mp3`;
  image.src = `../img/${song.name}.jpeg`;
}

let songIndex: number = 0;

function prevSong(): void {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

function nextSong(): void {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}

loadSong(songs[songIndex]);

function updateProgressBar(e: Event): void {
  if (isPlaying) {
    const { duration, currentTime }: { duration: number; currentTime: number } =
      e.target as HTMLMediaElement;

    const progressPercent: number = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes: number = Math.floor(duration / 60);

    let durationSeconds: number | string = Math.floor(duration % 60);

    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);

    let currentSeconds: number | string = Math.floor(currentTime % 60);

    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

function setProgressBar(e: MouseEvent): void {
  const width: number = this.clientWidth;
  const clickX: number = e.offsetX;
  const { duration }: { duration: number } = music;
  music.currentTime = (clickX / width) * duration;
}

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
