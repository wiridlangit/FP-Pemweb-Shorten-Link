// import { auth, db } from './config/firebase.js';
import { auth, db } from './config/firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { doc, getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import morgan from 'morgan';
import admin from './config/firebase-service-account-config.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
const port = 3000;

app.get('/hello', (req, res) => {
	res.send('Hello World!');
});

app.post('/post/login', (req, res) => {
	const { email, password } = req.body;

	try {
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				console.log('ini Login');
				// localStorage.setItem('uid', user.uid)
				res.send(user);
			})
			.catch((error) => {
				console.log(error);
				return res.status(400).send(error);
			});
	} catch (error) {
		return res.status(500).send({
			message: 'Internal server error'
		});
	}
});

app.post('/signup', (req, res) => {
	const { email, password } = req.body;

	try {
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
				res.send({
					message: 'User created successfully',
					token: user.accessToken,
					expirationTime: user.expirationTime,
					refreshToken: user.refreshToken
				});
			})
			.catch((error) => {
				res.status(400).send({
					message: error
				});
			});
	} catch (error) {
		res.status(500).send({
			message: 'Internal Server Error'
		});
	}
});

//SHORTEN LINK!!!

app.get('/shorts', async (req, res) => {
	try {
		let shorts = [];
		const querySnapshot = await getDocs(collection(db, 'shorten_list')).catch((err) => console.log(err));
	
		querySnapshot.forEach((doc) => {
	
			console.log(doc.id, ' => ', doc.data());
		
			let id = doc.id;
			shorts.push({ id, ...doc.data() });
		});

		res.send(shorts);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

app.delete('/shorts/:short', (req, res) => {
	const id_params = req.params.short;
	console.log(id_params);
	try {
		const docRef = deleteDoc(doc(db, 'shorten_list', id_params)).then(() => {
			res.send({
				message: 'Data telah dihapus.'
			});
		});
	} catch (error) {
		console.log(error);
	}
});

app.patch('/shorts/:id', (req, res) => {
	const real = req.body.real_link;
	console.log(real);
	try {
		updateDoc(doc(db, 'shorten_list', req.params.id), {
			full: real,
			editState: false
		}).then(() => {
			console.log('aman');
		});
	} catch (error) {
		console.log(error);
		res.send({
			status: false,
			message: 'Failed to update link'
		});
	}
});
 
app.post('/shorts/', (req, res) => {
	const real = req.body.real_link;
	const random = req.body.random_link;
	console.log(real, random);
	try {
		const docRef = addDoc(collection(db, 'shorten_list'), {
			full: real,
			short: random,
			uid: req.body.uid,
			editState: false,
			count: 0
		});
		res.send({
			message: 'Data telah ditambahkan.'
		});
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
