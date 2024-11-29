let series = [];
let tabFav = [];


const saveLocal = () => {
    localStorage.setItem("series", JSON.stringify(tabFav));
};


const getSerie = async (imdb) => {
    const key = "efdc2275"; 
    const url = `http://www.omdbapi.com/?apikey=${key}&i=${imdb}`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des détails de la série :", error);
    }
};


const afficheSeries = () => {
    const tbody = document.getElementById("myTbody");
    tbody.innerHTML = ""; 

    for (let s of series) {
        const template = document.getElementById("templateTr");
        const clone = template.content.cloneNode(true);
        const td = clone.querySelectorAll("td");

        td[0].innerHTML = s.Title;
        td[1].innerHTML = s.Year;
        clone.querySelector("img").src = s.Poster;
        clone.querySelector("img").alt = s.Title;

        
        clone.querySelector("button").onclick = async (evt) => {
            const tr = evt.target.closest("tr");
            const i = tr.rowIndex - 1;
            const serie = await getSerie(series[i].imdbID);

            tabFav.push(serie);
            afficherFav();
            series.splice(i, 1); 
            afficheSeries();
            saveLocal(); 
        };

        tbody.append(clone);
    }
};


const afficherFav = () => {
    const tbody2 = document.getElementById("myTbody2");
    tbody2.innerHTML = ""; 

    for (let f of tabFav) {
        const template = document.getElementById("templateTr2");
        const clone = template.content.cloneNode(true);
        const td = clone.querySelectorAll("td");

        td[0].innerHTML = f.Title;
        td[1].innerHTML = f.Year;
        td[2].innerHTML = f.imdbRating;
        clone.querySelector("img").src = f.Poster;
        clone.querySelector("img").alt = f.Title;

        
        clone.querySelector("button").onclick = (evt) => {
            const tr = evt.target.closest("tr");
            const i = tr.rowIndex - 1;
            tabFav.splice(i, 1); 
            afficherFav();
            saveLocal(); 
        };

        tbody2.append(clone);
    }
};


document.getElementById("btnSearch").onclick = async () => {
    const film = document.getElementById("film").value;
    document.getElementById("film").value = ""; 
    const key = "efdc2275"; 
    const url = `http://www.omdbapi.com/?apikey=${key}&s=${film}&type=series`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            series = data.Search;
            afficheSeries();
        } else {
            console.error(data.Error);
        }
    } catch (error) {
        console.error("Erreur lors de la recherche :", error);
    }
};


const data = localStorage.getItem("series");
if (data) {
    tabFav = JSON.parse(data);
    afficherFav();
}