// Connection to server
var socket = io.connect("http://localhost:3000", {
    reconnection: true
});

socket.on('connect', function () {
    socket.on('message',msg => {
        alert(msg);
    })

    socket.on('vid-state',state=>{
        if(vid.paused){
            vid.play();
         }
         else {
            vid.pause();
         }
    })

    socket.on('progress-bar-clicked',newTime => {
        vid.currentTime = newTime;
    })

});

// Client side
const vid = document.getElementById('videoPlayer');
const playPauseBtn = document.getElementById('play-pause');
const progress = document.getElementById('progress-bar');
const fullscreenBtn = document.getElementById('fullscreen');
const container = document.getElementById('container');

fullscreenBtn.addEventListener('click',openFullscreen);
playPauseBtn.addEventListener('click',pauseOrstart);
vid.addEventListener('click',pauseOrstart);

vid.addEventListener('timeupdate', function() {
    var progressBar = document.getElementById('progress-bar');
    var percentage = Math.floor((100 / vid.duration) * vid.currentTime);
    progressBar.value = percentage;
    progressBar.innerHTML = percentage + '% played';
 });
 
 
 progress.addEventListener('click', function(e) {
    var pos = (e.pageX  - this.offsetLeft) / this.offsetWidth;
    var newTime =pos * vid.duration;
    socket.emit('progress-bar-clicked',newTime);
 });

function pauseOrstart(){
    socket.emit('vid-state','clicked');
}

function openFullscreen(){
    if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) { /* Safari */
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) { /* IE11 */
        container.msRequestFullscreen();
      }
}



