var image = document.querySelector("img"), title = document.getElementById("title"), artist = document.getElementById("artist"), music = document.querySelector("audio"), progressContainer = document.getElementById("progress-container"), progress = document.getElementById("progress"), currentTimeEl = document.getElementById("current-time"), durationEl = document.getElementById("duration"), prevBtn = document.getElementById("prev"), playBtn = document.getElementById("play"), nextBtn = document.getElementById("next");
var songs = [
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
var isPlaying = false;
function playSong() {
    isPlaying = true;
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}
playBtn.addEventListener("click", function () { return (isPlaying ? pauseSong() : playSong()); });
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = "../music/".concat(song.name, ".mp3");
    image.src = "../img/".concat(song.name, ".jpeg");
}
var songIndex = 0;
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}
loadSong(songs[songIndex]);
function updateProgressBar(e) {
    if (isPlaying) {
        var _a = e.srcElement, duration = _a.duration, currentTime = _a.currentTime;
        var progressPercent = (currentTime / duration) * 100;
        progress.style.width = "".concat(progressPercent, "%");
        var durationMinutes = Math.floor(duration / 60);
        var durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = "0".concat(durationSeconds);
        }
        if (durationSeconds) {
            durationEl.textContent = "".concat(durationMinutes, ":").concat(durationSeconds);
        }
        var currentMinutes = Math.floor(currentTime / 60);
        var currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = "0".concat(currentSeconds);
        }
        currentTimeEl.textContent = "".concat(currentMinutes, ":").concat(currentSeconds);
    }
}
function setProgressBar(e) {
    var width = this.clientWidth;
    var clickX = e.offsetX;
    var duration = music.duration;
    music.currentTime = (clickX / width) * duration;
}
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
