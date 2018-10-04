window.onload = () => {
	formNewMovie();
};
function formNewMovie() {

	const root = document.getElementById("root");
	var movieForm = document.createElement("form");
	movieForm.setAttribute("autocomplete", "off");
	movieForm.addEventListener("submit", newMovieSubmit);

	var searchBar = document.createElement("input");
	searchBar.setAttribute("list", "movielist");
	searchBar.placeholder = "Movie Name";
	searchBar.name = "Movie[Name]";

	

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
	subbutton.setAttribute("type", "Submit");
	subbutton.value = "Add Movie to DataBase";
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
						movieForm.setAttribute("id", dat.id);
						release.value = dat.release_date;
						desc.value = dat.overview;
						option.selected = true;
					}
					//console.log(option.selected);
					movielist.appendChild(option);
				});

			}

		};
		xhttp.open("GET", "/Movies/query/" + searchBar.value, true);
		xhttp.send();
	});
	root.appendChild(movieForm);
}
function newMovieSubmit(e) {
	e.preventDefault();
	console.log(e);
}