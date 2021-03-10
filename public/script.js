// Connection to server
var socket = io.connect("http://movieserver-env.eba-btgpyma3.us-east-1.elasticbeanstalk.com/", {
    reconnection: true
});

socket.on('connect', function () {
    socket.on('message',msg => {
        alert(msg);
    })

    socket.on('vid-state',state=>{
        console.log(state);
        if(state == 1){
            vid.play();
        }
        else if(state == 0){
            vid.pause();
        }
    })

});

// Client side
const vid = document.getElementById('videoPlayer');
const videoDiv = document.getElementById('videoDiv');


vid.addEventListener('click',pauseOrstart);

// 0 refers to pause, 1 refers to start
let state = 0;


function pauseOrstart(){
    if(state==0){
        state = 1;
    }
    else if(state == 1){
        state = 0;
    }
    socket.emit('vid-state',state);
}




