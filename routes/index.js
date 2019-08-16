const fs = require('fs');
const path = require('path');

const basename = path.basename(module.filename);

module.exports = (app) => {
	// Load all js files in the folder and load routes
	fs.readdirSync(__dirname).filter(file => {
		// remove occult files and not js files
		return (file.indexOf('.') != 0) && (file != basename) && (file.slice(-3) == '.js');
	}).forEach(file => {
		// require route and use on app
		const routeFilePath = path.join(__dirname, file);
		const route = require(routeFilePath);
		app.use("/api/", route);
	})
}