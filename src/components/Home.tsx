import assign from "lodash-es/assign";
import * as React from "react";
// import * as styles from "./Home.scss";
// tslint:disable-next-line:no-var-requires
// const styles = require<any>("./Home.css");
// const styles = require("./HomeStyle.scss");
import * as styles from "../css/global.scss";
import * as styles2 from "./HomeStyle.scss";

export interface IHelloProps {
	compiler: string;
	framework: string;
}

// import * as assign from "lodash/assign";
// const xx = _.assign({ name: "helo" }, { lastName: "hoi" });
const xx = assign({}, { name: "helo" }, { lastName: "hoi" });

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Home extends React.Component<IHelloProps, {}> {
	public render() {
		return (
			<div>
				<h1 className={styles.test}>
					Hellos from {this.props.compiler} and {this.props.framework}
					!
				</h1>
				<h1 className={styles2.test}>
					Hellos from {this.props.compiler} and {this.props.framework}
					!
				</h1>
				<h1 className={styles2.test}>{xx.name}</h1>
				<img
					src={require("../images/HlmWDMU.jpg")}
					width="500"
					height="250"
				/>
			</div>
		);
	}
}
