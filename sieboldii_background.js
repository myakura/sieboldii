async function _getCurrentTab() {
	const queryOptions = { active: true, lastFocusedWindow: true };
	const [tab] = await chrome.tabs.query(queryOptions);
	console.log(tab);
	return tab;
}

async function _getTabByTabIndex(index) {
	const queryOptions = { lastFocusedWindow: true, index: index };
	const [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

async function _selectTabByTabIndex(index) {
	const tab = await _getTabByTabIndex(index);
	const updateProperties = { active: true };
	await chrome.tabs.update(tab.id, updateProperties);
}

async function closeTab(tabId) {
	await chrome.tabs.remove(tabId);
}

async function selectNextTab() {
	const currentTab = await _getCurrentTab();
	const nextTabIndex = currentTab.index + 1;
	await _selectTabByTabIndex(nextTabIndex);
}

const actions = {
	closeTab: {
		label: 'Close tab',
		action: closeTab,
	},
	selectNextTab: {
		label: 'Select next tab',
		action: selectNextTab,
	},
};

chrome.runtime.onMessage.addListener(async (request, sender) => {
	if (request?.type !== 'sieboldii-click') return;

	const actionName = request.action;
	const tabId = sender.tab.id;

	const action = actions[actionName]?.action;

	await action(tabId);
});
