// NEED TO ADD FULL SCREEN, APPEND TIME

// Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBarr = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const timeElapsed = player.querySelector('#time-elapsed');
const fullscreen = player.querySelector('.fullscreen');
// Functions
function togglePlay(){
    const method = video.paused ? 'play' : 'pause';
    // if (video.paused) {
    //     video.play();
    // } else {
    //     video.pause();
    // }

    video[method]();

}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    console.log(this.name);
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBarr.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleTime(secsDur) {
    var time = video.currentTime;
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time);
    // var seconds = time.toString().split('.')[1].substr('0','1'); 
    // let hrs = Math.floor(secsDur / 3600);
    // let mins = Math.floor((secsDur - (hrs * 3600)) / 60);
    // let secs = Math.floor(secsDur - (hrs * 3600) - (mins * 60));

    minutes < 10 ? minutes : "0" + minutes; 
    seconds < 10 ? seconds : "0" + seconds;

    let totalTime = `${minutes} : ${seconds}`;
    return totalTime
}

function fullScreenSize(){
    if (video.requestFullScreen) {
        video.requestFullScreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen(); //Firefox
    }else if (video.webkitRequestFullScreen) {
        video.webkitRequestFullScreen(); // Chrome and Safari
    }
}

timeElapsed.textContent = `${handleTime(video.currentTime)} / ${handleTime(video.duration)}`;


// Hook up event listneers
video.addEventListener('canplay', handleTime);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('click', handleTime);
toggle.addEventListener('click', togglePlay);
fullscreen.addEventListener('click', fullScreenSize);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = true);