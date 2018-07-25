import * as React from "react";
// import * as styles from "./Home.scss";
// tslint:disable-next-line:no-var-requires
// const styles = require<any>("./Home.css");
// const styles = require("./HomeStyle.scss");
import * as styles from "./HomeStyle.scss";

export interface IHelloProps {
	compiler: string;
	framework: string;
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Home extends React.Component<IHelloProps, {}> {
	public render() {
		return (
			<h1 className={styles.test}>
				Hellos from {this.props.compiler} and {this.props.framework}!
			</h1>
		);
	}
}
