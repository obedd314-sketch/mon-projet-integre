# 📊 SysWatch : Tableau de Bord de Logs Système

Bienvenue dans le journal de bord de **SysWatch**. Cette application web connectée permet de surveiller, collecter et afficher des logs système en temps réel en faisant coopérer le **C**, **Python**, et le **Web**.

---

## 🗺️ 1. Architecture Globale

Le projet repose sur un modèle **Client-Serveur** où l'information circule à travers trois couches principales :

```text
+-------------------+             +-------------------+             +-------------------+
|     FRONTEND      |             |      BACKEND      |             |    DATA LAYER     |
|                   |             |                   |             |                   |
|   Page HTML/CSS   |  (Fetch)    |  Serveur Python   | (sqlite3)   |  Base de Données  |
|   JavaScript      | ----------> |   (API Flask)     | ----------> |   SQLite (db)     |
| (Interface User)  |  <--------  | (Gestion réseau)  |             |  & Fichier Tampon |
+-------------------+   [JSON]    +-------------------+             +-------------------+
                                            ^
                                            | (Lecture brute)
                                  +-------------------+
                                  |    MOTEUR INNE    |
                                  |   Programme en C  |
                                  | (Collecteur Rapide|
                                  +-------------------+
