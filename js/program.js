import Sequencer from "./sequencer/sequencer.js"
import NoodleImage from "./noodle_image.js"
import { Base64Serializer, Base64Deserializer } from "./base64.js"

export default class Program {
    constructor() {
        // html elements
        this.marker_checkboxes = document.getElementsByClassName("marker")
        this.bpm_element = document.getElementById("input_bpm")
        this.drum_kit_element = document.getElementById("drum_kit_select")
        this.save_url_element = document.getElementById("save_url")
        this.step_elements = []
        for (let i = 0; i < 9; i++) {
            this.step_elements = this.step_elements.concat(document.getElementsByClassName("step_box" + i.toString()))
        }
        // objects
        this.noodle_image = new NoodleImage(document.getElementsByClassName("noodle")[0])
        this.sequencer = new Sequencer()

        this.is_playing = true
        this.bpm_interval = 300
        this.bpm_value = 0
        this.timer = null
        this.start_timer()
    }

    main() {
        this.sequencer.drum_kit.set_drum_kit(2)
        this.set_bpm(120)
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has("c")) {
            this.deserialize(urlParams.get("c"))
        }
    }

    update_marker_checkboxes() {
        for (let idx = 0; idx < this.marker_checkboxes.length; idx++) {
            this.marker_checkboxes[idx].checked = false
        }
        this.marker_checkboxes[this.sequencer.get_marker_position()].checked = true
    }

    play_beat() {
        let is_etc = false
        for (let i = 2; i < 9; i++) {
            is_etc = is_etc || this.sequencer.is_step_on(i)
        }
        this.noodle_image.edit_frame(
            this.sequencer.is_step_on(0),
            this.sequencer.is_step_on(1),
            is_etc
        )
        this.update_marker_checkboxes()
        this.sequencer.update()
    }

    set_bpm(new_bpm) {
        this.bpm_value = new_bpm
        this.bpm_element.value = this.bpm_value
        this.bpm_interval = 60000/(this.bpm_value*4)

        if (this.is_playing) {
            clearInterval(this.timer)
            this.start_timer()
        }
    }

    start_timer() {
        this.timer = setInterval(() => {this.play_beat()}, this.bpm_interval)
    }

    get_serialized() {
        const s = new Base64Serializer()
        // bpm
        s.push_int(this.bpm_value, 9)
        // drum machine
        s.push_int(this.sequencer.drum_kit.kit_id, 3)
        // sequencer_data
        this.sequencer.sequence_data.dump_to_serializer(s)
        return s.get_serialized()
    }

    deserialize(base64) {
        const d = new Base64Deserializer()
        d.load_base64(base64)
        // bpm
        const new_bpm = d.pop_int(9)
        this.set_bpm(new_bpm)
        // drum machine
        const drum_kit_id = d.pop_int(3)
        this.sequencer.drum_kit.set_drum_kit(drum_kit_id)
        this.drum_kit_element.value = drum_kit_id.toString()
        // sequencer data
        this.sequencer.sequence_data.deserialize(d, this.step_elements)
    }

    update_save_url() {
        const myurl = new URL(window.location.href.split('?')[0])
        myurl.searchParams.append("c", this.get_serialized())
        this.save_url_element.value = myurl.toString()
    }

    Itoggle_step(channel, position) {
        this.sequencer.sequence_data.toggle_step(channel, position)
        this.update_save_url()
    }

    Itoggle_play() {
        if (this.is_playing) {
            clearInterval(this.timer)
            this.sequencer.reset_play_marker()
            this.update_marker_checkboxes()
            this.noodle_image.edit_frame()
        } else {
            this.start_timer()
        }
        this.is_playing = !this.is_playing
    }

    Iset_drum_kit(drum_kit_id) {
        this.sequencer.drum_kit.set_drum_kit(drum_kit_id)
        this.update_save_url()
    }

    Iupdate_bpm() {
        this.set_bpm(Math.min(511, Math.max(10, this.bpm_element.value)))
        this.update_save_url()
    }
}
