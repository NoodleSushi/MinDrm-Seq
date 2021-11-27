export default class SequenceData {
    constructor(step_count, channel_count) {
        this.data = []
        this.step_count = step_count
        this.channel_count = channel_count
        this.resize()
    }

    resize() {
        for (let i = this.channel_count - this.data.length - 1; i >= 0; i--) {
            this.data.push([])
        }

        for (let channel_idx = this.channel_count - 1; channel_idx >= 0; channel_idx--) {
            let missing_steps = this.step_count - this.data[channel_idx].length
            for (let step = missing_steps; step > 0; step--) {
                this.data[channel_idx].push(false)
            }
        }
    }

    is_step_on(channel, position) {
        return this.data[channel][position]
    }

    toggle_step(channel, position) {
        this.data[channel][position] = !this.data[channel][position]
    }

    get_channel_count() {
        return this.channel_count
    }

    get_step_count() {
        return this.step_count
    }

    dump_to_serializer(serializer) {
        for (let channel = 0; channel < this.channel_count; channel++) {
            for (let step = 0; step < this.step_count; step++) {
                serializer.push_bit((this.data[channel][step]) ? 1 : 0)
            }
        }
    }

    deserialize(deserializer, step_elements) {
        for (let channel = 0; channel < this.channel_count; channel++) {
            for (let step = 0; step < this.step_count; step++) {
                let bool = (deserializer.pop_bit() == 1)
                this.data[channel][step] = bool
                step_elements[channel][step].checked = bool
            }
        }
    }
}