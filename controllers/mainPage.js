//Function to serve the home(signup&signin related) file with corresponding route
exports.getHomepage = (request, response, next) => {
  response.sendFile("home.html", { root: "views" });
};
// Function to serve the notfound.html file
exports.getErrorpage = (request, response, next) => {
  response.sendFile("notfound.html", { root: "views" });
};
//Function to server main file with their corresponding route
exports.getMainpage = (request, response, next) => {
  response.sendFile("main.html", { root: "views" });
};
