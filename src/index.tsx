import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { Home } from "./components/Home";

ReactDOM.render(
	<AppContainer>
		<Home compiler="TypeScript" framework="React" />
	</AppContainer>,
	document.getElementById("root")
);
