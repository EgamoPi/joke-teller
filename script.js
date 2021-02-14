const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

 // Disable/Enable Button
 function toggleButton(){
     button.disabled = !button.disabled;
 }

// Passing joke to VoiceRSS API
function textToVoice(joke) {
    VoiceRSS.speech({
        key: '800fae3b8e3a47a2944b738d1a03db6c',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API

async function getJokes() {
    let joke = '';
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=religious,political,racist,sexist';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ...${data.delivery}`;
        } else {
            joke = data.joke;
        }
        //Text-To-Speech
        textToVoice(joke)
        // Disable Button
        toggleButton();
    } catch (err) {
        console.log('whoops :', err);
    }

}

//Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)