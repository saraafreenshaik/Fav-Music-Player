// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
{
	name: "HAULE-HAULE",
	artist: "..........",
	image: "Haule Song.jpeg",
	path: "haule.mp3"
},
{
	name: "MAAN MARE JAAN",
	artist: "!!!!!!!!!!!!!",
	image: "maan mare jaan.jpeg",
	path: "maanMareJaan.mp3"
},
{
	name: "JHOMMBE",
	artist: "<3<3<3<3<3",
	image: "phatan.jpeg",
	path: "jhommbe.mp3",
},
{
    name: "LOVE YOUR VOICE",
	artist: "**********",
	image: "shap of you.jpeg",
	path: "love your voice.mp3",
},
{
    name: "BELIVER",
	artist: ";)))))))))",
	image: "beliver.jpeg",
	path: "beliver.mp3",
},
{
    name: "SOME",
	artist: "..........",
	image: "some.jpeg",
	path: "some.mp3",
}
];

function loadTrack(track_index) {
    // Clear the previous seek timer
    clearInterval(updateTimer);
    resetValues();
    
    // Load a new track
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    // Update details of the track
    track_art.style.backgroundImage =
        "url(" + track_list[track_index].image + ")";
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    now_playing.textContent =
        "PLAYING " + (track_index + 1) + " OF " + track_list.length;
    
    // Set an interval of 1000 milliseconds
    // for updating the seek slider
    updateTimer = setInterval(seekUpdate, 1000);
    
    // Move to the next track if the current finishes playing
    // using the 'ended' event
    curr_track.addEventListener("ended", nextTrack);
    
    // Apply a random background color
    random_bg_color();
    }
    
    // function random_bg_color() {
    // // Get a random number between 64 to 256
    // // (for getting lighter colors)
    // let red = Math.floor(Math.random() * 256) + 64;
    // let green = Math.floor(Math.random() * 256) + 64;
    // let blue = Math.floor(Math.random() * 256) + 64;
    
    // // Construct a color with the given values
    // let bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";
    
    // // Set the background to the new color
    // document.body.style.background = bgColor;
    // }
    
    // Function to reset all values to their default
    function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
    }
    




