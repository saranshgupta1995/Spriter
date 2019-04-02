function readTextFile() {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", window.location.href, true);
    rawFile.setRequestHeader('Access-Control-Allow-Origin','*')
    rawFile.setRequestHeader('Access-Control-Allow-Credentials',true)
    rawFile.onreadystatechange = function () {
        console.log(rawFile)
        if (rawFile.readyState === 4) {
            var allText = rawFile.responseText;
            document.getElementById("textSection").innerHTML = allText;
        }
    }
    rawFile.send();
}

readTextFile()