// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from '@firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAfEdX_OwzYAldmjuCmpa_vLxSAPALToO0",
	authDomain: "swish-v2.firebaseapp.com",
	projectId: "swish-v2",
	storageBucket: "swish-v2.appspot.com",
	messagingSenderId: "134463963457",
	appId: "1:134463963457:web:37ee3524f8a6682656a1c0",
	measurementId: "G-F7GB2S1YFS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);