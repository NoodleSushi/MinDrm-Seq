let audio_files = []

function set_drum_kit(kit_id)
{
    switch (kit_id)
    {
        case "0":
            audio_files = [
                new Audio("sounds/505 BD.wav"),
                new Audio("sounds/505 SD.wav"),
                new Audio("sounds/505 CH.wav"),
                new Audio("sounds/505 OH.wav"),
                new Audio("sounds/505 Crash.wav"),
                new Audio("sounds/505 Tom Hi.wav"),
                new Audio("sounds/505 Tom Mid.wav"),
                new Audio("sounds/505 Tom Lo.wav"),
                new Audio("sounds/505 Ride.wav")
            ]
            break;
        case "1":
            audio_files = [
                new Audio("sounds/606 BD.wav"),
                new Audio("sounds/606 Snare.wav"),
                new Audio("sounds/606 CH.wav"),
                new Audio("sounds/606 OH.wav"),
                new Audio("sounds/606 Cymbal.wav"),
                new Audio("sounds/606 Tom Hi.wav"),
                new Audio("sounds/606 Tom Mid.wav"),
                new Audio("sounds/606 Tom Lo.wav"),
                new Audio("sounds/606 Cymbal.wav")
            ]
            break;
        case "2":
            audio_files = [
                new Audio("sounds/707 BD A.wav"),
                new Audio("sounds/707 SD A.wav"),
                new Audio("sounds/707 CH.wav"),
                new Audio("sounds/707 OH.wav"),
                new Audio("sounds/707 Crash.wav"),
                new Audio("sounds/707 Tom Hi.wav"),
                new Audio("sounds/707 Tom Mid.wav"),
                new Audio("sounds/707 Tom Lo.wav"),
                new Audio("sounds/707 Ride.wav")
            ]
            break;
        case "3":
            audio_files = [
                new Audio("sounds/808 BD.wav"),
                new Audio("sounds/808 Snare.wav"),
                new Audio("sounds/808 CH.wav"),
                new Audio("sounds/808 OH.wav"),
                new Audio("sounds/808 Crash.wav"),
                new Audio("sounds/808 Tom Hi.wav"),
                new Audio("sounds/808 Tom Mid.wav"),
                new Audio("sounds/808 Tom Lo.wav"),
                new Audio("sounds/808 Crash.wav")
            ]
            break;
        case "4":
            audio_files = [
                new Audio("sounds/CR78 BD.wav"),
                new Audio("sounds/CR78 SD.wav"),
                new Audio("sounds/CR78 CH.wav"),
                new Audio("sounds/CR78 OH.wav"),
                new Audio("sounds/CR78 OH.wav"),
                new Audio("sounds/CR78 Tom Hi.wav"),
                new Audio("sounds/CR78 Tom Mid.wav"),
                new Audio("sounds/CR78 Tom Lo.wav"),
                new Audio("sounds/CR78 OH.wav")
            ]
            break;
        case "5":
            audio_files = [
                new Audio("sounds/LinnDrum BD.wav"),
                new Audio("sounds/LinnDrum SD.wav"),
                new Audio("sounds/LinnDrum CH.wav"),
                new Audio("sounds/LinnDrum OH.wav"),
                new Audio("sounds/LinnDrum Ride.wav"),
                new Audio("sounds/LinnDrum Tom Hi.wav"),
                new Audio("sounds/LinnDrum Tom Mid.wav"),
                new Audio("sounds/LinnDrum Tom Lo.wav"),
                new Audio("sounds/LinnDrum Crash.wav")
            ]
            break;
    }
}
set_drum_kit("2")

let sequence_matrix = []
let sequence_length = 16
let marker = 0

for (let inst_idx = 0; inst_idx < audio_files.length; inst_idx++) {
    sequence_matrix.push([])
    for (let mrkr_idx = 0; mrkr_idx < sequence_length; mrkr_idx++) {
        sequence_matrix[inst_idx].push(false)
    }
}


let markers = document.getElementsByClassName("marker")
let noodle_img = document.getElementsByClassName("noodle")[0]
let noodle_frames = [
    "noodle/NoodleDrums_00001.png",
    "noodle/NoodleDrums_00002.png",
    "noodle/NoodleDrums_00003.png",
    "noodle/NoodleDrums_00004.png",
    "noodle/NoodleDrums_00005.png",
    "noodle/NoodleDrums_00006.png",
    "noodle/NoodleDrums_00007.png",
    "noodle/NoodleDrums_00008.png",
]
// stuff

function update_marker_indicator()
{
    // update marker indicator
    for (let i = 0; i < markers.length; i++) {
        markers[i].checked = false
    }
    markers[marker].checked = true
}

function play_beat() {
    update_marker_indicator()

    // play audio
    for (let i = 0; i < audio_files.length; i++) {
        if (sequence_matrix[i][marker]) {
            
            audio_files[i].currentTime = 0
            audio_files[i].play()
            if (i == 2) {
                audio_files[3].pause()
            }
        }
    }

    // change noodle frame
    let noodle_frame = 0
    if (sequence_matrix[0][marker]) {
        noodle_frame += 4
    }
    if (sequence_matrix[1][marker]) {
        noodle_frame += 2
    }
    if (sequence_matrix[2][marker] || sequence_matrix[3][marker] || sequence_matrix[4][marker] || sequence_matrix[5][marker] || sequence_matrix[6][marker] || sequence_matrix[7][marker] || sequence_matrix[8][marker]) {
        noodle_frame += 1
    }

    noodle_img.src = noodle_frames[noodle_frame]

    // update marker
    marker = (marker + 1) % sequence_length
}

Timer = setInterval(play_beat, 300)
isplaying = true
current_interval = 0
function change_bpm() {
    let bpm_element = document.getElementById("input_bpm")
    let bpm_value = Math.min(522, Math.max(10, bpm_element.value))
    bpm_element.value = bpm_value
    current_interval = (60000/bpm_value)/4
    if (isplaying) {
        clearInterval(Timer)
        console.log(current_interval);
        console.log(bpm_value);
        Timer = setInterval(play_beat, current_interval)
    }
}

change_bpm()
function toggle_play() {
    if (isplaying) {
        clearInterval(Timer)
        marker = 0
        update_marker_indicator()
    } else {
        marker = 0
        Timer = setInterval(play_beat, current_interval)
    }
    isplaying = !isplaying
}

function modify_sequence(inst_idx, mkr_idx)
{
    sequence_matrix[inst_idx][mkr_idx] = !sequence_matrix[inst_idx][mkr_idx]
}
