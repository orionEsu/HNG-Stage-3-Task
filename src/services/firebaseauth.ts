import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDv28SZ52sw4hNOeB4ek0teIchRR0bs8W8',
	authDomain: 'hng-stage-three-task.firebaseapp.com',
	projectId: 'hng-stage-three-task',
	storageBucket: 'hng-stage-three-task.appspot.com',
	messagingSenderId: '228123841565',
	appId: '1:228123841565:web:862cce2aaff8075e2ce2f4',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
