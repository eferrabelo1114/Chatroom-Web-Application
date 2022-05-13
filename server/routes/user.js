import express from 'express'
const router = express.Router()

////////////////////////////////////////////////////////////////////////
/*
    Keeps track of the users on the server
    Change this to a database and add signing up/real user auth later
*/
const ActiveUsers = [];

// Makes sure the username is valid
function validate(usernameForm) {
    if (typeof usernameForm.Username === 'undefined') {
        return {
            success: false,
            message: "Invalid username"
        }
    }

    return {
        success: true,
    }
}

//Move these out of here eventually
////////////////////////////////////////////////////////////////////////

router.get('/user', (req, res) => {
    if (req.session.loggedIn == true) {
        res.json('{"loggedIn": true}')

        let username = req.session.username
        const usernameExists = ActiveUsers.findIndex( ( name ) => name === username )
    
        if (usernameExists === -1) {
            ActiveUsers.push(req.session.username)
        }
        
        return
    }

    const usernameExists = ActiveUsers.find( ( name ) => name === req.body.Username )
    if (typeof usernameExists !== 'undefined') {
       return res.json({
            success: false,
            message: "Username Taken"
        })
    }

    res.json('{"loggedIn": false}')
});

router.post('/logout', (req, res) => {
    let username = req.session.username;
    const usernameExists = ActiveUsers.findIndex( ( name ) => name === username );

    if (usernameExists > -1) {
        ActiveUsers[usernameExists] = null;
    }

    req.session = null;
    res.set('Access-Control-Allow-Origin', 'http://192.168.1.20:3000')
    res.json('{"success": true}')
})

router.post('/signup', (req, res) => {
    const validationResult = validate(req.body);

    if (!validationResult.success) {
    return res.status(400).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
        });
    }

    req.session.loggedIn = true;
    req.session.username = req.body.Username;

    ActiveUsers.push(req.body.Username);

    res.json({
        success: true
    });
})


export default router