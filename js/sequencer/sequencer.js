import SequenceData from "./sequence_data.js"
import DrumKit from "./drum_kit.js"

export default class Sequencer {
    constructor() {
        this.sequence_data = new SequenceData(16, 9)
        this.drum_kit = new DrumKit()
        this.steps_per_beat = 4
        this.marker_position = 0
    }

    reset_play_marker() {
        this.marker_position = 0
    }

    update() {
        for (let channel = 0; channel < this.sequence_data.get_channel_count(); channel++) {
            if (this.sequence_data.is_step_on(channel, this.marker_position)) {
                this.drum_kit.play_drum(channel)
                if (channel == 2) {
                    this.drum_kit.pause_drum(3)
                }
            }
        }
        this.marker_position += 1
        this.marker_position %= this.sequence_data.get_step_count()
    }

    get_marker_position() {
        return this.marker_position
    }

    is_step_on(channel) {
        return this.sequence_data.is_step_on(channel, this.marker_position)
    }
}
