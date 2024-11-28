// Classe Personne
class Personne {
    constructor(prenom, nom, status = false) {
      this.prenom = prenom;
      this.nom = nom;
      this.status = status;
    }
  }
  
  // Récupérer les données depuis le stockage local ou initialiser le tableau
  let personnes = JSON.parse(localStorage.getItem("personnes")) || [];
  
  // Fonction pour afficher les personnes dans le tableau HTML
  function afficherPersonnes() {
    const tbody = document.getElementById("myTbody");
    tbody.innerHTML = ""; // Réinitialiser l'affichage
  
    personnes.forEach((personne, index) => {
      // Création de la ligne
      const tr = document.createElement("tr");
      tr.classList.add(personne.status ? "table-success" : "table-danger");
  
      // Colonnes prénom et nom
      const tdPrenom = document.createElement("td");
      tdPrenom.textContent = personne.prenom;
  
      const tdNom = document.createElement("td");
      tdNom.textContent = personne.nom;
  
      // Bouton supprimer
      const tdSupprimer = document.createElement("td");
      const btnSupprimer = document.createElement("button");
      btnSupprimer.className = "btn btn-danger btn-sm";
      btnSupprimer.innerHTML = '<i class="fa fa-trash"></i>';
      btnSupprimer.onclick = () => supprimerPersonne(index);
      tdSupprimer.appendChild(btnSupprimer);
  
      // Bouton changer statut
      const tdChangerStatut = document.createElement("td");
      const btnChangerStatut = document.createElement("button");
      btnChangerStatut.className = "btn btn-warning btn-sm";
      btnChangerStatut.innerHTML = '<i class="fa fa-check"></i>';
      btnChangerStatut.onclick = () => changerStatut(index);
      tdChangerStatut.appendChild(btnChangerStatut);
  
      // Ajouter les colonnes à la ligne
      tr.appendChild(tdPrenom);
      tr.appendChild(tdNom);
      tr.appendChild(tdSupprimer);
      tr.appendChild(tdChangerStatut);
  
      // Ajouter la ligne au tableau
      tbody.appendChild(tr);
    });
  }
  
  // Fonction pour ajouter une personne
  function ajouterPersonne(event) {
    event.preventDefault(); // Empêcher le rechargement de la page
    const prenom = document.getElementById("prenom").value.trim();
    const nom = document.getElementById("nom").value.trim();
  
    if (prenom && nom) {
      personnes.push(new Personne(prenom, nom));
      sauvegarderPersonnes();
      afficherPersonnes();
      document.getElementById("personneForm").reset(); // Réinitialiser le formulaire
    } else {
      alert("Veuillez remplir les champs Prénom et Nom.");
    }
  }
  
  // Fonction pour supprimer une personne
  function supprimerPersonne(index) {
    if (confirm("Voulez-vous vraiment supprimer cette personne ?")) {
      personnes.splice(index, 1);
      sauvegarderPersonnes();
      afficherPersonnes();
    }
  }
  
  // Fonction pour changer le statut d'une personne
  function changerStatut(index) {
    personnes[index].status = !personnes[index].status;
    sauvegarderPersonnes();
    afficherPersonnes();
  }
  
  // Fonction pour sauvegarder les données dans localStorage
  function sauvegarderPersonnes() {
    localStorage.setItem("personnes", JSON.stringify(personnes));
  }
  
  // Événement sur le formulaire
  document.getElementById("personneForm").addEventListener("submit", ajouterPersonne);
  
  // Affichage initial
  afficherPersonnes();