// import { auth, db } from './config/firebase.js';
import { auth } from './config/firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan());
const port = 3000;

app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.post('/', (req, res) => {
    const { email, password } = req.body;
    
    try {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return res.send({
                message: "User signed in successfully",
                token: user.accessToken,
                expirationTime: user.expirationTime,
                refreshToken: user.refreshToken
            });
        })
        .catch((error) => {
            return res.status(400).send(error);
        });
    } catch (error) {
        return res.status(500).send({
            message: 'Internal server error'
        })
    }
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    try {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            res.send({
                message: "User created successfully",
                token: user.accessToken,
                expirationTime: user.expirationTime,
                refreshToken: user.refreshToken
            })
        })
        .catch((error) => {
            res.status(400).send({
                message: error,
            })
        });
    } catch (error) {
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});