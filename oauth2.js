/* -----------------------------------------------------------
- KOOMBEA SAS. September 24, 2013
- Title: OAUTH2
- Authors: Iván Ardila (http://koombea.com)
----------------------------------------------------------- 
*/

OAuth2 = function(options){
	this.tokenAuthorizationUrl  = options.tokenAuthorizationUrl;
	this.key = options.key;
	this.secret = options.secret;
};

OAuth2.prototype.authorize = function(parameters, error, success){
	var s, _this;
	_this = this;
    s = encodeURIComponent(this.key)+ ':'+ encodeURIComponent(this.secret);
    
	$.ajax({
        type:"POST",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "Basic "+ btoa(s));
            request.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=UTF-8");
        },
        url: this.tokenAuthorizationUrl,
        data: 'grant_type='+parameters.grantType,
        processData: false,
        success: function(response){
        	_this._bearer = response.access_token;
        	success(response);
        },
        error: function(a, b, c){
        	alert("Error"+c);
        }
    });
};

OAuth2.prototype.get = function(url, parameters, error, success){
	var _this = this;
	$.ajax({
        type:"GET",
        beforeSend: function (request) {
            request.setRequestHeader("Authorization", "Bearer "+_this._bearer);
        },
        url: url,
        data: parameters,
        success: success,
        error: error
    });
	
};

OAuth2.prototype.isAuthenticated = function(){
	return this._bearer === 'undefined';
};
