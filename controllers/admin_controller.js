module.exports.adminHome=function(req, res){
    if(req.isAuthenticated()){
    return res.render('admin/adminhome');
    }
    return res.render('login',{
        title: "Sign In"
    });
}

module.exports.viewAllEmployees=function(req, res){
    return res.render('admin/viewallemployees');
}

module.exports.viewEmployee=function(req, res){
    return res.render('admin/viewemployee');
}