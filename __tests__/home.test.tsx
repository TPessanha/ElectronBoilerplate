import React from "react";
import renderer from "react-test-renderer";
import { Home } from "../src/components/Home";

it("renders correctly", () => {
	const tree = renderer
		.create(<Home compiler="TypeScript" framework="React" />)
		.toJSON();
	expect(tree).toMatchSnapshot();
});
