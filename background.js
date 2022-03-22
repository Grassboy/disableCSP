function modifyHeader(e){
    var setMyCookie = {
        name: "Set-Cookie",
        value: "my-cookie1=change-at-"+(new Date().toString().split(' ')[4])
    };
    e.responseHeaders.push(setMyCookie);
    e.responseHeaders = e.responseHeaders.filter(function(h){
        var is_csp_header = h.name.toLowerCase() == 'content-security-policy';
        if(is_csp_header) {
            console.log('ignore csp header', h.value);
        }
        return !is_csp_header;
    });
    return {responseHeaders: e.responseHeaders};
}

browser.webRequest.onHeadersReceived.addListener(
  modifyHeader,
  {urls: ["*://*/*"], types: ["main_frame", "sub_frame"]},
  ["blocking", "responseHeaders"]
)
