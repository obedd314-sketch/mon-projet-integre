Rapport de Projet : SysWatch (Tableau de Bord de Logs)
Bienvenue dans mon journal de bord. Ce document retrace toutes les étapes de la création de mon application web connectée à une base de données, en expliquant le pourquoi du comment.

 1. L'Architecture Globale (Comment ça marche ?)
Avant de lire le code, il faut comprendre le voyage de l'information. Notre projet utilise le modèle Client-Serveur :

Le Client (Le navigateur web) : Il affiche l'interface graphique (HTML/CSS) et envoie des demandes (JavaScript) à travers le réseau.

Le Serveur (Python avec Flask) : C'est le chef d'orchestre. Il reste allumé, écoute le réseau, reçoit les demandes du client, effectue des actions (comme parler à la base de données) et renvoie la réponse.

La Base de Données (SQLite) : Le disque dur où les informations sont stockées de manière permanente.

 2. Le Réseau et l'Adresse IP (L'adresse 127.0.0.1:5000)
Qu'est-ce que 127.0.0.1 ? C'est une adresse IP spéciale appelée Loopback ou Localhost. Elle est automatiquement donnée par ton système d'exploitation. Elle signifie "cet ordinateur précis". Quand ton navigateur va sur cette IP, il ne cherche pas sur Internet, il cherche un programme à l'intérieur de ta propre machine.

Qu'est-ce que le Port 5000 ? Une IP trouve la machine, mais le port trouve le programme. C'est comme le numéro d'appartement dans un immeuble. Nous avons choisi le port 5000 pour Python. Ainsi, les demandes sur le port 5000 vont directement à Flask.

 3. Pourquoi avoir configuré le Terminal (Le PATH) ?
Au début, taper python provoquait une erreur.

Pourquoi ? Ton ordinateur est une immense bibliothèque. Quand tu tapes un mot comme python, le terminal cherche le programme exécutable. Mais s'il ne sait pas dans quel dossier il est caché, il abandonne.

La Solution (Le PATH) : Le PATH est la liste des dossiers dans lesquels le terminal a le droit de chercher. En cochant la case "Add Python to environment variables", on a simplement inscrit le chemin de Python dans cette liste. Maintenant, le terminal sait exactement où il se trouve.

 4. Évolution du Code Python (Le Backend)
Version 1 : Le Script SQL de base
Au départ, nous avons créé un simple script qui se connectait à la base de données, écrivait l'heure et s'arrêtait.


import sqlite3
from datetime import datetime

# 1. Correction : Le nom du fichier utilise un point, pas deux-points
conn = sqlite3.connect('test.db')

# Création d'un curseur (tu l'as nommé 'cur')
cur = conn.cursor()

# 2. Correction : Utiliser 'cur' (ton curseur) et non 'cursor'
cur.execute("""
CREATE TABLE IF NOT EXISTS logs(
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   heure TEXT
)
""")

# 3. Correction : Orthographe de 'datetime' et 'strftime' (avec un 'f')
heure_actuelle = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

# 4. Correction : Utiliser 'cur' au lieu de 'cursor'
cur.execute(
    "INSERT INTO logs (heure) VALUES (?)",
    (heure_actuelle,) # Le tuple avec la virgule est parfait ! Très bien joué.
)

# Sauvegarde
conn.commit()

# 4. Correction : Utiliser 'cur' au lieu de 'cursor'
cur.execute("SELECT * FROM logs")

# Affichage
for ligne in cur.fetchall(): # Correction ici aussi (cur)
    print(ligne)

# Fermeture
conn.close()


Explication ligne par ligne :

import sqlite3 : On importe la bibliothèque SQLite. Pourquoi elle ? Parce qu'elle est légère, gratuite, et déjà intégrée dans Python. Pas besoin de gros serveur de base de données, elle stocke tout dans un simple fichier (test.db).

from datetime import datetime : On importe l'outil pour lire la date et l'heure de l'ordinateur.

conn = sqlite3.connect('test.db') : Ouvre la connexion avec le fichier de la base de données. Si le fichier n'existe pas, SQLite le crée automatiquement.

cur = conn.cursor() : Crée un "curseur". C'est comme un stylo virtuel qui va écrire et exécuter les commandes SQL dans la base.

cur.execute(...) : On donne l'ordre en langage SQL de créer la table logs si elle n'existe pas encore.

heure_actuelle = datetime.now().strftime("%Y-%m-%d %H:%M:%S") : On récupère l'heure de la machine et on la transforme en texte propre (Année-Mois-Jour Heure:Minute:Seconde).

cur.execute("INSERT INTO logs...", (heure_actuelle,)) : On insère l'heure dans la table de manière sécurisée en utilisant un "tuple" (la virgule à la fin), ce qui empêche les piratages (Injections SQL).

conn.commit() : Très important. C'est le bouton "Enregistrer" du fichier. Sans ça, les modifications sont perdues en fermant le programme.

cur.execute("SELECT * FROM logs") : On demande à lire tout le contenu de la table.

for ligne in cur.fetchall(): print(ligne) : On récupère toutes les lignes trouvées (fetchall) et on les affiche une par une dans le terminal.

conn.close() : On ferme la connexion pour libérer la mémoire de l'ordinateur.

Version 2 : Transformation en Serveur (Flask & CORS)
Pour que notre site web puisse voir ces données, il a fallu transformer ce script en serveur réseau grâce à Flask (un outil pour créer des sites et des API en Python).

Pour l'installer, on a tapé dans le terminal :

Bash
pip install flask flask-cors
flask : Permet à Python d'écouter le réseau.

