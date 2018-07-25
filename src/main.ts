import { app, BrowserWindow } from "electron";
import * as path from "path";
import * as url from "url";
import * as gre from "./test";

let mainWindow: BrowserWindow | null;

function createWindow() {
	mainWindow = new BrowserWindow({
		show: false,
		height: 600,
		width: 800
	});
	// mainWindow.webContents.openDevTools();
	const c = gre.greetings("DELETED THIS ONLY HERE FOR TESTING");
	// tslint:disable-next-line:no-console
	console.log(c);

	const indexPath = url.format({
		pathname: path.join(__dirname, "../", "../", "index.html"),
		protocol: "file" + ":",
		slashes: true
	});
	// tslint:disable-next-line:no-console
	console.log(indexPath);
	mainWindow.loadURL(indexPath);

	gre.greetings("hello");
	mainWindow.webContents.on("did-finish-load", () => {
		if (!mainWindow) {
			throw new Error('"mainWindow" is not defined');
		}
		mainWindow.show();
		mainWindow.focus();
	});

	mainWindow.on("closed", () => {
		mainWindow = null;
	});
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (mainWindow === null) {
		createWindow();
	}
});
