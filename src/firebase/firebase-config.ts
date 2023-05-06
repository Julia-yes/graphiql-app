const config = {
  apiKey: 'AIzaSyBDvsk6DDb-h1KgKiUYtTe1Qbeam2dXjaU',
  authDomain: 'easygraphql-3bdfc.firebaseapp.com',
  projectId: 'easygraphql-3bdfc',
  storageBucket: 'easygraphql-3bdfc.appspot.com',
  messagingSenderId: '315321657404',
  appId: '1:315321657404:web:437d37685d33e5139a3b39',
};

export function getFirebaseConfig() {
  if (!config || !config.apiKey) {
    throw new Error('No Firebase configuration object provided');
  } else {
    return config;
  }
}
