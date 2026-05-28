import sqlite3
from datetime import datetime
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Autorise le HTML local à lire les données de l'API

def inserer_et_lire_db():
    conn = sqlite3.connect('test.db')
    cur = conn.cursor()
    
    # Recréer la table au cas où
    cur.execute("""
    CREATE TABLE IF NOT EXISTS logs(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        heure TEXT
    )
    """)
    
    # [Optionnel] Code pour lire le fichier flux.txt du C et l'insérer si nécessaire
    # Pour l'exemple, on simule une insertion automatique à chaque appel
    heure_actuelle = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    cur.execute("INSERT INTO logs (heure) VALUES (?)", (heure_actuelle,))
    conn.commit()
    
    # Récupération de tous les logs
    cur.execute("SELECT * FROM logs")
    lignes = cur.fetchall()
    conn.close()
    
    return lignes

@app.route('/api/logs', methods=['GET'])
def envoyer_logs():
    data = inserer_et_lire_db()
    return jsonify(data) # Envoie les données converties en JSON

if __name__ == '__main__':
    print("🚀 Serveur SysWatch démarré sur [http://127.0.0.1:5000](http://127.0.0.1:5000)")
    app.run(debug=True, port=5000)
