let sideMenu = document.querySelector('.side-menu');
let audio = document.getElementById("audio");
let playpause = document.getElementById("play-pause");
let progress = document.querySelector('.progress');
let currentTime = document.querySelector('.current-time');
let duration = document.querySelector('.duration');
let title = document.querySelector('.played-title');
let artist = document.querySelector('.played-artist');
let playedImg = document.querySelector('.played-img');
let songsList = document.querySelector('.songs-list');
let muteBtn = document.querySelector('.mute-btn');
let isPlay=false;
let songIndex=0;
let songs=[
    {
        audiosrc:'audio/No_Rest_Or_Endless_Rest_-_Lisofv.mp3',
        artist:'LISOFV',
        poster:'rest.jpeg',
        title:'No Rest Or Endless Rest'
    },
    {
        audiosrc:'audio/The_Deep_-_Anitek.mp3',
        artist:'ANITEK',
        poster:'deep.jpeg',
        title:'The Deep'
    },
    {
        audiosrc:'audio/Alone_-_Color_Out.mp3',
        artist:'COLOR OUT',
        poster:'alone.jpeg',
        title:'Alone'
    },
    {
        audiosrc:'audio/LEEONA_-_LEEONA_-_Do_I.mp3',
        artist:'Zara Arshakian',
        poster:'doI.jpeg',
        title:'LEEONA - Do I'
    },
    {
        audiosrc:'audio/Color_Out_-_Host.mp3',
        artist:'Color Out',
        poster:'host.jpeg',
        title:'Host'
    },
];

//listing the songs in the side-menu
function AppendSongsList(){
    for(const [index,song] of songs.entries()){
        let songId = index+1;
        if(songId < 10){
            songId = `0${songId}`
        }
        songsList.insertAdjacentHTML('beforeend', `
        <div class="song" onclick="CurrentSong(${index}); PlaySong(${index})">
            <div class="song-index">${songId}</div>
            <div class="song-img" style="background-image:url(images/${song.poster})"></div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
            </div>
        </div>`);
    }
}

//get Audio current time
function AudioInfo(e){
    let audioDuration = e.srcElement.duration*1;
    let audioCurrent=e.target.currentTime*1;
    let progressPercentage=(audioCurrent/audioDuration)*100;
    progress.style.width=`${progressPercentage}%`;
    if(audioCurrent){
        let audioCurrentMinute = Math.floor(audioCurrent/60);
        let audioCurrentSeconds = Math.floor(audioCurrent%60);
        if(audioCurrentMinute<10){
            audioCurrentMinute = `0${audioCurrentMinute}`
        }
        if(audioCurrentSeconds<10){
            audioCurrentSeconds = `0${audioCurrentSeconds}`
        }
        currentTime.textContent = `${audioCurrentMinute}:${audioCurrentSeconds}`;
    }
}

//update progress Bar on click
function UpdateProgress(e){
    let progressPercentage = (e.offsetX*1 / e.srcElement.offsetWidth*1);
    const {duration} = audio;
    audio.currentTime = progressPercentage * duration;
}

//by default get the currentSong and display it's informations
function CurrentSong(index){
    audio.src=songs[index].audiosrc;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
    playedImg.style.backgroundImage=`url('images/${songs[index].poster}')`;
    audio.addEventListener('loadedmetadata', function() {
        let audioDuration = audio.duration;
        if(audioDuration){
            let audioDurationMinute = Math.floor(audioDuration/60);
            let audioDurationSeconds = Math.floor(audioDuration%60);
            if(audioDurationMinute<10){
                audioDurationMinute = `0${audioDurationMinute}`
            }
            if(audioDurationSeconds<10){
                audioDurationSeconds = `0${audioDurationSeconds}`
            }
            duration.textContent = `${audioDurationMinute}:${audioDurationSeconds}`
        }
    })
}
function PlaySong(index){
    playpause.querySelector('.fa-solid').classList.replace('fa-play','fa-spinner');
    audio.play().then(()=>{
        isPlay=true;
        playpause.querySelector('.fa-solid').classList.replace('fa-spinner','fa-pause');
    }).catch((e)=>console.log(e))
}
function PauseSong(){
    audio.pause();
    isPlay=false;
    playpause.querySelector('.fa-solid').classList.replace('fa-spinner','fa-play');
}
function PlayPause(){
    if(isPlay){        
        PauseSong(songIndex)
    }else{
        PlaySong(songIndex);
    }
}
function Next(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex=0;
    }
    CurrentSong(songIndex);
    PlaySong(songIndex);
}
function Previous(){
    songIndex--;
    if(songIndex < 0){
        songIndex=songs.length-1;
    }
    CurrentSong(songIndex);
    PlaySong(songIndex);
}
function Mute(){
    if(audio.muted){
        audio.muted = false;
        muteBtn.querySelector('.fa-solid').classList.replace('fa-volume-xmark','fa-volume-high');
    }else{
        audio.muted = true;
        muteBtn.querySelector('.fa-solid').classList.replace('fa-volume-high','fa-volume-xmark');
    }
}
function ToggleSideMenu(){
    sideMenu.classList.toggle("opened-side-menu")
}

AppendSongsList();
CurrentSong(songIndex);
