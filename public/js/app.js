console.log('Client side JavaScript is loaded!');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('p#message1');
const message2 = document.querySelector('p#message2');
const message3 = document.querySelector('p#message3');
const message4 = document.querySelector('p#message4');
const message5 = document.querySelector('p#message5');
const message6 = document.querySelector('p#message6');
const error = document.querySelector('p#error');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    message1.textContent = 'Locading...';
    message2.textContent = '';
    message3.textContent = '';
    message4.textContent = '';
    message5.textContent = '';
    message6.textContent = '';

    const location = search.value;

    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = 'Weather in: ' +  data.location;
                message2.textContent = 'Temperature: ' +  data.temperature + ' of Celsius';
                message3.textContent = 'Min temperature per day: ' +  data.temperatureMin + ' of Celsius';
                message4.textContent = 'Max temperature per day: ' +  data.temperatureMax + ' of Celsius';
                message5.textContent = 'Precip probability is: ' +  data.precipProbability;
                message6.textContent = data.summary;
            }
        })

    });


});