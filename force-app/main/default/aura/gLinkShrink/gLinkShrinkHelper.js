({
    load: function() {

        
      },
    onClick: function(component, event) {
        
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create element to open OAuth 2.0 endpoint in new window.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {'client_id': 'asdf',
                  'redirect_uri': 'http://salesforce.com',
                  'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
                  'state': 'try_sample_request',
                  'include_granted_scopes': 'true',
                  'response_type': 'token'};

    // Add form parameters as hidden input values.
    for (var p in params) {
      var input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', p);
      input.setAttribute('value', params[p]);
      form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
    return;
        var apikey = component.get("v.apikey");
        if (!apikey) {
           throw new Error("apikey must be specified")
           return;
        }
        var url = component.get("v.url");
        this.request(apikey, JSON.stringify({longUrl: url}))
        	.then( $A.getCallback(function(response) {
            	var short = JSON.parse(response);
            	component.set("v.shortened",  short.id); 
        	}))
        .catch( function(err) {
            $A.get("e.force:showToast").setParams( {
                title: "Error shortening URL", 
                message: "Server response: "+err.response
            }).fire();
        });
    },
    request: function ( apikey, data ) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://www.googleapis.com/urlshortener/v1/url?key='+apikey);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.onload = function () {
              if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
              } else {
                reject({
                  status: this.status,
                  statusText: xhr.statusText,
                  response: xhr.response
                });
              }
            };
            xhr.onerror = function () {
              reject({
                status: this.status,
                statusText: xhr.statusText
              });
            };
            xhr.send(data);
          });
	}

})