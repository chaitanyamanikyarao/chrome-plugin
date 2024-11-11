chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    message.innerText = request.source;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error in getting zabbix data script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;

document.addEventListener('DOMContentLoaded', function() {
	var xhr = new XMLHttpRequest();

			/* Replace the below mentioned field id's with that of your form */
			chrome.tabs.executeScript(null,{code:"document.getElementById('message').value = 'Notifying to Respective team'"});
			chrome.tabs.executeScript(null,{code:"document.getElementById('acknowledge_problem').checked = true"});
			
	
});
