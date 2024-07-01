import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AudioRecorder } from "react-audio-voice-recorder";
import { storage, auth } from "../../firebaseConfig";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const UploadVoiceRecord = ({
  question,
  saveVoiceDataLink,
  setResponseMessage,
  setSuccessResponse,
  setShowResponse,
  setRecord
}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        signInAnonymously(auth)
          .then((userCredential) => {
            setUser(userCredential.user);
          })
          .catch((error) => {
            setResponseMessage({
              title: "Request Failed",
              content: "Error signing in anonymously",
            });
            setSuccessResponse(false);
            setShowResponse(true);
            console.error("Error signing in anonymously:", error);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  const addAudioElement = (blob, id) => {
    if (!user) {
      console.error("User is not authenticated");
      setResponseMessage({
        title: "Request Failed",
        content: "User is not authenticated",
      });
      setSuccessResponse(false);
      setShowResponse(true);
      return;
    }

    setIsLoading(true);

    const url = URL.createObjectURL(blob);
    const file = new File([blob], `recorder_${Date.now()}.webm`, {
      type: "audio/webm",
    });

    const storageRef = ref(storage, `voice/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error(error);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            console.log("File available at", downloadURL);
            saveVoiceDataLink(downloadURL, question.id, url);
            setIsLoading(false);
            setRecord(url)
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
            setResponseMessage({
              title: "Request Failed",
              content: "Error getting download Voice",
            });
            setSuccessResponse(false);
            setShowResponse(true);
            setIsLoading(false);
          });
      }
    );
  };

  return (
    <>
      {isLoading ? (
        <FontAwesomeIcon className="fa-spin fa-3x special_main_color" icon={faSpinner}/>
      ) : (
        <AudioRecorder
          onRecordingComplete={(blob) => addAudioElement(blob, question.id)}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadOnSavePress={false}
          downloadFileExtension="webm"
        />
      )}
    </>
  );
};

export default UploadVoiceRecord;
