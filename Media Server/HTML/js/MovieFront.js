window.onload = function () {
	var root = document.getElementById("root");
	getmoviesdata(root);
};
function getmoviesdata(root){
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			var json = JSON.parse(this.responseText);
			console.log(json);

		}
	};
	xhttp.open("GET", "Movies/", true);
	xhttp.send();
}