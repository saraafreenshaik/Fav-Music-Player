// ================= SELECT ELEMENTS =================
const now_playing = document.querySelector(".now-playing");
const track_art = document.querySelector(".track-art");
const track_name = document.querySelector(".track-name");
const track_artist = document.querySelector(".track-artist");

const playpause_btn = document.querySelector(".playpause-track");
const next_btn = document.querySelector(".next-track");
const prev_btn = document.querySelector(".prev-track");

const seek_slider = document.querySelector(".seek_slider");
const volume_slider = document.querySelector(".volume_slider");
const curr_time = document.querySelector(".current-time");
const total_duration = document.querySelector(".total-duration");

// ================= GLOBAL VARIABLES =================
let track_index = 0;
let isPlaying = false;
let updateTimer = null;

const curr_track = document.createElement("audio");

// ================= TRACK LIST =================
const track_list = [
  {
    name: "Haule Haule",
    artist: "Sukhwinder Singh",
    image: "Haule-Song.jpeg",
    path: "haule.mp3"
  },
  {
    name: "Maan Meri Jaan",
    artist: "KING",
    image: "maan-mare-jaan.jpeg",
    path: "maanMareJaan.mp3"
  },
  {
    name: "Jhommbe",
    artist: "Arijit Singh",
    image: "phatan.jpeg",
    path: "jhommbe.mp3"
  },
  {
    name: "Love Your Voice",
    artist: "Jony",
    image: "shape-of-you.jpeg",
    path: "love your voice.mp3"
  },
  {
    name: "Believer",
    artist: "Imagine Dragons",
    image: "beliver.jpeg",
    path: "beliver.mp3"
  },
  {
    name: "Some",
    artist: "Soyou",
    image: "some.jpeg",
    path: "some.mp3"
  }
];

// ================= LOAD TRACK =================
function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();

  curr_track.src = track_list[index].path;
  curr_track.load();

  track_art.style.backgroundImage = `url(${track_list[index].image})`;
  track_name.textContent = track_list[index].name;
  track_artist.textContent = track_list[index].artist;
  now_playing.textContent = `PLAYING ${index + 1} OF ${track_list.length}`;

  updateTimer = setInterval(seekUpdate, 1000);

  curr_track.onended = nextTrack;
}

// ================= RESET =================
function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// ================= PLAY / PAUSE =================
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

// ================= NEXT / PREVIOUS =================
function nextTrack() {
  track_index = (track_index + 1) % track_list.length;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  track_index =
    track_index > 0 ? track_index - 1 : track_list.length - 1;
  loadTrack(track_index);
  playTrack();
}

// ================= SEEK & VOLUME =================
function seekTo() {
  const seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

// ================= UPDATE TIME =================
function seekUpdate() {
  if (isNaN(curr_track.duration)) return;

  const seekPosition =
    curr_track.currentTime * (100 / curr_track.duration);
  seek_slider.value = seekPosition;

  let currentMinutes = Math.floor(curr_track.currentTime / 60);
  let currentSeconds = Math.floor(curr_track.currentTime % 60);
  let durationMinutes = Math.floor(curr_track.duration / 60);
  let durationSeconds = Math.floor(curr_track.duration % 60);

  curr_time.textContent =
    `${currentMinutes.toString().padStart(2, "0")}:${currentSeconds
      .toString()
      .padStart(2, "0")}`;

  total_duration.textContent =
    `${durationMinutes.toString().padStart(2, "0")}:${durationSeconds
      .toString()
      .padStart(2, "0")}`;
}


// ================= INIT =================
loadTrack(track_index);
