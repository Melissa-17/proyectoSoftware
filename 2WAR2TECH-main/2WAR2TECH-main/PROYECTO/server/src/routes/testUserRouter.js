import {  Router } from 'express';
import passport from 'passport';
import { isLoggedIn } from '#Helpers/authHelper.js';

import "#Config/auth.js";
import { SignJWT } from 'jose';

const testUserRouter = Router();

const CLIENT_URL = 'http://localhost:3000';

/* Button to authenticate */
testUserRouter.get('', (req, res) => {
    res.send('<base href="http://localhost:3001/test-user/"/> <a href="auth/google">Authenticate with Google</a>');
});

/* Authentication with google */
testUserRouter.get('/auth/google', passport.authenticate('google', 
{ scope: ['email', 'profile'] })
);

/* Message in case the authentication fails */
testUserRouter.get('/auth/failure', (req, res) => {
    res.status(401).json({
        success: false,
        message: "failure"
    });
});

/* Message in case the authentication succeeds */
testUserRouter.get('/auth/success', async (req, res) => {
    
    if (req.user) {
        // console.log(req.user && req.user.SPECIALTies && req.user.SPECIALTies[0] ? req.user.SPECIALTies[0].id : null);
        const id = req.user.id;
        const role = req.user.ROLEs[0].id;    
        const specialty = req.user.SPECIALTies && req.user.SPECIALTies[0] && req.user.SPECIALTies[0].id ?  req.user.SPECIALTies[0].id : 1;
        // TODO: Agregar rol en el constructor
        const jwtConstructor = new SignJWT( { 'userId': id, 'userRole': role , 'userSpecialty': specialty} ); 
        const encoder = new TextEncoder();

        const jwt = await jwtConstructor.setProtectedHeader({
            alg: 'HS256',
            typ: 'JWT'
        })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        res.status(200).json({
            success: true,
            message: "successful",
            user: req.user,
            token: jwt
        });
    } else {
        res.status(401).json({
            success: false,
            message: "failure"
        });
    }   
});

/* Callback after authentication complete */
testUserRouter.get('/google/callback',
    passport.authenticate('google', {
       successRedirect: CLIENT_URL,
       failureRedirect: CLIENT_URL,
    })
);

/* La ruta protegida */
testUserRouter.get('/protected', isLoggedIn, (req, res) => {
    res.send(`<base href="http://localhost:3001/test-user/"/> Hello ${JSON.stringify(req.user)} <a href="logout">Logout</a>`);
});

/* Cerrar sesion */
testUserRouter.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect(CLIENT_URL);
    });
  });

export default testUserRouter;

// testUserRouter.get('/google/callback',
//     passport.authenticate('google', 
//     {successRedirect: CLIENT_URL,failureRedirect: CLIENT_URL, failureMessage: true}
//     ),
//     (req, res) => {S
        // const id = req.user.id;
        // const role = req.user.role;
        // // TODO: Agregar rol en el constructor
        // console.log(id);
        // const jwtConstructor = new SignJWT( { 'userId': id, 'role': role } ); 
        // const encoder = new TextEncoder();

        // const jwt = await jwtConstructor.setProtectedHeader({
        //     alg: 'HS256',
        //     typ: 'JWT'
        // })
        // .setIssuedAt()
        // .setExpirationTime('1h')
        // .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        // res.redirect(CLIENT_URL);
        // res.status(200).redirect(`${CLIENT_URL}?tk=${jwt}`);
//     }
// )