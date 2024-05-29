import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

const upload = async (file) => {
    const timestamp = Date.now()
    const storageRef = ref(storage, `images/${timestamp}_${file.name}`); //creating file with unique ID based on date
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise((resolve, reject) =>{
        uploadTask.on('state_changed', 
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            reject("Something went wrong!" +error.code)
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                resolve(downloadURL);
            });
        }
        );
    })   
};

export default upload;


// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import {storage} from './firebase'

// const upload = async (file) => {
//     const date = new Date() //date can be easily unique ID
//     const storageRef = ref(storage, `images/${date + file.name}`);    
//     const uploadTask = uploadBytesResumable(storageRef, file);
    
//     return new Promise((resolve, reject) => {
//         uploadTask.on('state_changed', 
//             (snapshot) => {
//                 const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + progress + '% done');
//             }, 
//             (error) => {
//                 reject("Something went wrong! " + error.code);
//             }, 
//             () => {
//                 // Handle successful uploads on complete
//                 getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//                     console.log('File available at', downloadURL);
//                     resolve(downloadURL); // Resolve the Promise with the download URL
//                 });
//             }
//         );
//     });
// };

// export default upload;
