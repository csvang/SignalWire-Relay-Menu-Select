import 'dotenv/config';
import { RelayConsumer } from '@signalwire/node';

if (!process.env.MY_NUMBER ||
    !process.env.PROJECT_ID ||
    !process.env.API_TOKEN ||
    !process.env.CONTEXT ||
    !process.env.AUDIO_URL) {
    console.log(process.env);
    console.error('Environmental variables missing.  Please configure .env file with the required variables: SIGNALWIRE_PROJECT_ID, SIGNALWIRE_API_TOKEN, SIGNALWIRE_CONTEXT, MY_NUMBER, AUDIO_URL');
}

const myNumber = process.env.MY_NUMBER;
const audioURL = process.env.AUDIO_URL;

async function onIncomingCall(call) {
    console.log(`[INCOMING CALL]    ${call.id} : ${call.from} : ${call.to}`);
    const answer = await call.answer();

    if (!answer.successful) {
        console.error(`[ERROR]`);
        return;
    }

    await call.playTTS({ text: "Hello, Watching Leona!" });
    await call.playSilence(1);

    const result = await call.promptTTS({
        type: 'both',
        digits_max: 1,
        digit_timeout: 1.0,
        digits_terminators: '#',
        end_silence_timeout: 1.0,
        speech_hints: ['denoise=true', ...Array(19).keys()],
        text: "Say or press 1 to play Hazel. Say or press 2 to play Three. Say or press 3 to play Simple Song."
    });

    if (result && 
        result.successful) {

        switch(result.result.trim()) {
            case '1':
                await call.playTTS({ text: "Playing Hazel!" });
                await call.playAudio({
                    url: `${audioURL}/hazel.mp3`
                });
                break;
            case '2':
                await call.playTTS({ text: "Playing Three!" });
                await call.playAudio({
                    url: `${audioURL}/three.mp3`
                });
                break;
            case '3':
                await call.playTTS({ text: "Playing Simple Song!" });
                await call.playAudio({
                    url: `${audioURL}/simplesong.mp3`
                });
                break;
            default:
                await call.playTTS({ text: "No selection made!" });
        }
    }

    await call.hangup();
}

const consumer = new RelayConsumer({
    project: process.env.PROJECT_ID,
    token: process.env.API_TOKEN,
    contexts: [process.env.CONTEXT],
    onIncomingCall: onIncomingCall
});

consumer.run();