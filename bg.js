var start='!';
var defaultengine='g';
var end='>';

chrome.omnibox.onInputEntered.addListener(
  function(text) {
  	if(text.charAt(0)==end){
  		search(text.substr(1));
  		return;
  	}
  	var spliced_query=text.split(" ");
  	var searchengine=spliced_query.shift();
  	if(searchengine.charAt(0)!=start) {spliced_query.unshift(searchengine);searchengine="null";}
  	var stringquery=spliced_query.join("%20");

    var queryURL=make_url(get_engine(searchengine),stringquery);
    search(queryURL);
  });
function get_engine(ss){
	var url=undefined;
	var arr={
		'g':'http://www.google.com/search?q=%s',
		'a':'http://www.amazon.com/exec/obidos/external-search/?field-keywords=%s&mode=blended',
		'b':'https://www.bing.com/search?&q=%s',
		'gi':'http://www.google.com/search?q=%s&tbm=isch',
		'gm':'http://www.google.com/maps/search/%s',
		'yt':'http://www.youtube.com/results?search_query=%s',
		'f':'https://www.facebook.com/search/more/?q=%s',
		't':'https://twitter.com/search?q=%s',
    'r':'https://www.reddit.com/search?q=%s',
		'e': 'http://www.ebay.com/sch/i.html?_nkw=%s',
		'w':'http://en.wikipedia.org/w/index.php?search=%s',
		'y':'http://search.yahoo.com/search?p=%s',
		'i':'http://www.google.com/search?q=%s&tbm=isch',
		'so': 'http://stackoverflow.com/search?q=%s'
	};
	var engin=ss.substr(1);
	url=arr[engin];
	if(!url) {url=arr[defaultengine];}
	return url;
};
function make_url(searchengine,stringquery){
	var url=searchengine.replace('%s',stringquery);
	return url;
};

function search(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
};

window.addEventListener('click',function(e){
  if(e.target.href!==undefined){
    chrome.tabs.create({url:e.target.href})
  }
});
