import firebase from 'firebase/app'

export default () => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: 'AIzaSyClMRQ8WRnSygi8ou8bZ9qRSZgF3RF0frY',
      authDomain: 'egg-trail.firebaseapp.com',
      databaseURL: 'https://egg-trail.firebaseio.com',
      projectId: 'egg-trail',
      storageBucket: 'egg-trail.appspot.com',
      messagingSenderId: '529806955167',
      appId: '1:529806955167:web:721ff9ca47e08034b888aa',
      measurementId: 'G-JQR32W4EXS'
    })
  }
}
