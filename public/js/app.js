console.log('Client side JavaScript is loaded!');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('p#message1');
const message2 = document.querySelector('p#message2');
const message3 = document.querySelector('p#message3');
const message4 = document.querySelector('p#message4');
const error = document.querySelector('p#error');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    message1.textContent = 'Locading...';
    message2.textContent = '';
    message3.textContent = '';
    message4.textContent = '';

    const location = search.value;

    fetch('/weather?address=' + location).then((res) => {
        res.json().then((data) => {
            if (data.error) {
                message1.textContent = data.error;
            } else {
                message1.textContent = 'Weather in: ' +  data.location;
                message2.textContent = 'Temperature: ' +  data.temperature + ' of Celsius';
                message3.textContent = 'Precip probability is: ' +  data.precipProbability;
                message4.textContent = data.summary;
            }
        })

    });


});