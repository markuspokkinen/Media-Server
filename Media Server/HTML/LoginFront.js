window.onload = function () {
			var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (this.readyState === 4 && this.status == 200) {
			var json = JSON.parse(this.responseText);
			console.log(json);
			var divprof = document.getElementById("profIDS");
			json.forEach(elem => {
				var form = document.createElement('form');
				form.method = "post";
				form.action = "/Home";

				var input = document.createElement("input");
				input.type = "submit";
				input.value = elem.name;
				form.appendChild(input);

				var hidinput = document.createElement('input');
				hidinput.type = "hidden";
				hidinput.value = elem.id;
				hidinput.name = "profileID";
				form.appendChild(hidinput);

				divprof.appendChild(form);
			});
		}
	};
			xhttp.open("GET", "/Profiles/all", true);
			xhttp.send();
		}