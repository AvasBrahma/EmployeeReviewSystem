
module.exports.createAccount=async function(req, res){
    return res.render('create-account');
}

module.exports.login= async function(req, res){
    return res.render('login');
}