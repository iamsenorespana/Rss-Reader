(function() {
	//Create sub-namespace
	rss.ui = {};
	
	//Create the main application tab group
	rss.ui.createApplicationTabGroup = function(_args) {
		var tabs = Ti.UI.createTabGroup();
		
		// 
		var localPage = rss.ui.createLocalPage();
		var remotePage = rss.ui.createRemotePage();
		
		//for now, just create some simple tabs named how we would want them
		tabs.addTab(
			Ti.UI.createTab({
			title:'Remote HTML',
			window: remotePage
			})
		);
		
		//for now, just create some simple tabs named how we would want them
		tabs.addTab(Ti.UI.createTab({
			title:'Local HTML',
			window: localPage
		}));
		
		return tabs;
	};
	
	rss.ui.createLocalPage = function(){
		var _win = Ti.UI.createWindow({
			backgroundColor: 'red'
		});
		
			var wv = Ti.UI.createWebView({
				url: 'html/about.html'
			});
			
		_win.add( wv );
		return _win;
	};
	
	rss.ui.createRemotePage = function(){
		var _win = Ti.UI.createWindow({
			backgroundColor: 'purple'
		});
		
			var tv = Ti.UI.createTableView({
				
			});
			
			tv.addEventListener('click', function(e){
				var _win = Ti.UI.createWindow({
					title: 'Detailed View' 
				});
					var preview = Ti.UI.createWebView({
						url: e.rowData.postLink
					});
					_win.add(preview);
					
				rss.mainTabGroup.activeTab.open(_win,{animated: true});
			});
			
 			rss.net.getBlogFeed()
			
			Ti.App.addEventListener('net:rssDataReturned',function(e){
				tv.setData( e.blogPosts );
			});
			
		_win.add( tv );	
		return _win;		
	};
	
})();