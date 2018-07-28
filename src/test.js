export const greetings = name => `hello ${name}`;

export function timeout(duration = 0) {
	return new Promise(resolve => {
		setTimeout(resolve, duration);
	});
}
