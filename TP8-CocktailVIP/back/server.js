
const express = require('express');

const mongoose = require('mongoose');


mongoose.connection.once('open', () => {
    console.log("Connexion à la base de données effectué");
});


mongoose.connection.on('error', () => {
    console.log("Erreur dans la BDD");
});


mongoose.connect("mongodb://127.0.0.1:27017/Cocktail-VIP");

const Cocktail = mongoose.model('Cocktail', { nom: String, prenom: String, set: Boolean }, 'Cocktails');

// Instancier un serveur et autoriser l'envoi json
// Instancier le server grâce à express
const app = express();

// AUTORISER LE BACK À RECEVOIR DES DONNÉES DANS LE BODY
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Les routes url/point d'entrée
app.get('/cocktails', async (request, response) => {
    const cocktails = await Cocktail.find();

    if (cocktails.length == 0){
        return response.json({ code : "701" });
    };

    return response.json(cocktails);
});

app.get('/cocktails/:id', async (request, response) => {
    const idParam = request.params.id;

    const foundCocktail = await Cocktail.findOne({'_id' : idParam});

    if (!foundCocktail){
        return response.json({ code : "702" }); 
    }
    
    return response.json(foundCocktail); 
});

app.post('/save-cocktail', async (request, response) => {
    const cocktailJson = request.body;

    const cocktail = new Cocktail(cocktailJson);

    await cocktail.save();

    return response.json(cocktailJson);
});

app.delete('/delete-cocktails/:id', async (request, response) => {
    const idParam = request.params.id;

    const foundCocktail = await Cocktail.deleteOne({ '_id': idParam });

    if (!foundCocktail){
        return response.json({ code : "702" }); 
    }

    return response.json({ code : "200" }); 
});

app.put('/update-cocktail/:id', async (request, response) => {
    const idParam = request.params.id;
    const { set } = request.body;

    const updatedCocktail = await Cocktail.findByIdAndUpdate(idParam, { set: set }, { new: true });

    if (!updatedCocktail) {
        return response.json({ code: "702" });
    }

    return response.json(updatedCocktail);
});

app.listen(3000, () => {
    console.log("Le serveur a démarré !");
});

// PENSER A TOUT LE TEMPS REDEMARRER LE SERVER AVEC node server.js