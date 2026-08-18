import React from 'react';
import {FormattedMessage} from 'react-intl';

import musicIconURL from './music/music.png';
import musicInsetIconURL from './music/music-small.svg';

import penIconURL from './pen/pen.png';
import penInsetIconURL from './pen/pen-small.svg';

import videoSensingIconURL from './videoSensing/video-sensing.png';
import videoSensingInsetIconURL from './videoSensing/video-sensing-small.svg';

import text2speechIconURL from './text2speech/text2speech.png';
import text2speechInsetIconURL from './text2speech/text2speech-small.svg';

import translateIconURL from './translate/translate.png';
import translateInsetIconURL from './translate/translate-small.png';

import makeymakeyIconURL from './makeymakey/makeymakey.png';
import makeymakeyInsetIconURL from './makeymakey/makeymakey-small.svg';

import microbitIconURL from './microbit/microbit.png';
import microbitInsetIconURL from './microbit/microbit-small.svg';
import microbitConnectionIconURL from './microbit/microbit-illustration.svg';
import microbitConnectionSmallIconURL from './microbit/microbit-small.svg';

import ev3IconURL from './ev3/ev3.png';
import ev3InsetIconURL from './ev3/ev3-small.svg';
import ev3ConnectionIconURL from './ev3/ev3-hub-illustration.svg';
import ev3ConnectionSmallIconURL from './ev3/ev3-small.svg';

import wedo2IconURL from './wedo2/wedo.png'; // TODO: Rename file names to match variable/prop names?
import wedo2InsetIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionIconURL from './wedo2/wedo-illustration.svg';
import wedo2ConnectionSmallIconURL from './wedo2/wedo-small.svg';
import wedo2ConnectionTipIconURL from './wedo2/wedo-button-illustration.svg';

import boostIconURL from './boost/boost.png';
import boostInsetIconURL from './boost/boost-small.svg';
import boostConnectionIconURL from './boost/boost-illustration.svg';
import boostConnectionSmallIconURL from './boost/boost-small.svg';
import boostConnectionTipIconURL from './boost/boost-button-illustration.svg';

import gdxforIconURL from './gdxfor/gdxfor.png';
import gdxforInsetIconURL from './gdxfor/gdxfor-small.svg';
import gdxforConnectionIconURL from './gdxfor/gdxfor-illustration.svg';
import gdxforConnectionSmallIconURL from './gdxfor/gdxfor-small.svg';

import faceSensingIconURL from './faceSensing/faceSensing.png';
import faceSensingInsetIconURL from './faceSensing/faceSensing-small.svg';

import posenet2scratchIconURL from './posenet2scratch/posenet2scratch.png';
import posenet2scratchInsetIconURL from './posenet2scratch/posenet2scratch-small.png';

import tm2scratchIconURL from './tm2scratch/tm2scratch.png';
import tm2scratchInsetIconURL from './tm2scratch/tm2scratch-small.png';

import tmpose2scratchIconURL from './tmpose2scratch/tmpose2scratch.png';
import tmpose2scratchInsetIconURL from './tmpose2scratch/tmpose2scratch-small.png';

import scratch2maqueenIconURL from './scratch2maqueen/scratch2maqueen.png';
import scratch2maqueenInsetIconURL from './scratch2maqueen/scratch2maqueen-small.png';

import speech2scratchIconURL from './speech2scratch/speech2scratch.png';
import speech2scratchInsetIconURL from './speech2scratch/speech2scratch-small.png';

import irobotRootIconURL from './irobotRoot/irobotRoot.png';
import irobotRootInsetIconURL from './irobotRoot/irobotRoot-small.png';

import g2sIconURL from './g2s/g2s.png';
import g2sInsetIconURL from './g2s/g2s-small.png';

const microbitMoreExtensionURL = './static/preloaded-extensions/microbitMore.mjs';
const irobotRootExtensionURL = './static/preloaded-extensions/irobotRoot.mjs';
const g2sExtensionURL = './static/preloaded-extensions/g2s.mjs';
const numberbankExtensionURL = './static/preloaded-extensions/numberbank.mjs';

