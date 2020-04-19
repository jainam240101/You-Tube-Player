const socket=io()
console.log("App.js")
var id="FjQk-2jHevs"
rules={
    "Unstarted":-1,
    "Ended":0,
    "Playing":1,
    "Paused":2,
    "Buffering":3
}

var player;
console.log(id)
function onYouTubeIframeAPIReady() {
    console.log("API Calls")
    player = new YT.Player('player', {
        height: '490',
        width: '900',
        videoId: id,    
        events:{
            onStateChange:state
        }
    });
}
function state(value){
    for(var i in rules){
        if(rules[i]===value.data){
            socket.emit('state',{state:i,currenttime:player.getCurrentTime()})
        }
    }
}
socket.on('change_state',(value)=>{
    console.log(value)
    if(value.state==='Playing'){
        player.playVideo();
        player.seekTo(seconds=value.currenttime,allowSeekAhead=false)
        console.log("State Changed ",value.state)
    }
    else if(value.state==='Paused'){
        player.pauseVideo()
        player.seekTo(seconds=value.currenttime,allowSeekAhead=false)
        console.log("State Changed ",value.state)
    }
    // else if(value.state==='Buffering'){
    //     player.seekTo(seconds=value.currenttime)
    //     // player.playVideo()
    //     console.log("State Changed ",value.state)
    // }
})