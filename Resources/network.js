(function() {
	rss.net = {};
	
	rss.net.getBlogFeed = function() {
		var xhr = Titanium.Network.createHTTPClient();
		xhr.onload = function() {
			
			var xml = this.responseXML;
			var channel = xml.documentElement.getElementsByTagName("channel");

			// begin looping through blog posts
			var data = [];
			var items = xml.documentElement.getElementsByTagName("item");
			for (var i=0;i<items.length;i++) {
				data.push({
					title: items.item(i).getElementsByTagName("title").item(0).text,
					postTitle: items.item(i).getElementsByTagName("title").item(0).text,
					postLink: items.item(i).getElementsByTagName("link").item(0).text
				});
			}
			
			Ti.API.debug(data);
			// _cb(data);
			// fire an app-level event to notify the UI that the blog data is available
			Ti.App.fireEvent('net:rssDataReturned',{
				blogTitle: channel.item(0).getElementsByTagName("title").item(0).text,
				blogPosts: data
			});
			//_cb(JSON.parse(this.responseText));
		};
		xhr.open("GET","http://developer.appcelerator.com/blog/feed");
		xhr.send();
	};
	
 
})();