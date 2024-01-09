exports.getHomepage = (req, res, next) =>{
  res.sendFile('home.html',{root:'views'});
}
exports.getErrorpage = (req, res, next)=>{
  res.sendFile('notfound.html',{root:'views'});
}
exports.getMainpage = (req, res, next)=>{
  res.sendFile('main.html',{root:'views'});
}