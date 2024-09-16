import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  appId: process.env.REACT_APP_APPID

  // apiKey: "AIzaSyCfudGcbJqupAg_ddFFj-LgV8KfAMap0BA",
  // projectId: "insightify-infomericainc",
  // storageBucket: "insightify-infomericainc.appspot.com",
  // appId: "1:476029687149:android:dd470584be4c4b44753664"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);