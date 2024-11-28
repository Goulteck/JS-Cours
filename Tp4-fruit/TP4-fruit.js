let fruits = []; 


const afficher = () => {
  const tbody = document.getElementById("myTbody");
  tbody.innerHTML = ""; 
  console.log("Tableau JS :", fruits); 
  
  
  for (let fruit of fruits) {
    const template = document.getElementById("templateTr"); 
    const clone = template.content.cloneNode(true); 
    let td = clone.querySelector("td");
    td.textContent = fruit; 
    let btn = clone.querySelector("button");
    
    
    btn.onclick = (event) => {
      if (confirm("Voulez-vous enlever : " + fruit + " ?")) {
        const indice = fruits.indexOf(fruit); 
        if (indice > -1) {
          fruits.splice(indice, 1); 
          afficher(); 
        }
      }
    };
    
    
    tbody.appendChild(clone);
  }
};


document.getElementById("btnAjouter").onclick = () => {
  let fruit = document.getElementById("fruit").value.trim(); 
  if (fruit === "") {
    alert("Veuillez entrer un nom de fruit valide.");
    return;
  }
  fruits.push(fruit); 
  document.getElementById("fruit").value = ""; 
  afficher(); 
};