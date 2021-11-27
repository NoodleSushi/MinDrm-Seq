export default class NoodleImage {
    constructor(noodle_img) {
        this.noodle_img = noodle_img
        this.frame_paths = [
            "noodle/NoodleDrums_00001.png",
            "noodle/NoodleDrums_00002.png",
            "noodle/NoodleDrums_00003.png",
            "noodle/NoodleDrums_00004.png",
            "noodle/NoodleDrums_00005.png",
            "noodle/NoodleDrums_00006.png",
            "noodle/NoodleDrums_00007.png",
            "noodle/NoodleDrums_00008.png",
        ]
    }

    edit_frame(is_kick = false, is_snare = false, is_etc = false) {
        let noodle_frame = 0
        if (is_kick) {
            noodle_frame += 4
        }
        if (is_snare) {
            noodle_frame += 1
        }
        if (is_etc) {
            noodle_frame += 2
        }
        this.noodle_img.src = this.frame_paths[noodle_frame]
    }
}