const container = document.querySelector('.container');
const image = document.getElementById('music-image');
const audio = document.getElementById('audio');
const title = document.querySelector('#music-details .title');
const singer = document. querySelector('#music-details .singer');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
const progressBar = document.getElementById('progress-bar');
const currentTime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const volume = document.getElementById('volume');
const volumeBar = document.getElementById('volume-bar');

const player = new MusicPlayer(musicList);

window.addEventListener("load", () =>{
    let music = player.getMusic();
    displayMusic(music);
});

const displayMusic = (music) =>{
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener('click', () =>{
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () =>{ prevMusic(); });

const prevMusic = () =>{
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

next.addEventListener("click", () =>{ nextMusic(); });

const nextMusic = () =>{
    player.next();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
}

const pauseMusic = () => {
    container.classList.remove("playing");
    play.querySelector('i').classList = "fa-solid fa-play";
    audio.pause();
}

const playMusic = () =>{
    container.classList.add("playing");
    play.querySelector('i').classList = "fa-solid fa-pause";
    audio.play();
}
const calculateTime = (totalSecond) => {
    const minute = Math.floor(totalSecond / 60);
    const second = Math.floor(totalSecond % 60);
    const updateSecond = second < 10 ? `0${second}` : `${second}`;
    const output = `${minute}:${updateSecond}`;
    return output;
}

audio.addEventListener('loadedmetadata', () =>{
    duration.textContent = calculateTime(audio.duration);
    progressBar.max = Math.floor(audio.duration);
});
audio.addEventListener('timeupdate', () =>{
    progressBar.value = Math.floor(audio.currentTime);
    currentTime.textContent = calculateTime(progressBar.value);
});

progressBar.addEventListener('input', () =>{
    currentTime.textContent = calculateTime(progressBar.value);
    audio.currentTime = progressBar.value;
});

let muteStatus = "muted";

volumeBar.addEventListener('input', (e)=>{
    const value = e.target.value;
    audio.volume = value / 100;
    if(value == 0){
        volume.classList ="fa-solid fa-volume-xmark";
    }
    else{
        volume.classList = "fa-solid fa-volume-high";
    }
});

volume.addEventListener('click', () =>{
    if(muteStatus === "muted"){
        audio.muted= true;
        muteStatus = "unmuted";
        volume.classList ="fa-solid fa-volume-xmark";
        volumeBar.value = 0;
    }else{
        audio.muted= false;
        muteStatus = "muted";
        volume.classList = "fa-solid fa-volume-high";
        volumeBar.value = 100;
    }
});