const extensions = [
    {
        name: 'micro:bit More v2',
        extensionId: 'microbitMore',
        collaborator: 'Yengawa Lab',
        iconURL: microbitIconURL,
        insetIconURL: microbitInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Play with all functions of micro:bit."
                description="Description for the micro:bit More v2 extension"
                id="gui.extension.microbitMore.description"
            />
        ),
        tags: ['device'],
        featured: true,
        bluetoothRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        internetConnectionRequired: false,
        extensionURL: microbitMoreExtensionURL,
        helpLink: 'https://microbit-more.github.io/'
    },
    {
        name: 'iRobot Root',
        extensionId: 'irobotRoot',
        collaborator: 'naominix',
        iconURL: irobotRootIconURL,
        insetIconURL: irobotRootInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Control an iRobot Root robot over Bluetooth."
                description="Description for the iRobot Root extension"
                id="gui.extension.irobotRoot.description"
            />
        ),
        tags: ['device'],
        featured: true,
        bluetoothRequired: false,
        internetConnectionRequired: false,
        extensionURL: irobotRootExtensionURL,
        helpLink: 'https://github.com/naominix/xcx-irobot-root/'
    },
    {
        name: 'AkaDako',
        extensionId: 'g2s',
        collaborator: 'TFabWorks',
        iconURL: g2sIconURL,
        insetIconURL: g2sInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Connect Grove sensors and actuators."
                description="Description for the AkaDako extension"
                id="gui.extension.g2s.description"
            />
        ),
        tags: ['device', 'network'],
        featured: true,
        bluetoothRequired: false,
        internetConnectionRequired: false,
        extensionURL: g2sExtensionURL,
        helpLink: 'https://akadako.com/'
    },
    {
        name: 'NumberBank',
        extensionId: 'numberbank',
        collaborator: 'con3.com',
        description: (
            <FormattedMessage
                defaultMessage="Use NumberBank tools in your projects."
                description="Description for the NumberBank extension"
                id="gui.extension.numberbank.description"
            />
        ),
        tags: ['data', 'math'],
        featured: true,
        internetConnectionRequired: false,
        extensionURL: numberbankExtensionURL,
        helpLink: 'https://con3.com/sc2scratch/'
    },
    {
        name: 'PoseNet2Scratch',
        extensionId: 'posenet2scratch',
        collaborator: 'champierre',
        iconURL: posenet2scratchIconURL,
        insetIconURL: posenet2scratchInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Obtain the coordinates of each part of the body."
                description="Description for the PoseNet2Scratch extension"
                id="gui.extension.posenet2scratch.description"
            />
        ),
        tags: ['image', 'ai'],
        featured: true,
        internetConnectionRequired: true,
        helpLink: 'https://github.com/champierre/posenet2scratch/'
    },
    {
        name: 'TM2Scratch',
        extensionId: 'tm2scratch',
        collaborator: 'Tsukurusha, YengawaLab and Google',
        iconURL: tm2scratchIconURL,
        insetIconURL: tm2scratchInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Recognize your own images and sounds."
                description="Description for the TM2Scratch extension"
                id="gui.extension.tm2scratch.description"
            />
        ),
        tags: ['image', 'sound', 'ai'],
        featured: true,
        internetConnectionRequired: true,
        helpLink: 'https://github.com/champierre/tm2scratch/'
    },
    {
        name: 'TMPose2Scratch',
        extensionId: 'tmpose2scratch',
        collaborator: 'Tsukurusha, YengawaLab and Google',
        iconURL: tmpose2scratchIconURL,
        insetIconURL: tmpose2scratchInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Recognize your own poses."
                description="Description for the TMPose2Scratch extension"
                id="gui.extension.tmpose2scratch.description"
            />
        ),
        tags: ['image', 'ai'],
        featured: true,
        internetConnectionRequired: true,
        helpLink: 'https://github.com/champierre/tmpose2scratch/'
    },
    {
        name: 'Scratch2Maqueen',
        extensionId: 'scratch2maqueen',
        collaborator: 'champierre',
        iconURL: scratch2maqueenIconURL,
        insetIconURL: scratch2maqueenInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Control DFRobot Maqueen."
                description="Description for the Scratch2Maqueen extension"
                id="gui.extension.scratch2maqueen.description"
            />
        ),
        tags: ['device'],
        featured: true,
        bluetoothRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        helpLink: 'https://github.com/champierre/scratch2maqueen/'
    },
    {
        name: 'Speech2Scratch',
        extensionId: 'speech2scratch',
        collaborator: 'champierre',
        iconURL: speech2scratchIconURL,
        insetIconURL: speech2scratchInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Convert speech into text."
                description="Description for the Speech2Scratch extension"
                id="gui.extension.speech2scratch.description"
            />
        ),
        tags: ['sound', 'text'],
        featured: true,
        internetConnectionRequired: true,
        helpLink: 'https://github.com/champierre/speech2scratch/'
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Music"
                description="Name for the 'Music' extension"
                id="gui.extension.music.name"
            />
        ),
        extensionId: 'music',
        iconURL: musicIconURL,
        insetIconURL: musicInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Play instruments and drums."
                description="Description for the 'Music' extension"
                id="gui.extension.music.description"
            />
        ),
        tags: ['sound', 'music', 'audio'],
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Pen"
                description="Name for the 'Pen' extension"
                id="gui.extension.pen.name"
            />
        ),
        extensionId: 'pen',
        iconURL: penIconURL,
        insetIconURL: penInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Draw with your sprites."
                description="Description for the 'Pen' extension"
                id="gui.extension.pen.description"
            />
        ),
        tags: ['image', 'pen'],
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Video Sensing"
                description="Name for the 'Video Sensing' extension"
                id="gui.extension.videosensing.name"
            />
        ),
        extensionId: 'videoSensing',
        iconURL: videoSensingIconURL,
        insetIconURL: videoSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense motion with the camera."
                description="Description for the 'Video Sensing' extension"
                id="gui.extension.videosensing.description"
            />
        ),
        tags: ['image', 'video'],
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Face Sensing"
                description="Name for the 'Face Sensing' extension"
                id="gui.extension.faceSensing.name"
            />
        ),
        extensionId: 'faceSensing',
        iconURL: faceSensingIconURL,
        insetIconURL: faceSensingInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense faces with the camera."
                description="Description for the 'Face Sensing' extension"
                id="gui.extension.faceSensing.description"
            />
        ),
        tags: ['image', 'video', 'ai', 'ml', 'machine learning', `vision`],
        featured: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Text to Speech"
                description="Name for the Text to Speech extension"
                id="gui.extension.text2speech.name"
            />
        ),
        extensionId: 'text2speech',
        collaborator: 'Amazon Web Services',
        iconURL: text2speechIconURL,
        insetIconURL: text2speechInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make your projects talk."
                description="Description for the Text to speech extension"
                id="gui.extension.text2speech.description"
            />
        ),
        tags: ['sound', 'audio', 'speech', 'text'],
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: (
            <FormattedMessage
                defaultMessage="Translate"
                description="Name for the Translate extension"
                id="gui.extension.translate.name"
            />
        ),
        extensionId: 'translate',
        collaborator: 'Google',
        iconURL: translateIconURL,
        insetIconURL: translateInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Translate text into many languages."
                description="Description for the Translate extension"
                id="gui.extension.translate.description"
            />
        ),
        tags: ['text', 'translation', 'language'],
        featured: true,
        internetConnectionRequired: true
    },
    {
        name: 'Makey Makey',
        extensionId: 'makeymakey',
        collaborator: 'JoyLabz',
        iconURL: makeymakeyIconURL,
        insetIconURL: makeymakeyInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Make anything into a key."
                description="Description for the 'Makey Makey' extension"
                id="gui.extension.makeymakey.description"
            />
        ),
        tags: ['device', 'hardware'],
        featured: true
    },
    {
        name: 'micro:bit',
        extensionId: 'microbit',
        collaborator: 'micro:bit',
        iconURL: microbitIconURL,
        insetIconURL: microbitInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Connect your projects with the world."
                description="Description for the 'micro:bit' extension"
                id="gui.extension.microbit.description"
            />
        ),
        tags: ['device', 'hardware'],
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: microbitConnectionIconURL,
        connectionSmallIconURL: microbitConnectionSmallIconURL,
        prescanMessage: (
            <FormattedMessage
                defaultMessage="Turn on your micro:bit, then press the button below to start searching for your device."
                description="Prompt before searching for a micro:bit"
                id="gui.extension.microbit.prescanMessage"
            />
        ),
        scanBeginMessage: (
            <FormattedMessage
                defaultMessage="Keep your micro:bit on and nearby."
                description="Information shown while searching for a micro:bit, before one is found"
                id="gui.extension.microbit.scanBeginMessage"
            />
        ),
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their micro:bit."
                id="gui.extension.microbit.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/microbit'
    },
    {
        name: 'Go Direct Force & Acceleration',
        extensionId: 'gdxfor',
        collaborator: 'Vernier',
        iconURL: gdxforIconURL,
        insetIconURL: gdxforInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Sense push, pull, motion, and spin."
                description="Description for the Vernier Go Direct Force and Acceleration sensor extension"
                id="gui.extension.gdxfor.description"
            />
        ),
        tags: ['device', 'hardware'],
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: gdxforConnectionIconURL,
        connectionSmallIconURL: gdxforConnectionSmallIconURL,
        prescanMessage: (
            <FormattedMessage
                defaultMessage="Turn on your Go Direct, then press the button below to start searching for your device."
                description="Prompt before searching for a Vernier Go Direct device"
                id="gui.extension.gdxfor.prescanMessage"
            />
        ),
        scanBeginMessage: (
            <FormattedMessage
                defaultMessage="Keep your Vernier Go Direct on and nearby."
                description="Information shown while searching for a Vernier Go Direct, before one is found"
                id="gui.extension.gdxfor.scanBeginMessage"
            />
        ),
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their force and acceleration sensor."
                id="gui.extension.gdxfor.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/vernier'
    },
    {
        name: 'LEGO MINDSTORMS EV3',
        extensionId: 'ev3',
        collaborator: 'LEGO',
        iconURL: ev3IconURL,
        insetIconURL: ev3InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Build interactive robots and more."
                description="Description for the 'LEGO MINDSTORMS EV3' extension"
                id="gui.extension.ev3.description"
            />
        ),
        tags: ['device', 'hardware'],
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: false,
        connectionIconURL: ev3ConnectionIconURL,
        connectionSmallIconURL: ev3ConnectionSmallIconURL,
        prescanMessage: (
            <FormattedMessage
                defaultMessage="Turn on your LEGO EV3, then press the button below to start searching for your device."
                description="Prompt before searching for a LEGO EV3"
                id="gui.extension.ev3.prescanMessage"
            />
        ),
        scanBeginMessage: (
            <FormattedMessage
                defaultMessage="Keep your LEGO EV3 on and nearby."
                description="Information shown while searching for a LEGO EV3, before one is found"
                id="gui.extension.ev3.scanBeginMessage"
            />
        ),
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting. Make sure the pin on your EV3 is set to 1234."
                description="Message to help people connect to their EV3. Must note the PIN should be 1234."
                id="gui.extension.ev3.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/ev3'
    },
    {
        name: 'LEGO BOOST',
        extensionId: 'boost',
        collaborator: 'LEGO',
        iconURL: boostIconURL,
        insetIconURL: boostInsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Bring robotic creations to life."
                description="Description for the 'LEGO BOOST' extension"
                id="gui.extension.boost.description"
            />
        ),
        tags: ['device', 'hardware'],
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        connectionIconURL: boostConnectionIconURL,
        connectionSmallIconURL: boostConnectionSmallIconURL,
        connectionTipIconURL: boostConnectionTipIconURL,
        prescanMessage: (
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="Press the button on your LEGO BOOST, then press the button below to start searching for your device."
                description="Prompt before searching for a LEGO BOOST"
                id="gui.extension.boost.prescanMessage"
            />
        ),
        scanBeginMessage: (
            <FormattedMessage
                defaultMessage="Keep your LEGO BOOST awake and nearby."
                description="Information shown while searching for a LEGO BOOST, before one is found"
                id="gui.extension.boost.scanBeginMessage"
            />
        ),
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their BOOST."
                id="gui.extension.boost.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/boost'
    },
    {
        name: 'LEGO Education WeDo 2.0',
        extensionId: 'wedo2',
        collaborator: 'LEGO',
        iconURL: wedo2IconURL,
        insetIconURL: wedo2InsetIconURL,
        description: (
            <FormattedMessage
                defaultMessage="Build with motors and sensors."
                description="Description for the 'LEGO WeDo 2.0' extension"
                id="gui.extension.wedo2.description"
            />
        ),
        tags: ['device', 'hardware'],
        featured: true,
        disabled: false,
        bluetoothRequired: true,
        internetConnectionRequired: true,
        launchPeripheralConnectionFlow: true,
        useAutoScan: true,
        connectionIconURL: wedo2ConnectionIconURL,
        connectionSmallIconURL: wedo2ConnectionSmallIconURL,
        connectionTipIconURL: wedo2ConnectionTipIconURL,
        prescanMessage: (
            <FormattedMessage
                // eslint-disable-next-line max-len
                defaultMessage="Press the button on your LEGO WeDo 2.0, then press the button below to start searching for your device."
                description="Prompt before searching for a LEGO WeDo 2.0"
                id="gui.extension.wedo2.prescanMessage"
            />
        ),
        scanBeginMessage: (
            <FormattedMessage
                defaultMessage="Keep your LEGO WeDo 2.0 awake and nearby."
                description="Information shown while searching for a LEGO WeDo 2.0, before one is found"
                id="gui.extension.wedo2.scanBeginMessage"
            />
        ),
        connectingMessage: (
            <FormattedMessage
                defaultMessage="Connecting"
                description="Message to help people connect to their WeDo."
                id="gui.extension.wedo2.connectingMessage"
            />
        ),
        helpLink: 'https://scratch.mit.edu/wedo'
    }
];

export default extensions;

import extensionLoader from './extensionLoader/index.jsx';
extensions.unshift(extensionLoader);
