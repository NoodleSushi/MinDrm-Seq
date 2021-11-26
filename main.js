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

// stuff

function play_beat() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].checked = false
    }
    markers[marker].checked = true
    for (let i = 0; i < audio_files.length; i++) {
        if (sequence_matrix[i][marker]) {
            
            audio_files[i].currentTime = 0
            audio_files[i].play()
            if (i == 2) {
                audio_files[3].pause()
            }
        }
    }
    marker = (marker + 1) % sequence_length
}

Timer = setInterval(play_beat, 300)

function change_bpm() {
    let bpm_element = document.getElementById("input_bpm")
    let bpm_value = Math.min(522, Math.max(10, bpm_element.value))
    bpm_element.value = bpm_value

    clearInterval(Timer)
    let bb = (60000/bpm_value)/4
    console.log(bb);
    console.log(bpm_value);
    Timer = setInterval(play_beat, bb)
}

change_bpm()

function modify_sequence(inst_idx, mkr_idx)
{
    sequence_matrix[inst_idx][mkr_idx] = !sequence_matrix[inst_idx][mkr_idx]
}
