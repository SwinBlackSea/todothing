//obj is a <a> link
function fakeClick(obj) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    obj.dispatchEvent(ev);
}
//create a <a> link
function exportRaw(name, data) {
    var urlObject = window.URL || window.webkitURL || window;
    var export_blob = new Blob([data]);
    var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;
    fakeClick(save_link);
}
//ajax-XMLHttpRequest
var Ajax = {
    get: function (url, fn) {
        // XMLHttpRequest对象用于在后台与服务器交换数据   
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4 && xhr.status == 200 || xhr.status == 304) {
                // 从服务器获得数据 
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send();
    },
    // datat应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, fn) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", url, true);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 304)) {
                fn.call(this, xhr.responseText);
            }
        };
        xhr.send(data);
    }
}
//spiderCurrentPageLink
function spiderCurrentPageLinks(){
	let links=document.links;	
	let text='';
	for(var i=0;i<links.length;i++){
		text=text+';'+links[i]['href'];
	};
	exportRaw('file_'+Date.now()+'.txt',text)
}
//spiderLink
function spiderLinks(url){
	let domJson = ''
	Ajax.get(url,(resp)=>{domJson=resp})
	//保存domJson
	exportRaw('domJson_'+'0'+'.txt',domJson)
	//将string类型的rootDom转换为document类型
	let rootDom = ...(domJson)
	let links = rootDom.links
	for(var i=0;i<links.length;i++){
	    let childLink = links[i]['href'];
	    if(childLink){
	    	Ajax.get(url,(resp)=>{domJson=resp})
		exportRaw('domJson_'+i+1+'.txt',domJson)
	    }
	};
	exportRaw('file_'+Date.now()+'.txt',text)
}
//string->dom
function convertString2dom(xmlStr){
    var parseXml;
    if (window.DOMParser) {
        parseXml = function(xmlStr) {
            return ( new window.DOMParser() ).parseFromString(xmlStr, "text/xml");
        };
    } else if (typeof window.ActiveXObject != "undefined" && new window.ActiveXObject("Microsoft.XMLDOM")) {
        parseXml = function(xmlStr) {
            var xmlDoc = new window.ActiveXObject("Microsoft.XMLDOM");
            xmlDoc.async = "false";
            xmlDoc.loadXML(xmlStr);
            return xmlDoc;
        };
    } else {
        parseXml = function() { return null; }
    }
    return parseXml
}
