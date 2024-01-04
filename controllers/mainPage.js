exports.getHomepage = (req, res, next) =>{
  res.sendFile('home.html',{root:'views'});
}