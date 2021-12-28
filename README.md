# Relay Menu Selector

## Description

Proof of concept using [SignalWire's Relay API](https://docs.signalwire.com/topics/relay-sdk-nodejs/v2/#api-reference-relay-calling-call).  Enables for an end user to dial a number, receive a menu selection, and select using voice or number pad.  After selection, an audio will play.

## Project Setup

### Solution
1.  `npm i`
2.  Create environment variable file, `.env`.
    * Insert the following to the file:
        
        *Instructions getting the variable information is under the SignalWire section*
        ```
        PROJECT_ID=
        API_TOKEN=
        CONTEXT=
        MY_NUMBER=
        AUDIO_URL=
        ```
3.  `npm start`

### SignalWire
1. From the SignalWire setup site, on the left navigation, click on `API`.  The Project ID and API Token can be retrieved (or created) on this page.
`
![SignalWire retrieve Project ID and API Token](/screenshots/01.png)

2. On the left navigation, click on Phone Numbers and create a new phone number.

3. Change *Handle Calls Using* to `Relay`.
![SignalWire phone number settings](/screenshots/02.png)

4. Change *WHEN A CALL COMES IN...CONTEXT* to `music`.  (set environment variable *context*)

## Notes
- Sign up for a trial at [SignalWire.com](https://www.signalwire.com)
- `fileserver.js` is a simple express instance to serve the audio via the web.  Not required but useful for this poc.
- Utilized `ngrok` to serve fileserver.js.
- No open ports required.  
Reference:  [Deploying Relay](https://github.com/signalwire/signalwire-guides/blob/master/intros/getting_started_relay.md#deploying-relay)

    `Relay runs in its own process, not within an HTTP server, and requires no open ports, just an outbound connection to the SignalWire servers. This allows a Consumer to be very efficient, with a small footprint.`


## Credits
- Audio files are instrumentals from Watching Leona band.