flask-cors : Gère le CORS (Cross-Origin Resource Sharing). C'est une sécurité des navigateurs. Par défaut, ton navigateur refuse qu'un fichier HTML sur ton bureau aille voler des données sur un serveur Python. En activant CORS(app) dans le code, Python crie au navigateur : "C'est bon, j'autorise ce site web à lire mes données !".

Explication du code du Serveur :

# 2. On crée une "route" réseau. Si quelqu'un va sur http://127.0.0.1:5000/api/logs
@app.route('/api/logs', methods=['GET'])
def envoyer_logs():
    # On récupère les lignes de la base de données
    lignes = inserer_et_lire_db()
    # On les transforme en format JSON (un format de texte que le HTML/JS adore)
    return jsonify(lignes)

# 3. On démarre le serveur web sur le port 5000
if __name__ == '__main__':
    print("Le serveur Python est démarré sur http://127.0.0.1:5000")
    app.run(debug=True, port=5000)

app = Flask(__name__) : Initialise notre application serveur Flask.

@app.route('/api/logs', methods=['GET']) : On crée une "route" réseau. Ça veut dire : "Si quelqu'un se connecte à l'adresse http://127.0.0.1:5000/api/logs avec la méthode GET (demande de lecture), déclenche la fonction suivante".

return jsonify(lignes) : Convertit les données de la base SQL en format JSON. Le JSON est un format de texte universel sous forme de listes, que le JavaScript adore et comprend instantanément.

app.run(debug=True, port=5000) : Lance le serveur pour qu'il tourne en continu sur le port 5000.

 5. Le Code HTML et JavaScript (Le Frontend)
Notre fichier test.html contient du CSS pour la beauté du site (bouton bleu, listes blanches en rectangles), et du JavaScript pour la logique réseau.
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Mon Panneau de Contrôle</title>
    <style>
        /* Un peu de CSS pour rendre ça propre */
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f4f4f9;
            padding: 50px;
        }
        button {
            padding: 12px 24px;
            font-size: 16px;
            background-color: #007BFF;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
        #liste-logs {
            margin-top: 30px;
            list-style-type: none;
            padding: 0;
        }
        #liste-logs li {
            background: white;
            margin: 5px auto;
            padding: 10px;
            width: 50%;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body>

    <h1>Suivi des Logs Système</h1>
    <button onclick="chargerLesLogs()">Mettre à jour et charger les données</button>
    
    <ul id="liste-logs"></ul>

    <script>
        function chargerLesLogs() {
            // 1. On fait un appel réseau vers notre serveur Python
            fetch('http://127.0.0.1:5000/api/logs')
                .then(reponse => {
                    // Si le serveur répond, on transforme la réponse en JSON
                    return reponse.json();
                })
                .then(donnees => {
                    // 2. On récupère l'élément <ul> de notre HTML
                    const ul = document.getElementById('liste-logs');
                    ul.innerHTML = ""; // On vide la liste avant d'ajouter les nouveautés
                    
                    // 3. On boucle sur chaque ligne reçue de la base de données
                    donnees.forEach(ligne => {
                        const id = ligne[0];
                        const dateHeure = ligne[1];
                        
                        // On crée une balise <li> textuelle pour chaque log
                        const li = document.createElement('li');
                        li.textContent = `Log n°${id} : Enregistré le ${dateHeure}`;
                        
                        // On l'ajoute dans notre liste <ul>
                        ul.appendChild(li);
                    });
                })
                .catch(erreur => {
                    // Si le serveur Python est éteint ou s'il y a un bug réseau
                    console.error("Erreur réseau :", erreur);
                    alert("Impossible de contacter le serveur Python. Est-il bien démarré ?");
                });
        }
    </script>
</body>
</html>


Qu'est-ce que le fetch et comment il fonctionne ?
Le mot anglais Fetch signifie "aller chercher". En JavaScript, c'est une fonction magique qui permet de passer un coup de téléphone réseau en tâche de fond, sans recharger la page internet.

Explication du code JavaScript (dans la fonction chargerLesLogs) :

fetch('http://127.0.0.1:5000/api/logs') : Le JavaScript lance une flèche réseau vers notre serveur Python.

.then(reponse => return reponse.json()) : "Quand le serveur répond, prends le texte brut et transforme-le en un vrai tableau d'objets JavaScript (JSON)".

.then(donnees => { ... }) : "Maintenant que j'ai les données sous forme de tableau, je vais travailler avec".

ul.innerHTML = "" : On vide l'ancienne liste affichée à l'écran pour éviter d'accumuler des doublons à chaque clic.

donnees.forEach(ligne => { ... }) : C'est une boucle. Pour chaque ligne reçue (contenant un ID et une Date) :

document.createElement('li') : On fabrique une nouvelle puce de liste HTML à la volée.

li.textContent = ... : On écrit le texte dedans (ex: "Log n°1 : Enregistré le...").

ul.appendChild(li) : On injecte cette puce directement dans la page web pour que l'utilisateur la voie.

.catch(erreur => { ... }) : C'est le filet de sécurité. Si le serveur Python est éteint ou si le câble réseau est débranché, le fetch échoue, et c'est ce bloc qui prend le relais pour afficher le message "Impossible de contacter le serveur python".

6. Intégration du Moteur en Langage C
Pourquoi le C ? Le langage C est un langage compilé de bas niveau. Il est ultra-rapide, consomme très peu de mémoire et possède un accès direct aux fonctions du système d'exploitation. C'est le langage idéal pour créer des "agents" de surveillance ou des collecteurs de données système.

Le système de fichier tampon (flux.txt) : Pour faire communiquer le programme C et le programme Python sans installer de lourdes bibliothèques tierces, nous avons mis en place une communication par fichier. Le C écrit de manière brute, et Python traite la donnée pour l'insérer proprement dans SQLite.