function playpauseTrack() {
    // Switch between playing and pausing
    // depending on the current state
    if (!isPlaying) playTrack();
    else pauseTrack();
    }
    
    function playTrack() {
    // Play the loaded track
    curr_track.play();
    isPlaying = true;
    
    // Replace icon with the pause icon
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
    
    function pauseTrack() {
    // Pause the loaded track
    curr_track.pause();
    isPlaying = false;
    
    // Replace icon with the play icon
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
    
    function nextTrack() {
    // Go back to the first track if the
    // current one is the last in the track list
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
    }
    
    function prevTrack() {
    // Go back to the last track if the
    // current one is the first in the track list
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;
    
    // Load and play the new track
    loadTrack(track_index);
    playTrack();
    }
    

    function seekTo() {
        // Calculate the seek position by the
        // percentage of the seek slider
        // and get the relative duration to the track
        seekto = curr_track.duration * (seek_slider.value / 100);
        
        // Set the current track position to the calculated seek position
        curr_track.currentTime = seekto;
        }
        
        function setVolume() {
        // Set the volume according to the
        // percentage of the volume slider set
        curr_track.volume = volume_slider.value / 100;
        }
        
        function seekUpdate() {
        let seekPosition = 0;
        
        // Check if the current track duration is a legible number
        if (!isNaN(curr_track.duration)) {
            seekPosition = curr_track.currentTime * (100 / curr_track.duration);
            seek_slider.value = seekPosition;
        
            // Calculate the time left and the total duration
            let currentMinutes = Math.floor(curr_track.currentTime / 60);
            let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
            let durationMinutes = Math.floor(curr_track.duration / 60);
            let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        
            // Add a zero to the single digit time values
            if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
            if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
            if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
            if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
            // Display the updated duration
            curr_time.textContent = currentMinutes + ":" + currentSeconds;
            total_duration.textContent = durationMinutes + ":" + durationSeconds;
        }
        }
        

// Load the first track in the tracklist
loadTrack(track_index);



























































































































































// let songs = [
//     {
//         name: 'Haule',
//         path: 'C:\Users\my-laptop\OneDrive\Desktop\MUSIC-PLAYER\haule.mp3',
//         artist: 'artist 1',
//         cover: 'C:\Users\my-laptop\OneDrive\Desktop\MUSIC-PLAYER\Haule Song.jpg'
//     },
//     {
//         name: 'Jab We Met',
//         path: 'C:\Users\my-laptop\OneDrive\Desktop\MUSIC-PLAYER\yeIshq.mp3',
//         artist: 'artist 2',
//         cover: 'C:\Users\my-laptop\OneDrive\Desktop\MUSIC-PLAYER\jab we met.jpeg'
//     },
//     {
//     name: 'maan mare jaan',
//     path: 'C:\Users\my-laptop\OneDrive\Desktop\MUSIC-PLAYER\maanMareJaan.mp3',
//     artist: 'artist 2',
//     cover: 'C:\Users\my-laptop\OneDrive\Desktop\MUSIC-PLAYER\maan mare jaan.jpeg'
//      },
//      {
//         name: 'phatan',
//         path: 'C:\Users\my-laptop\OneDrive\Desktop\MUSIC-PLAYER\jhommbe.mp3',
//         artist: 'artist 2',
//         cover: 'C:\Users\my-laptop\OneDrive\Desktop\MUSIC-PLAYER\phatan.jpeg'
//     },
//     // more songs
// ]



// ////////////////////navigations////////////

// ////////////toggling music player

// const musicPlayerSection = document.querySelector('.music-player-section');

// let clickCount = 1;

// musicPlayerSection.addEventListener('click', () => {
//     // checking for double click manually idk why default dbclick event was not working with this project If you know what could the problem Kindly tell me in the discussion below
//     if(clickCount >= 2){
//         musicPlayerSection.classList.add('active');
//         clickCount = 1;
//         return;
//     }
//     clickCount++;
//     setTimeout(() => {
//         clickCount = 1;
//     }, 250);
// })

// /////// back from music player

// const backToHomeBtn = document.querySelector('.music-player-section .back-btn');

// backToHomeBtn.addEventListener('click', () => {
//     musicPlayerSection.classList.remove('active');
// })

// //////// access playlist

// const playlistSection = document.querySelector('.playlist');
// const navBtn = document.querySelector('.music-player-section .nav-btn');

// navBtn.addEventListener('click', () => {
//     playlistSection.classList.add('active');
// })

// ////////// back from playlist to music player

// const backToMusicPlayer = document.querySelector('.playlist .back-btn');

// backToMusicPlayer.addEventListener('click', () => {
//     playlistSection.classList.remove('active');
// })

// /////// music

// let currentMusic = 0;

// const music = document.querySelector('#audio-source');

// const seekBar = document.querySelector('.music-seek-bar');
// const songName = document.querySelector('.current-song-name');
// const artistName = document.querySelector('.artist-name');
// const coverImage = document.querySelector('.cover');
// const currentMusicTime = document.querySelector('.current-time');
// const musicDuration = document.querySelector('.duration');

// const queue = [...document.querySelectorAll('.queue')];

// // select all buttons here

// const forwardBtn = document.querySelector('i.fa-forward');
// const backwardBtn = document.querySelector('i.fa-backward');
// const playBtn = document.querySelector('i.fa-play');
// const pauseBtn = document.querySelector('i.fa-pause');
// const repeatBtn = document.querySelector('span.fa-redo');
// const volumeBtn = document.querySelector('span.fa-volume-up');
// const volumeSlider = document.querySelector('.volume-slider');


// // funtion for setting up music

// const setMusic = (i) => {
//     seekBar.value = 0;
//     let song = songs[i];
//     currentMusic = i;

//     music.src = song.path;

//     songName.innerHTML = song.name;
//     artistName.innerHTML = song.artist;
//     coverImage.src = song.cover;

//     setTimeout(() => {
//         seekBar.max = music.duration;
//         musicDuration.innerHTML = formatTime(music.duration);
//     }, 300);
//     currentMusicTime.innerHTML = '00 : 00';
//     queue.forEach(item => item.classList.remove('active'));
//     queue[currentMusic].classList.add('active');
// }

// setMusic(0);

// // funtion for setting up music

// const setMusic = (i) => {
//     seekBar.value = 0;
//     let song = songs[i];
//     currentMusic = i;

//     music.src = song.path;

//     songName.innerHTML = song.name;
//     artistName.innerHTML = song.artist;
//     coverImage.src = song.cover;

//     setTimeout(() => {
//         seekBar.max = music.duration;
//         musicDuration.innerHTML = formatTime(music.duration);
//     }, 300);
//     currentMusicTime.innerHTML = '00 : 00';
//     queue.forEach(item => item.classList.remove('active'));
//     queue[currentMusic].classList.add('active');
// }

// setMusic(0);

// // playBtn click event

// playBtn.addEventListener('click', () => {
//     music.play();
//     playBtn.classList.remove('active');
//     pauseBtn.classList.add('active');
// })


// // pauseBtn click event

// pauseBtn.addEventListener('click', () => {
//     music.pause();
//     pauseBtn.classList.remove('active');
//     playBtn.classList.add('active');
// })
// //  forward btn

// forwardBtn.addEventListener('click', () => {
//     if(currentMusic >= songs.length - 1){
//         currentMusic = 0;
//     } else{
//         currentMusic++;
//     }
//     setMusic(currentMusic);
//     playBtn.click();
// })

// // backward btn

// backwardBtn.addEventListener('click', () => {
//     if(currentMusic <= 0){
//         currentMusic = songs.length - 1;
//     } else{
//         currentMusic--;
//     }
//     setMusic(currentMusic);
//     playBtn.click();
// })

// setInterval(() => {
//     seekBar.value = music.currentTime;
//     currentMusicTime.innerHTML = formatTime(music.currentTime);
//     if(Math.floor(music.currentTime) == Math.floor(seekBar.max)){
//         if(repeatBtn.className.includes('active')){
//             setMusic(currentMusic);
//             playBtn.click();
//         } else{
//             forwardBtn.click();
//         }
//     }
// }, 500)

// seekBar.addEventListener('change', () => {
//     music.currentTime = seekBar.value;
// })

// repeatBtn.addEventListener('click', () => {
//     repeatBtn.classList.toggle('active');
// })

// // volume section

// volumeBtn.addEventListener('click', () => {
//     volumeBtn.classList.toggle('active');
//     volumeSlider.classList.toggle('active');
// })

// volumeSlider.addEventListener('input', () => {
//     music.volume = volumeSlider.value;
// })

// queue.forEach((item, i) => {
//     item.addEventListener('click', () => {
//         setMusic(i);
//         playBtn.click();
//     })
// })


































































































// Sample song data
// const songs = [
//     { title: "HAULE-HAULE", artist: "Artist 1", file: "haule.mp3" },
//     { title: "JHOMMBE", artist: "Artist 2", file: "jhommbe.mp3" },
//     { title: "MAANMAREJAAN", artist: "Artist 3", file: "./maanMareJaan.mp3" }
//   ];
  
//   const songList = document.getElementById("song-list");
//   const audioPlayer = new Audio();
//   let currentSongIndex = 0;
  
//   // Load and play the current song
//   function playSong() {
//     const currentSong = songs[currentSongIndex];
//     audioPlayer.src = currentSong.file;
//     audioPlayer.play();
//   }
  
//   // Update the playlist UI
//   function renderPlaylist() {
//     songList.innerHTML = "";
//     songs.forEach((song, index) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = `${song.title} - ${song.artist}`;
//       listItem.addEventListener("click", () => {
//         currentSongIndex = index;
//         playSong();
//       });
//       songList.appendChild(listItem);
//     });
//   }
  
//   // Event listeners for play, pause, next, and previous buttons
//   document.getElementById("play").addEventListener("click", () => {
//     playSong();
//   });
  
//   document.getElementById("pause").addEventListener("click", () => {
//     audioPlayer.pause();
//   });
  
//   document.getElementById("next").addEventListener("click", () => {
//     currentSongIndex = (currentSongIndex + 1) % songs.length;
//     playSong();
//   });
  
//   document.getElementById("previous").addEventListener("click", () => {
//     currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
//     playSong();
//   });
  
//   // Initial setup
//   renderPlaylist();
  











































































































































// // Define an array of songs with their titles and file paths
// const songs = [
//     {
//       title: "Haule-Haule",
//       file: "C:\Users\my-laptop\OneDrive\Desktop\MUSIC-PLAYER\haule.mp3"
//     },
//     {
//       title: "Jhommbe",
//       file: "C:\Users\my-laptop\OneDrive\Desktop\MUSIC-PLAYER\jhommbe.mp3"
//     },
//     // Add more songs as needed
//   ];
  
//   // Get the playlist element
//   const playlist = document.getElementById("playlist");
  
//   // Create a function to populate the playlist
//   function populatePlaylist() {
//     songs.forEach((song, index) => {
//       const listItem = document.createElement("li");
//       listItem.textContent = song.title;
//       listItem.addEventListener("click", () => {
//         playSong(index);
//       });
//       playlist.appendChild(listItem);
//     });
//   }
  
//   // Create a function to play a song
//   function playSong(index) {
//     const audioPlayer = document.getElementById("audioPlayer");
//     audioPlayer.src = songs[index].file;
//     audioPlayer.play();
//   }
  
//   // Call the populatePlaylist function to initialize the player
//   populatePlaylist();
  