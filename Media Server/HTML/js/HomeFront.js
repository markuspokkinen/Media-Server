window.onload = () => {
	const root = document.getElementById("root");
	
	formNewMovie(root);
	getData(root);
};
function formNewMovie(root) {

	var movieForm = document.createElement("form");
	movieForm.setAttribute("autocomplete", "off");
	movieForm.setAttribute("method", "POST");
	movieForm.setAttribute("action", "/Home/Movies");

	var pSB = document.createElement("p");
	var searchBar = document.createElement("input");
	searchBar.setAttribute("list", "movielist");
	searchBar.placeholder = "Movie Name";
	pSB.innerHTML = "Name: ";
	pSB.appendChild(searchBar);
	movieForm.appendChild(pSB);

	var hidInp = document.createElement("input");
	hidInp.setAttribute("type", "hidden");
	hidInp.setAttribute("name", "movID");
	movieForm.appendChild(hidInp);

	var release = document.createElement("input");
	var pR = document.createElement("p");
	pR.innerHTML = "Release Date: ";
	pR.appendChild(release);
	movieForm.appendChild(pR);

	var desc = document.createElement("textarea");
	var pDe = document.createElement("p");
	pDe.innerHTML = "Movie Desc";
	pDe.appendChild(desc);
	movieForm.appendChild(pDe);

	var movielist = document.createElement("datalist");
	movielist.id = "movielist";
	movieForm.appendChild(movielist);

	var subbutton = document.createElement("input");
	subbutton.setAttribute("type", "submit");
	subbutton.innerHTML = "Add Movie to DataBase";
	movieForm.appendChild(subbutton);


	searchBar.addEventListener("keyup", () => {

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				var json = JSON.parse(this.responseText);
				console.log(json);

				movielist.innerHTML = "";

				json.forEach(dat => {

					var option = document.createElement("option");
					option.setAttribute("id", dat.id);
					option.value = dat.title;
					if (searchBar.value === dat.title) {
						release.value = dat.release_date;
						desc.value = dat.overview;
						option.selected = true;
						hidInp.value = dat.id;
					}
					//console.log(option.selected);
					movielist.appendChild(option);
				});

			}

		};
		xhttp.open("GET", "Home/Movies/query/" + searchBar.value, true);
		xhttp.send();
	});
	root.appendChild(movieForm);
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