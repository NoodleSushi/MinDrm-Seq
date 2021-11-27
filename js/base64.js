class Base64Abstract {
    constructor() {
        this.i2c = []
        this.c2i = {}
        for (let i = 0; i < 26; i++) {
            this.i2c.push(String.fromCharCode(65 + i))
        }
        for (let i = 0; i < 26; i++) {
            this.i2c.push(String.fromCharCode(97 + i))
        }
        for (let i = 0; i < 10; i++) {
            this.i2c.push(String.fromCharCode(48 + i))
        }
        this.i2c.push('+')
        this.i2c.push('/')
        for (let i = 0; i < 64; i++) {
            this.c2i[this.i2c[i]] = i
        }
        this.leftover_bits = 0
        this.leftover_count = 0
    }
}

export class Base64Serializer extends Base64Abstract {
    constructor() {
        super()
        this.output = ""
    }

    push_bit(bit) {
        this.leftover_bits = (this.leftover_bits << 1) + bit
        this.leftover_count++
        this.merge_leftover()
    }

    push_int(int, bit_count) {
        this.leftover_bits = (this.leftover_bits << bit_count) + int
        this.leftover_count += bit_count
        this.merge_leftover()
    }

    merge_leftover() {
        while (this.leftover_count >= 6) {
            let deduct_count = this.leftover_count - 6
            this.output += this.i2c[this.leftover_bits >> deduct_count]
            this.leftover_bits -= (this.leftover_bits >> deduct_count) << deduct_count
            this.leftover_count -= 6
        }
    }

    clear() {
        this.leftover_bits = 0
        this.leftover_count = 0
        this.output = ""
    }

    get_serialized() {
        // leftovers
        let leftover_char = ""
        if (this.leftover_count > 0) {
            leftover_char = this.i2c[this.leftover_bits << (6 - this.leftover_count)]
        }
        return this.output + leftover_char
    }
}

export class Base64Deserializer extends Base64Abstract {
    constructor() {
        super()
        this.input = ""
    }

    load_base64(base64) {
        this.input = base64
    }

    pop_bit() {
        this.fill_leftover(1)
        this.leftover_count--
        let out = this.leftover_bits >> this.leftover_count
        this.leftover_bits -= (this.leftover_bits >> this.leftover_count) << this.leftover_count
        return out
    }

    pop_int(bit_count) {
        this.fill_leftover(bit_count)
        this.leftover_count -= bit_count
        let out = this.leftover_bits >> this.leftover_count
        this.leftover_bits -= (this.leftover_bits >> this.leftover_count) << this.leftover_count
        return out
    }

    fill_leftover(min_bit_count) {
        while (this.leftover_count < min_bit_count && this.input.length != 0) {
            let char = this.input.charAt(0)
            this.leftover_bits = (this.leftover_bits << 6) + this.c2i[char]
            this.input = this.input.substring(1)
            this.leftover_count += 6
        }
    }
}
