import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyD00Zh3z-wfAQf4batkT69zGsEUFWp7Z2M",
  authDomain: "dhruvadminpanel.firebaseapp.com",
  databaseURL: "https://dhruvadminpanel-default-rtdb.firebaseio.com",
  projectId: "dhruvadminpanel",
  storageBucket: "dhruvadminpanel.appspot.com",
  messagingSenderId: "959174358958",
  appId: "1:959174358958:web:3425d7afc60d7daf28ba3f",
  measurementId: "G-94X69LTL1Y"
};

  const app = initializeApp(firebaseConfig);
  var storage = getStorage(app);
  export default storage;