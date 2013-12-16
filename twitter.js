/* -----------------------------------------------------------
- KOOMBEA SAS. September 24, 2013
- Title: Twitter client using Application Authentication 
- Authors: Iván Ardila (http://koombea.com)
----------------------------------------------------------- 
*/


function Twitter(config) {
    this.consumerKey = config.consumerKey;
    this.consumerSecret = config.consumerSecret;
    this.baseUrl =  
    this.oauth = new OAuth2({
    	tokenAuthorizationUrl: 'https://api.twitter.com/oauth2/token',
    	key: this.consumerKey,
    	secret: this.consumerSecret
    });
}

Twitter.baseUrl = "https://api.twitter.com/1.1";

Twitter.prototype.search = function (params, error, success) {
    var path = '/search/tweets.json';
    var url = Twitter.baseUrl + path;
    this.doRequest(url, params, error, success);
};

Twitter.prototype.searchUserStatuses = function (params, error, success) {
    var path = '/statuses/user_timeline.json';
    var url = Twitter.baseUrl + path;
    this.doRequest(url, params, error, success);
};

Twitter.prototype.doRequest = function (url, params, error, success) {
	var _this = this;
	if(this.oauth.isAuthenticated()){
		this.oauth.get(url, params, error, success);
	}else{
		this.oauth.authorize({grantType: 'client_credentials'}, 
		function(){
		},
		function(){
			_this.oauth.get(url, params, error, success);
		});
	}
    
};

Twitter.prototype.buildQS = function (params) {
    if (params && Object.keys(params).length > 0) {
        return '?' + $.param(params);
    }
    return '';
};