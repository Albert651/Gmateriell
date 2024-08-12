const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json()); // Correction ici

app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ihm"
});

app.get("/ListeBase", (req, res) => {
    const sql = 'SELECT * FROM `materielbase`';
    db.query(sql, (err, data) => {
        if (err) return res.json("Erreur de connexion"); // Correction ici
        return res.json(data); // Correction ici
    });
});

app.put("/ListeBase/:idB", (req, res) => {
    const sql = 'SELECT * FROM `materielbase` WHERE `idB`= ?';
    const idB = req.params.idB
    db.query(sql, [idB], (err, data) => {
        if (err) return res.json("Erreur de connexion"); // Correction ici
        return res.json(data); // Correction ici
    });
});


app.post('/ListeBase', (req, res) => {
    const sql = 'INSERT INTO `materielbase` (`Nom`, `MarqueB`, `Quantiter`, `Qualiter`, `Lien`) VALUES(?)';
    const values = [
        req.body.Nom,
        req.body.MarqueB,
        req.body.Quantiter,
        req.body.Qualiter,
        req.body.Lien,
        
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Erreur");
        return res.json(data);
    })
})

app.put('/ListeBase/:idB', (req, res) => {
    const sql = "UPDATE `materielbase` SET `Nom` = ?, `MarqueB` = ?, `Quantiter`, `Qualiter`, `Lien` = ? WHERE `idB` = ?";
    const values = [
        req.body.Nom,
        req.body.MarqueB,
        req.body.Quantiter,
        req.body.Qualiter,
        req.body.Lien,
        // Ajoutez le paramètre numed ici
    ];
    const idB = req.params.idB 
    db.query(sql, [...values,idB], (err, data) => { // Utilisez simplement "values" au lieu de "[...values, numed]"
        if(err) {
            console.error("Erreur lors de la mise à jour:", err); // Logguer l'erreur pour débogage
            return res.status(500).json({ error: "Erreur lors de la mise à jour du médicament" }); // Renvoyer un code d'erreur HTTP approprié et un message descriptif
        }
        return res.json(data);
    });
});


app.delete('/ListeBase/:idB', (req, res) => {
    const sql = "DELETE FROM materielbase WHERE idB = ?";
    const idB = req.params.idB;

    db.query(sql, [idB], (err, data) => { 
        if(err) {
            console.error("Erreur lors de la suppression:", err); 
            return res.status(500).json({ error: "Erreur lors de la suppression du médicament" }); 
        }
        return res.json(data);
    });
});

/******CRUD DU TABLE MATERIEL LANE*******/
app.get("/ListeLane", (req, res) => {
    const sql = 'SELECT * FROM `materiellane`';
    db.query(sql, (err, data) => {
        if (err) return res.json("Erreur de connexion"); // Correction ici
        return res.json(data); // Correction ici
    });
});

app.post('/ListeLane', (req, res) => {
    const sql = 'INSERT INTO `materiellane` (`nomL`, `marqueL`, `quantiteL`, `qualiterL`, `lienL`) VALUES(?)';
    const values = [
        req.body.nomL,
        req.body.marqueL,
        req.body.quantiteL,
        req.body.qualiterL,
        req.body.lienL,
        
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Erreur");
        return res.json(data);
    })
})

app.put('/ListeLane/:idL', (req, res) => {
    const sql = "UPDATE `materiellane` SET `nomL` = ?, `marqueL` = ?, `quantiterL`= ?, `qualiterL`= ?, `lienL` = ? WHERE `idB` = ?";
    const values = [
        req.body.nomL,
        req.body.marqueL,
        req.body.qualiterL,
        req.body.qualiterL,
        req.body.lienL,
        // Ajoutez le paramètre numed ici
    ];
    const idL = req.params.idL 
    db.query(sql, [...values,idL], (err, data) => { // Utilisez simplement "values" au lieu de "[...values, numed]"
        if(err) {
            console.error("Erreur lors de la mise à jour:", err); // Logguer l'erreur pour débogage
            return res.status(500).json({ error: "Erreur lors de la mise à jour du médicament" }); // Renvoyer un code d'erreur HTTP approprié et un message descriptif
        }
        return res.json(data);
    });
});

app.delete('/ListeLane/:idL', (req, res) => {
    const sql = "DELETE FROM materiellane WHERE `materiellane`.`idL` = ?";
    const idL = req.params.idL;

    db.query(sql, [idL], (err, data) => { 
        if(err) {
            console.error("Erreur lors de la suppression:", err); 
            return res.status(500).json({ error: "Erreur lors de la suppression du médicament" }); 
        }
        return res.json(data);
    });
});

/***********************************CRUD MATERIEL OUTILS********************************************/

app.get("/ListeOutil", (req, res) => {
    const sql = 'SELECT * FROM `Outils`';
    db.query(sql, (err, data) => {
        if (err) return res.json("Erreur de connexion"); // Correction ici
        return res.json(data); // Correction ici
    });
});

/***********************************CRUD MATERIEL AU DEPOT A************************************************************* */
app.get("/ListeDepotA",(req, res) => {
    const sql = 'SELECT * FROM `depot`';
    db.query(sql,(err,data) => {
        if(err) return res.json("Erreur de connexion");
        return res.json(data);
    });
});

/*************************************CRUD MATERIEL AU DEPOT B***************************************************************************** */
app.get("/ListeDepotB",(req, res) => {
    const sql = 'SELECT *FROM `depotb`';
    db.query(sql, (err, data) =>{
        if(err) return res.json("Erreur de connexion");
        return res.json(data)
    });
});

/********************************************************************************* */
app.listen(8081, () => {
    console.log("Server is running on port 8081");
});