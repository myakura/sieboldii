function createButton({ actionName, label }) {
	const button = document.createElement('button');
	button.type = 'button';
	button.textContent = label;
	button.dataset.actionName = actionName;

	return button;
}

function createToolbar() {
	const div = document.createElement('div');
	div.classList.add('SieboldiiToolbar');

	div.addEventListener('click', async (event) => {
		await handleToolbarClick(event);
	});

	return div;
}

async function handleToolbarClick(event) {
	const actionName = event.target.dataset?.actionName;

	if (event.target.tagName !== 'BUTTON' || !actionName) {
		return;
	}

	const message = {
		type: `sieboldii-click`,
		action: actionName,
	};
	await chrome.runtime.sendMessage(message);
}

function createUi() {
	const specs = [
		{ actionName: 'closeTab', label: 'Close tab' },
		{ actionName: 'selectNextTab', label: 'Select next tab' },
	];
	const buttons = specs.map(({ actionName, label }) =>
		createButton({ actionName, label }),
	);
	const toolBar = createToolbar();
	toolBar.append(...buttons);

	document.body.append(toolBar);
}

(function main() {
	createUi();
})();
