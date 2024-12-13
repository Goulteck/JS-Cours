    const apiurl = "http://localhost:3000";
    const template = document.getElementById("templateTr");
    const tbody = document.getElementById("myTbody");

    const get = async () => {
    const response = await axios.get(`${apiurl}/cocktails`);
    const data = response.data;

    tbody.innerHTML = "";

    data.forEach((cocktail) => {
        const clone = template.content.cloneNode(true);
        clone.querySelector("tr").id = cocktail._id;
        const tr = clone.querySelector("tr");
        tr.id = cocktail._id;
        clone.querySelector("td:nth-child(1)").textContent = cocktail.nom;
        clone.querySelector("td:nth-child(2)").textContent = cocktail.prenom;

        const deleteButton = clone.querySelector(".btn-danger");
        deleteButton.addEventListener('click', async () => {
        await delet(cocktail._id);
        get();
        });

        const modifyButton = clone.querySelector(".btn-warning");
        modifyButton.addEventListener('click', async () => {
        if (cocktail.set === true) {
            await axios.put(`${apiurl}/update-cocktail/${cocktail._id}`, {
            set: false
            });
            tr.classList.remove("table-danger");
            tr.classList.add("table-success");
            cocktail.set = false; 
        } else {
            await axios.put(`${apiurl}/update-cocktail/${cocktail._id}`, {
            set: true
            });
            tr.classList.remove("table-success");
            tr.classList.add("table-danger");
            cocktail.set = true; 
        }
        });

        tbody.appendChild(clone);
    });
    };

    const delet = async (id) => {
    const response = await axios.delete(`${apiurl}/delete-cocktails/${id}`);
    console.log("Invité supprimé avec succès", response);
    get();
    };

    const addButton = document.getElementById("btnAjouter");
    addButton.addEventListener('click', async () => {
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const response = await axios.post(`${apiurl}/save-cocktail`, {
        prenom: prenom,
        nom: nom,
        set: true
    });
    console.log("Invité ajouté avec succès", response);
    get();
    });

    get();
