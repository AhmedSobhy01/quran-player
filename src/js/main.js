const readers = document.querySelectorAll(".reader-elm"),
    audios = document.querySelectorAll(".audio-elm"),
    player = document.createElement("audio"),
    prevBtn = document.getElementById("previous-btn"),
    playBtn = document.getElementById("play-btn"),
    nextBtn = document.getElementById("next-btn"),
    volumeControl = document.getElementById("volume"),
    currentTime = document.getElementsByClassName("player-controller__timeline-current")[0],
    totalDuration = document.getElementsByClassName("player-controller__timeline-duration")[0],
    currentNameElm = document.getElementsByClassName("player-controller__info-name")[0],
    currentReaderElm = document.getElementsByClassName("player-controller__info-reader")[0],
    timeLine = document.getElementsByClassName("player-controller__timeline")[0],
    timeLineProgress = document.querySelector(".player-controller__timeline-progress");

let currentName = "",
    currentReader = "",
    currentId = 001,
    playing = false;

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("vol")) {
        checkMute(localStorage.getItem("vol"));
        player.volume = localStorage.getItem("vol");
        volumeControl.value = localStorage.getItem("vol");
    }
});

volumeControl.addEventListener("input", () => {
    checkMute(volumeControl.value);
    player.volume = volumeControl.value;
    localStorage.setItem("vol", volumeControl.value);
});
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

readers.forEach((reader) => {
    reader.addEventListener("click", () => {
        document.body.dataset.reader = reader.dataset.reader;
        document.getElementsByClassName("readers-list")[0].classList.add("left");
        setTimeout(() => {
            document.getElementsByClassName("readers-list")[0].classList.add("d-none");
        }, 300);
    });
});

timeLine.addEventListener("click", (e) => {
    if (playing === false) {
        return false;
    }
    let position = e.offsetX / timeLine.offsetWidth;
    player.currentTime = player.duration * position;
});

timeLineProgress.addEventListener("drag", (e) => {
    if (playing === false) {
        return false;
    }
    pause();
    let position = (e.offsetX / timeLine.offsetWidth) * 100;
    timeLineProgress.style.width = `${position}%`;
});

timeLineProgress.addEventListener("dragend", (e) => {
    if (playing === false) {
        return false;
    }
    let position = e.offsetX / timeLine.offsetWidth;
    player.currentTime = player.duration * position;
    play();
});

audios.forEach((audio) => {
    audio.addEventListener("click", () => {
        let id = audio.id,
            name = audio.dataset.name,
            reader = document.body.dataset.reader;
        runPlayer(id, reader, name);
    });
});

player.addEventListener("loadedmetadata", () => {
    updateDuration(calcTotal(player.duration));
});

player.addEventListener("timeupdate", () => {
    document.getElementsByClassName("player-controller__timeline-progress")[0].style.width = `${(player.currentTime / player.duration) * 100}%`;
    currentTime.innerHTML = calcTotal(player.currentTime);
});

player.addEventListener("ended", () => {
    playing = false;
    updatePlayBtn();
    if (currentId > 0 && currentId < 114) {
        next();
    }
});

playBtn.addEventListener("click", () => {
    if (playing === true) {
        pause();
        playing = false;
    } else {
        if (player.src == "") {
            if (document.body.dataset.reader !== "") {
                changeSrc(`${document.body.dataset.reader}/001.mp3`);
                updateData(document.getElementById("001").dataset.name, "001");
            } else {
                return false;
            }
        }
        play();
    }
    updatePlayBtn();
});

function runPlayer(fileId, reader, name) {
    checkId(parseInt(fileId));
    changeSrc(`${reader}/${fileId}.mp3`);
    play();
    updateData(name, fileId);
}
function changeSrc(src) {
    player.src = `media/${src}`;
    return true;
}
function play() {
    playing = true;
    updatePlayBtn();
    player.play();
    return true;
}
function pause() {
    playing = false;
    updatePlayBtn();
    player.pause();
    return true;
}
function updateData(sora, id) {
    document.querySelectorAll(".audio-elm").forEach((elm) => {
        elm.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
    currentId = id;
    currentName = sora;
    currentReader = document.body.dataset.reader;
    currentNameElm.innerHTML = sora;
    currentReaderElm.innerHTML = document.body.dataset.reader;
}
function calcTotal(timeInseconds) {
    let time = timeInseconds,
        hours = null,
        minutes = null,
        seconds = null,
        fullTime = "";

    hours = Math.floor(time / 3600);
    time = time - hours * 3600;
    minutes = Math.floor(time / 60);
    seconds = Math.floor(time - minutes * 60);

    seconds = seconds < 10 ? `0${seconds}` : seconds;

    if (hours == 0) {
        fullTime = `${minutes}:${seconds}`;
    } else {
        fullTime = `${hours}:${minutes}:${seconds}`;
    }
    return fullTime;
}
function updateDuration(time) {
    currentTime.innerHTML = "0:00";
    totalDuration.innerHTML = time;
}
function updatePlayBtn() {
    if (playing === true) {
        playBtn.querySelector("i").classList.remove("fa-play-circle");
        playBtn.querySelector("i").classList.add("fa-pause-circle");
    } else {
        playBtn.querySelector("i").classList.remove("fa-pause-circle");
        playBtn.querySelector("i").classList.add("fa-play-circle");
    }
}
function checkId(id) {
    if (id <= 1) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }
    if (id >= 114) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
    return false;
}
function prev() {
    let id = parseInt(currentId) - 1;
    if (id < 10) {
        id = `00${id}`;
    } else if (id > 9 && id < 100) {
        id = `0${id}`;
    } else {
        id = String(id);
    }
    let name = document.getElementById(id).dataset.name,
        reader = document.body.dataset.reader;
    runPlayer(id, reader, name);
}
function next() {
    let id = parseInt(currentId) + 1;
    if (id < 10) {
        id = `00${id}`;
    } else if (id > 9 && id < 100) {
        id = `0${id}`;
    } else {
        id = String(id);
    }
    let name = document.getElementById(id).dataset.name,
        reader = document.body.dataset.reader;
    runPlayer(id, reader, name);
}
function checkMute(val) {
    let icon = volumeControl.parentElement.querySelector("i");
    if (val == 0) {
        icon.classList.remove("fa-volume-up");
        icon.classList.add("fa-volume-mute");
    } else {
        icon.classList.remove("fa-volume-mute");
        icon.classList.add("fa-volume-up");
    }
}
