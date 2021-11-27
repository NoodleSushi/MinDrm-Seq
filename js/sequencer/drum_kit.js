export default class DrumKit {
    constructor(kit_id = 0) {
        this.audio_files = []
        this.set_drum_kit(kit_id)
        this.kit_id = kit_id
    }

    play_drum(channel) {
        this.audio_files[channel].currentTime = 0
        this.audio_files[channel].play()
    }

    pause_drum(channel) {
        this.audio_files[channel].pause()
    }

    set_drum_kit(kit_id) {
        this.kit_id = kit_id
        switch (kit_id) {
            case 0:
                this.audio_files = [
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
            case 1:
                this.audio_files = [
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
            case 2:
                this.audio_files = [
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
            case 3:
                this.audio_files = [
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
            case 4:
                this.audio_files = [
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
            case 5:
                this.audio_files = [
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
}