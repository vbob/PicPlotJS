Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    return ((this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min).toFixed(0);
}

module.exports = class Linear_Sensor {
    constructor(name, end_indicator, min_value, max_value) {
        this.name = name;
        this.end_indicator = end_indicator;
        this.min_value = min_value;
        this.max_value = max_value;
        this.reads = [this.name];
        
        this.min_read = 0
        this.max_read = 1024
        this.buffer_length = 50;
    }

    /**
     *  Save the received value
     *
     * @param {String} read
     * @memberof Linear_Sensor
     */
    include_read(read) {
        let or_read = read;

        read = read.replace(this.end_indicator, "").trim()
        read = Number(read)
        if (isNaN(read)) {
            return false
        }

        read = read.map(this.min_read, this.max_read, this.min_value, this.max_value)
        this.reads.push(read)

        if (this.reads.length > this.buffer_length)
            this.reads.splice(1, 1)
        
        return true
    }

    getReads() {
        return this.reads
    }
}
