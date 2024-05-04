


import React, { useState } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';



const MyTest = () => {

const [record,setRecord]=useState(null)

const addAudioElement = (blob) => {
  const url = URL.createObjectURL(blob);
  setRecord(url)
  const formData=new FormData();
  formData.append("voiceAnswer",blob,'recorder.webm');

  console.log(formData)
};

  return (
    <>
        <div className="vh-100 d-flex justify-content-center align-items-center vw-100">
      <AudioRecorder 
        onRecordingComplete={addAudioElement}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }} 
        downloadOnSavePress={false}
        downloadFileExtension="webm"
      />
    </div>

    <div>
        {record?<audio src={record} controls></audio>:<h2>didnot recorded yet</h2>}
    </div>
    </>

  );
};

export default MyTest;



  // const audio = document.createElement("audio");
  // audio.src = url;
  // audio.controls = true;
  // document.body.appendChild(audio);