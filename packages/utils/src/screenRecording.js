/*
This is a class for ScreenRecorder api
  
  @param { object } displayMediaOptions - param for video, cursor, audio.
    sample:
      displayMediaOptions = {
        video: {
          cursor: "always"
        },
        audio: false
      };
  @param { function } onEndedCallback - this callback is triggered when user stops screensharing using the native 'stop' button or when the tab changes state (back/close). this could in turn call the stopRecording() api
  @param { function } stopCallback - this callback is triggered after the MediaRecorder object stores the recording and stops recording

*/

import { messages } from '../constants';

const STATES = {
  recordingState: 'recording',
  inactiveState: 'inactive',
  idleState: 'idle',
  readyState: 'ready',
  downloadingState: 'downloading',
  discardingState: 'discarding'
};

export default class ScreenRecorder {
  displayMediaOptions = {
    video: {
      cursor: 'always'
    },
    audio: false
  };

  constructor(displayMediaOptions, onEndedCallback = function () {}, stopCallback = function () {}) {
    this.displayMediaOptions = displayMediaOptions;
    this.chunks = [];
    this.recorder = null;
    this.onEndedCallback = onEndedCallback;
    this.stopCallback = stopCallback;
    this.downloaderState = STATES.idleState;
  }

  async startRecording() {
    try {
      let stream = await window.navigator.mediaDevices.getDisplayMedia(this.displayMediaOptions);
      this.recorder = new window.MediaRecorder(stream);

      stream.getVideoTracks()[0].onended = () => {
        this.onEndedCallback();
      };

      this.recorder.onstop = () => {
        stream.getVideoTracks()[0].stop();
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        stream = null;
        this.stopCallback();
      };

      this.recorder.ondataavailable = (e) => {
        this.chunks = [];
        this.chunks.push(e.data);
      };

      this.recorder.start();
      this.downloaderState = STATES.idleState;

      return { recorderStart: this.recorder.state === STATES.recordingState };
    } catch (err) {
      throw new Error(messages.startRecordingError, err);
    }
  }

  async stopRecording(stopCallback = function () {}, source = null, payload = {}) {
    try {
      this.stopCallback = source ? stopCallback.bind(this, source, payload) : stopCallback;
      this.recorder.stop();
      this.downloaderState = STATES.readyState;

      return { recorderStop: this.recorder.state === STATES.inactiveState };
    } catch (err) {
      throw new Error(messages.stopRecordingError, err);
    }
  }

  async downloadRecording() {
    try {
      this.downloaderState = STATES.downloadingState;
      const blob = new Blob(this.chunks, { type: this.chunks[0].type });
      const downloadDate = new Date();
      const downloadTimestamp = `${downloadDate.getDate()}-${downloadDate.getMonth()}-${downloadDate.getFullYear()}-${downloadDate.getHours()}-${downloadDate.getMinutes()}`;

      const filename = `screenRecording-${downloadTimestamp}.mp4`;
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
      } else {
        const downloadLinkElem = window.document.createElement('a');
        downloadLinkElem.href = window.URL.createObjectURL(blob);
        downloadLinkElem.download = filename;
        document.body.appendChild(downloadLinkElem);
        downloadLinkElem.click();
        document.body.removeChild(downloadLinkElem);
      }
      this.chunks = [];
      this.downloaderState = STATES.idleState;
      return { filename, msg: messages.recordingDownloaded };
    } catch (err) {
      this.downloaderState = STATES.idleState;
      throw new Error(messages.downloadRecordingError, err);
    }
  }

  async discardRecording() {
    try {
      this.downloaderState = STATES.discardingState;
      this.chunks = [];
      this.downloaderState = STATES.idleState;
      return { msg: messages.recordingDiscarded };
    } catch (err) {
      this.downloaderState = STATES.idleState;
      throw new Error(messages.discardRecordingError, err);
    }
  }

  get getState() {
    /*
      recorderState can be 'recording'/'inactive'/'paused'
      downloaderState can be 'idle'/'ready'/'downloading'/'discarding'
      when recorderState: 'recording' or a new ScreenRecorder instance is made, then downloaderState: 'idle'
      downloaderState will transition from 'ready' to 'downloading'/'discarding' to 'idle' depending upon user action
    */
    return { recorderState: this.recorder && this.recorder.state, downloaderState: this.downloaderState };
  }
}
