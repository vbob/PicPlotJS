let SerialPort = require('serialport');
let app = require('express')()
let Linear_Sensor = require('./LinearSensor')

let serialport = new SerialPort('COM7', {
    baudRate: 1200,
    parity: 'even'
});

// Linear_Sensor("SensorName", "Indicator", MinRef, MaxRef)
let sensor_array = [new Linear_Sensor("Potenciômetro 1", " A", 0, 5000), 
                    new Linear_Sensor("Potenciômetro 2", " B", 0, 5000)]

let buffer = "";

function includeRead(data) {
    let saved = "Leitura inválida"

    sensor_array.filter(sensor => {
        if (data.includes(sensor.end_indicator)) {
            if(sensor.include_read(data))
                saved = sensor.name.toString();
        }
    })

    console.log(saved + ": " + JSON.stringify(data));
}

serialport.on('data', function (data) {
    if (data.toString('utf8') == '\n') {
        includeRead(buffer.trim())
        buffer = "";
    }

    else if (buffer.length >= 20) {
        console.log("Ruído: " + buffer)
        buffer = ""
    }

    else 
        buffer += data.toString('utf8')
});

app.listen(8080)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public_html/index.html')
})

app.get('/reads', (req,res) => {
    let read_array = [];

    sensor_array.forEach(sensor => read_array.push(sensor.getReads()))

    res.send(read_array)
})

app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/public_html/' + req.params[0])
})