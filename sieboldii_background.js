async function closeTab(tabId) {
	await chrome.tabs.remove(tabId);
}

const actions = {
	closeTab: {
		label: 'Close tab',
		action: closeTab,
	},
};

chrome.runtime.onMessage.addListener(async (request, sender) => {
	if (request?.type !== 'sieboldii-click') return;

	const actionName = request.action;
	const tabId = sender.tab.id;

	const action = actions[actionName]?.action;

	await action(tabId);
});
