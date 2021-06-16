const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');


passport.use(new googleStrategy({
    clientID:"594598604253-gkivpuf8rhav2khduojgr9s6tg890pcc.apps.googleusercontent.com",
    clientSecret:"2HqUCZUZxYg3HAdi0P_kIBr6",
    callbackURL:"http://localhost:8000/users/auth/google/callback",
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).exec(function(err,user){
            if(err){console.log('error',err); return ;}

            console.log(profile);
            if(user)
            {
                return done(null,user);
            }
            else
            {
                User.create({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    password:crypto.randomBytes(20).toString('hex')


                },function(err,user)
                {
                    if(err)
                    {
                        console.log('error int creating ggole',err);
                        return ;
                    }
                    return done(null,user);
                })
            }
        })
    }


));

module.exports=passport;