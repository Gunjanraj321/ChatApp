exports.getHomepage = (req, res, next) =>{
  res.sendFile('index.html',{root:'views'});
}