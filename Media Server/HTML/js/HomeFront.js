window.onload = () => {
	const root = document.getElementById("root");
	
	formNewMovie();
	getData(root);
};
function formNewMovie() {
	var searchBar = document.getElementById("movieSearchBar");
	var movielist = document.getElementById("movielist");
	var release = document.getElementById("movieRelease");
	var desc = document.getElementById("movieDesc");
	var hidInp = document.getElementById("moviehidID");

	searchBar.addEventListener("keyup", () => {
		var searchval = searchBar.value.split(" (")[0];

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				var json = JSON.parse(this.responseText);
				console.log(json);

				movielist.innerHTML = "";

				json.forEach(dat => {

					var option = document.createElement("option");
					option.setAttribute("id", dat.id);
					var optval = dat.title + " ( " + dat.release_date + " )";
					option.value = optval;
					if (searchBar.value === optval) {
						release.value = dat.release_date;
						desc.value = dat.overview;
						hidInp.value = dat.id;
					}
					//console.log(option.selected);
					movielist.appendChild(option);
				});

			}

		};
		xhttp.open("GET", "/Movies/query/" + searchval, true);
		xhttp.send();
	});
}
function getData(root) {
	var moviep = document.createElement("p");
	moviep.innerHTML = "All Movies: ";
	root.appendChild(moviep);
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status === 200) {
			var json = JSON.parse(this.responseText);
			console.log(json);
			json.forEach(ent => {
				var p = document.createElement("p");
				p.innerHTML = ent.Title + " (" + ent.ReleseDate + ")";
				root.appendChild(p);
			});
	

		}
	};
	xhttp.open("GET", "Home/Movies/", true);
	xhttp.send();
};