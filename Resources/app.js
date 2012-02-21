
var rss = {
	mainTabGroup: null
};
	
Ti.include('ui.js','network.js', 'create.js');

rss.mainTabGroup = rss.ui.createApplicationTabGroup();
rss.mainTabGroup.open();


