module.exports.setFlash=function(req,res,next)//midllewawere for connect so that we don't have to write every time for sending it inot front end
{
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}