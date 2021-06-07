const textToSpeech = require('@google-cloud/text-to-speech');

const fs = require('fs');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();

async function quickStart() {
  // The text to synthesize
  const text = process.argv[2];

  // Construct the request
  const request = {
    input: { text },
    // Selec thte language and SSML voice gender
    voice: {
      languageCode: 'en-US',
      ssmlGender: 'NEUTRAL'
    },
    // Select the type of audio encoding
    audioConfig: { 
      audioEncoding: 'MP3'
    }
  };

  // Perform the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);

  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile('voice.mp3', response.audioContent, 'binary');
  console.log('Audio content written to file: voice.mp3');
}

quickStart();