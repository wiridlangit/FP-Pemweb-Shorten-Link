// import { auth, db } from './config/firebase.js';
import { auth, db } from './config/firebase.js';
import { addDoc, collection } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
// import admin from './config/firebase-service-account-config.js';


const short_collection = collection(db, "shorten_test");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(morgan());
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

//SHORTEN LINK!!!
app.get("/shorts", (req, res) => {
    let shorts = [];
  
    try {
      short_collection
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
          const data = doc.data();
          // const short = data.short
          // const full = data.full
          shorts.push({
            id: doc.id,
            short: data.short,
            full: data.full,
          });
        });
        res.send(shorts);
      });
    } catch (error) {
      console.log(error);
      res.sendStatus(500)
    }
  });
  
  app.get("/shorts/:short", (req, res) => {
    const short_params = req.params.short;
  //   const {short} = req.params;
    let shorts = [];
    try {
      short_collection
        // .where("short", "==", short_params)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            console.log(data);
            shorts.push({
              id: doc.id,
              short: data.short,
              full: data.full,
            });
          });
  
          res.send(shorts);
          // res.send("halo")
        });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });
  
  app.delete("/shorts/:id", (req, res) => {
      const id_params = req.params.id;
  
      try{
          short_collection.doc(id_params).delete().then(()=>{
              res.send({
                  message: "Data telah dihapus."
              })
          })
      }
      catch (error){
          console.log(error)
      }
  })
  
  app.post("/shorts/", async(req, res) => {
    const real = req.body.real_link
    const random = req.body.random_link
    console.log(real, random)
      try{
        const q = await addDoc(short_collection, {
            full: real,
            short: random,
        })
          short_collection.add({
            full : real,
            short : random,
              // short:req.body.short,
              // full:req.body.full
          })
          res.send({
              message: "Data telah ditambahkan."
          })
      }
      catch (error){
          console.log(error)
      }
  })

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});