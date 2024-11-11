function DOMtoString(document_root) {
    var html = '',
        node = document_root.getElementsByTagName("table")[0];
		node2 = document_root.getElementsByTagName("table")[1];
	var host=node.getElementsByTagName("td")[1];
	var trigger=node2.getElementsByTagName("td")[1];
	
	node2.getElementsByTagName("tr")[1].remove();
	var desc=node2.getElementsByTagName("td")[11];
	var severity=node2.getElementsByTagName("td")[3];
	var time=node2.getElementsByTagName("td")[5];
	
	
	
//Capturing the SOLUTION: GTM for all the different span rows	
var gtm=document_root.getElementsByTagName("span")[8].outerText;
var m = gtm.search("GTM");
var gtmdata="NGTM"
if(m == -1)
{
	gtm=document_root.getElementsByTagName("span")[7].outerText;
	var p = gtm.search("GTM");
	if (p==-1)
	{
		gtm=document_root.getElementsByTagName("span")[6].outerText;
		var k = gtm.search("GTM");
		if(k !=-1)
		{
			gtmdata="GTM"
		}
	}
	else
	{
		gtmdata="GTM"
	}
}
else
{
	gtmdata="GTM"
}

//Capturing GM TAG 
var message=document_root.getElementsByClassName("icon-action-ack")[8];
	
//Capturing the CSR for all the different span rows	
var csr=document_root.getElementsByTagName("span")[8];
var csrdata= csr.outerText;
var csrvalue =csrdata;
var n = csrdata.search("SFID:");
if(n == -1)
{
	csr=document_root.getElementsByTagName("span")[7];
	csrdata= csr.outerText;
	csrvalue =csrdata;
	n = csrdata.search("SFID:");
	if(n == -1)
	{
		csr=document_root.getElementsByTagName("span")[9];
		csrdata= csr.outerText;
		csrvalue =csrdata;
		n = csrdata.search("SFID:");		
	}
	
	if(n == -1)
	{
		csr=document_root.getElementsByTagName("span")[10];
		csrdata= csr.outerText;
		csrvalue =csrdata;
		n = csrdata.search("SFID:");		
	}
	
	if(n == -1)
	{
		csr=document_root.getElementsByTagName("span")[1];
		csrdata= csr.outerText;
		csrvalue =csrdata;
		n = csrdata.search("SFID:");		
	}
	
	if(n == -1)
	{
		csr=document_root.getElementsByTagName("span")[6];
		csrdata= csr.outerText;
		csrvalue =csrdata;	
	}
}
	 
	 
if(gtmdata === "GTM")
{
	var severe=severity.outerText
	if(severe==="High")
	{
		var severitydata="HIGH"
	}
	else
	{
		var severitydata="DISASTER"
	}
	 html+="Title: ["+severitydata+"] "+host.outerText +" |"+trigger.outerText+" | "+time.outerText +" UTC"+"\n\n";
	 html += "Alert Description: \n "+ desc.outerText + "\n\n";
	 html += "Alert url: " + window.location.href
}
else
{	
	//html += "Notify: " +  + "\n\n";
	html += "Hello, new alert has been reported" + " "+ csrvalue.replace("SFID:", "") + "\n\n";
	html += "Host & solution: " + host.outerText + "\n\n" ;
    html += "Event: " + trigger.outerText + "\n\n";	
	html += "Trigger Description: \n "+ desc.outerText + "\n\n";
	html += "Alert url: " + window.location.href
}
    return html;
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});