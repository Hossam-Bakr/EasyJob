import React, { useState, useEffect } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AudioRecorder } from "react-audio-voice-recorder";
import { storage, auth } from "../../firebaseConfig";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";

const UploadVoiceRecord = ({ question, saveVoiceDataLink }) => {
    const [record, setRecord] = useState(null);
    const [voicesAnswers, setVoicesAnswers] = useState([]);
    const [user, setUser] = useState(null);

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
                        console.error("Error signing in anonymously:", error);
                    });
            }
        });

        return () => unsubscribe();
    }, []);

    const addAudioElement = (blob, id) => {
        if (!user) {
            console.error("User is not authenticated");
            return;
        }

        const url = URL.createObjectURL(blob);
        setRecord(url);
        const file = new File([blob], `recorder.webm`, { type: "audio/webm" });
        let newVoice = { id, file };
        let existVoice = voicesAnswers.find((voice) => voice.id === id);

        if (existVoice) {
            voicesAnswers[existVoice] = newVoice;
        } else {
            let updatedVoiceAnswers = [...voicesAnswers, newVoice];
            setVoicesAnswers(updatedVoiceAnswers);
        }

        // Upload file to Firebase Storage
        const storageRef = ref(storage, `voice/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            },
            (error) => {
                console.error(error);
            },
            () => {
                // Get the download URL and pass it to saveVoiceDataLink
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    saveVoiceDataLink(downloadURL, question.id, record);
                }).catch((error) => {
                    console.error("Error getting download URL:", error);
                });
            }
        );
    };

    return (
        <>
            <AudioRecorder
                onRecordingComplete={(blob) => addAudioElement(blob, question.id)}
                audioTrackConstraints={{
                    noiseSuppression: true,
                    echoCancellation: true,
                }}
                downloadOnSavePress={false}
                downloadFileExtension="webm"
            />
        </>
    );
};

export default UploadVoiceRecord;
