export default class NoodleImage {
    constructor(div_elem) {
        console.log(div_elem)
        this.frame_imgs = [
            "noodle/NoodleDrums_00001.png",
            "noodle/NoodleDrums_00002.png",
            "noodle/NoodleDrums_00003.png",
            "noodle/NoodleDrums_00004.png",
            "noodle/NoodleDrums_00005.png",
            "noodle/NoodleDrums_00006.png",
            "noodle/NoodleDrums_00007.png",
            "noodle/NoodleDrums_00008.png",
        ].map(frame_path => {
            const img = document.createElement("img")
            img.src = frame_path
            img.style.display = 'none'
            div_elem.appendChild(img)
            return img
        })
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
        this.frame_imgs.forEach((frame_img, idx) => {
            frame_img.style.display = (idx === noodle_frame) ? 'block' : 'none'
        })
    }
}