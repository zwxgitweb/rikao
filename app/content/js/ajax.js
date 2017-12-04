function ajax (obj) {
    var xml = new XMLHttpRequest();
    xml.open([obj.method], [obj.url]);
    xml.send(null);
    var promise = new Promise((resolve, reject) => {
        xml.onreadystatechange = function () {
            if (xml.readyState !== 4) {
                return;
            }
            if (xml.status === 200) {
                resolve(xml.response);
            } else {
                reject(xml.statusText);
            }
        }
    })
    return promise;
}
ajax({
    method: 'get',
    url: 'http://localhost:8080/getdata'
}).then(function (data) {
    var d = JSON.parse(data);
    renserToDom(d);
}, function (err) {
    console.log(err);
})