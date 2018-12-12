var middlewareObj={};
var Campground=require('../models/campground');
var Comment=require('../models/comment');

middlewareObj.checkCampgroundOwnership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Campground.findById(req.params.id,(err,foundCampground)=>{
            if(err)
            res.redirect("back");
            else{
                if(foundCampground.author.id.equals(req.user._id))
                {
                    next();   
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
       
        res.redirect("back");
    }
}


middlewareObj.checkCommentOwnership=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(err)
            res.redirect("back");
            else{
                if(foundComment.author.id.equals(req.user._id))
                {
                    next();   
                }
                else{
                    res.redirect("back");
                }
            }
        });
    }
    else{
       
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect("/login");
}



module.exports=middlewareObj;