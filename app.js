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

const player = new MusicPlayer(musicList);

window.addEventListener("load", () =>{
    let music = player.getMusic();
    displayMusic(music);
});

function displayMusic(music){
    title.innerText = music.getName();
    singer.innerText = music.singer;
    image.src = "img/" + music.img;
    audio.src = "mp3/" + music.file;
}

play.addEventListener('click', () =>{
    const isMusicPlay = container.classList.contains("playing");
    isMusicPlay ? pauseMusic() : playMusic();
});

prev.addEventListener("click", () =>{
    prevMusic();
});
function prevMusic(){
    player.previous();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();

}

next.addEventListener("click", () =>{
    nextMusic();
    let music = player.getMusic();
    displayMusic(music);
    playMusic();
});
function nextMusic(){
    player.next();
}

function pauseMusic(){
    container.classList.remove("playing");
    play.classList = "fa-solid fa-play";
    audio.pause();
}

function playMusic(){
    container.classList.add("playing");
    play.classList = "fa-solid fa-pause";
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
    currentTime.textContent =calculateTime(progressBar.value);
});