function createButton({ actionName, label }) {
	const button = document.createElement('button');
	button.type = 'button';
	button.textContent = label;
	button.dataset.actionName = actionName;

	return button;
}

function addToolbarStyle() {
	const styleSheet = `
	body {
		position: relative;
	}
	.SieboldiiToolbar {
		position: fixed;
		top: 40px;
		z-index: 1;

		width: 100%;
		display: flex;
		justify-content: center;
		gap: 8px;

		opacity: 30%;
		transition: 200ms ease-out opacity;
		will-change: opacity;
	}
	.SieboldiiToolbar:hover {
		opacity: 100%
	}
	.SieboldiiToolbar button {
		padding-block: 0.3em;
	}
	`;
	const styleElement = document.createElement('style');
	styleElement.classList.add('.SieboldiiStyle');
	styleElement.textContent = styleSheet;
	document.head.append(styleElement);
}

function createToolbar() {
	const div = document.createElement('div');
	div.classList.add('SieboldiiToolbar');

	addToolbarStyle();

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
		{ actionName: 'selectPreviousTab', label: 'Select previous tab' },
		{ actionName: 'closeTab', label: 'Close tab' },
		{ actionName: 'selectNextTab', label: 'Select next tab' },
	];
	const buttons = specs.map(({ actionName, label }) =>
		createButton({ actionName, label }),
	);
	const toolbar = createToolbar();
	toolbar.append(...buttons);

	document.body.append(toolbar);
}

(function main() {
	createUi();
})();
