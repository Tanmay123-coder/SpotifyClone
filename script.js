console.log('Welcome');

// Initializing necessary variables
let songIndex = 0;  // Start from the first song
let audioElement = new Audio('songs/1.mp3');  // Default audio element
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItemsContainer = document.querySelector('.songItemContainer');
let playButtons = Array.from(document.getElementsByClassName('songItemPlay'));
let nextButton = document.getElementById('Next');
let previousButton = document.getElementById('previous');

// Array of song objects (we match this with the song items in HTML)
let songs = [
    { songName: 'Let Me Love You', filePath: 'songs/1.mp3', coverPath: 'images/1.jpg' },
    { songName: 'Faded', filePath: 'songs/2.mp3', coverPath: 'images/2.jpg' },
    { songName: 'The Spectre', filePath: 'songs/3.mp3', coverPath: 'images/3.jpg' },
    { songName: 'Tides', filePath: 'songs/4.mp3', coverPath: 'images/4.jpg' },
    { songName: 'Fade', filePath: 'songs/5.mp3', coverPath: 'images/5.jpg' },
    { songName: 'Back To You', filePath: 'songs/6.mp3', coverPath: 'images/6.jpg' },
    { songName: 'On & On', filePath: 'songs/7.mp3', coverPath: 'images/7.jpg' }
];

// Function to create the song item elements dynamically
function loadSongs() {
    songs.forEach((song, index) => {
        const songItem = document.createElement('div');
        songItem.classList.add('songItem');

        songItem.innerHTML = `
            <img src="${song.coverPath}" alt="${song.songName}">
            <span class="songName">${song.songName}</span>
            <span class="songListplay">
                <span class="timeStamp">5:30<i id="${index}" class="fa-solid songItemPlay fa-play"></i></span>
            </span>
        `;

        songItemsContainer.appendChild(songItem);
    });
}

// Load all songs on page load
loadSongs();

// Event listener to toggle play/pause for the master play button
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = '1';
    } else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = '0';
    }
});

// Update progress bar based on current time of the audio
audioElement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
});

// Handle progress bar change
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
});

// Reset all play buttons to play state
function makeAllPlay() {
    playButtons.forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
}

// Play the song based on button click
document.querySelectorAll('.songItemPlay').forEach((element) => {
    element.addEventListener('click', (e) => {
        let index = parseInt(e.target.id);  // Get the song index
        makeAllPlay();  // Reset all other play buttons
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src = songs[index].filePath;  // Set the audio source to the selected song
        audioElement.play();
        audioElement.currentTime = 0;  // Start from the beginning
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        updateSongUI(index);
    });
});

// Update the song information (name and cover)
function updateSongUI(index) {
    document.getElementById('currentSongName').textContent = songs[index].songName;
    document.getElementById('currentCover').src = songs[index].coverPath;
}

// Next button functionality
nextButton.addEventListener('click', () => {
    if (songIndex >= songs.length - 1) {
        songIndex = 0;  // Loop back to the first song
    } else {
        songIndex += 1;  // Move to the next song
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    audioElement.currentTime = 0;  // Start from the beginning
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    updateSongUI(songIndex);
});

// Previous button functionality
previousButton.addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = songs.length - 1;  // Loop back to the last song
    } else {
        songIndex -= 1;  // Move to the previous song
    }
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    audioElement.currentTime = 0;  // Start from the beginning
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    updateSongUI(songIndex);
});
