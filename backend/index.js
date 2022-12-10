// import { auth, db } from './config/firebase.js';
import { auth, db } from './config/firebase.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { doc, getFirestore, collection, getDocs, addDoc, deleteDoc } from 'firebase/firestore';
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
            console.log("ini Login")
            // localStorage.setItem('uid', user.uid)
            res.send(user.uid);
        })
        .catch((error) => {
            console.log(error)
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

//Redirect
app.get("/shorts", async (req, res) => {
    
    try {
    let shorts = [];
    const querySnapshot = await getDocs(collection(db, "shorten_test")).catch(err => (console.log(err)));
    //   short_collection
    //   .get()
    //   .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // console.log(doc.data());
        //   const data = doc.data();
        console.log(doc.id, " => ", doc.data());
          // const short = data.short
          // const full = data.full
          let id= doc.id
          shorts.push({id, ... doc.data()})
          });

        res.send(shorts)
     }catch (error) {
      console.log(error);
      res.sendStatus(500)
    }
  });
  
  //Nampilin ShortLink
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
            const id = doc.id;
            console.log(data);
            console.log(id);
            shorts.push({
              id: this.id,
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
  
  app.delete("/shorts/:short", (req, res) => {
      const id_params = req.params.short;
      console.log(id_params)
      try{
        const docRef = 
        deleteDoc(doc(db, "shorten_test" , id_params)).then(() => { res.send({
                  message: "Data telah dihapus."
              })} )
        //   })
    //    const shortURL = db.collection('shorten_test');
    //    shortURL.delete();
    //    res.send({
    //     message: "data removed",
    //     status: true,
    //    })
      }
      catch (error){
          console.log(error)
      }
  })
  
  app.post("/shorts/", (req, res) => {
    const real = req.body.real_link
    const random = req.body.random_link
    console.log(real, random)
      try{
        const docRef = addDoc(collection(db,"shorten_test"),{
            full: real,
             short: random,
             uid: req.body.uid
        });
        //   short_collection.add({
        //     full : real,
        //     short : random,
              // short:req.body.short,
              // full:req.body.full
        //   })
          res.send({
              message: "Data telah ditambahkan."
          })
      }
      catch (error){
          console.log(error)
      }
  });

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});