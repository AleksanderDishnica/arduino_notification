const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const notifier = require('node-notifier');
const play = require('audio-play');
const load = require('audio-loader');

// Configure the serial port (replace 'COM8' with your Arduino's port)
const port = new SerialPort({
    path: 'COM8',       // Replace with your actual port
    baudRate: 9600      // Set the baud rate
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

port.on('open', () => {
    console.log('Serial Port Opened');
});

// Listen for data from the Arduino
parser.on('data', data => {
    console.log('Received data:', data);

    if (data.trim() === 'Object close') {
        // Play a sound or trigger a notification
        notifier.notify({
            title: 'Object Detection Alert',
            message: 'An object is within 10 cm!',
            sound: true  // Play the system notification sound (works on macOS)
        });

        // Play a custom sound (works with .wav or .mp3)
        load('./alert.mp3').then(play);

        console.log("Alert: Object detected!");
    }
});

port.on('error', function (err) {
    console.log('Error: ', err.message);
});
