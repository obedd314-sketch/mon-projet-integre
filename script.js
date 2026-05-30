// On récupère les éléments HTML importants
const terminalInput = document.getElementById('terminal-input');
const terminalContent = document.getElementById('terminal-content');

// On écoute le clavier : quand l'utilisateur appuie sur une touche
terminalInput.addEventListener('keydown', function(event) {
    // Si la touche enfoncée est "Entrée"
    if (event.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        
        // 1. On affiche la commande que l'utilisateur vient de taper
        logCommand(command);

        // 2. On analyse la commande et on répond
        processCommand(command);

        // 3. On vide la zone de saisie pour la prochaine commande
        terminalInput.value = '';
    }
});

// Fonction pour afficher la commande tapée à l'écran
function logCommand(cmd) {
    const p = document.createElement('p');
    p.innerHTML = `<span style="color: #00ff66;">obed@cyber-terminal:~$</span> ${cmd}`;
    // On l'insère juste avant la ligne de saisie
    terminalContent.insertBefore(p, terminalInput.parentElement);
}

// Fonction pour analyser la commande (Le cerveau du terminal)
function processCommand(cmd) {
    const reply = document.createElement('p');

    if (cmd === 'help') {
        reply.innerHTML = `Commandes disponibles :<br>
        - <span class="highlight">about</span> : Qui suis-je ?<br>
        - <span class="highlight">projects</span> : Voir mes réalisations<br>
        - <span class="highlight">clear</span> : Effacer l'écran`;
    } 
    else if (cmd === 'about') {
        reply.innerHTML = "Je m'appelle Obed, étudiant en informatique. Passionné par les systèmes, les réseaux et le développement.";
    } 
    else if (cmd === 'projects') {
        reply.innerHTML = `Mes projets majeurs :<br>
        - <a href="https://github.com/obedd314-sketch/SysWatch" target="_blank" style="color: #00bcff;">SysWatch</a> : Dashboard de supervision réseau et logs (C/Python/SQLite).`;
    } 
    else if (cmd === 'clear') {
        // Optionnel : vide l'écran (on verra comment faire si tu veux l'activer)
        reply.innerHTML = "Fonctionnalité 'clear' en cours de développement...";
    } 
    else if (cmd === '') {
        return; // Si c'est vide, on ne fait rien
    } 
    else {
        reply.innerHTML = `Commande inconnue: "${cmd}". Tapez <span class="highlight">help</span> pour obtenir de l'aide.`;
        reply.style.color = '#ff5f56'; // Texte en rouge pour l'erreur
    }

    terminalContent.insertBefore(reply, terminalInput.parentElement);
    
    // Faire défiler automatiquement le terminal vers le bas
    terminalContent.scrollTop = terminalContent.scrollHeight;
}// On récupère les éléments HTML importants
const terminalInput = document.getElementById('terminal-input');
const terminalContent = document.getElementById('terminal-content');

// On écoute le clavier : quand l'utilisateur appuie sur une touche
terminalInput.addEventListener('keydown', function(event) {
    // Si la touche enfoncée est "Entrée"
    if (event.key === 'Enter') {
        const command = terminalInput.value.trim().toLowerCase();
        
        // 1. On affiche la commande que l'utilisateur vient de taper
        logCommand(command);

        // 2. On analyse la commande et on répond
        processCommand(command);

        // 3. On vide la zone de saisie pour la prochaine commande
        terminalInput.value = '';
    }
});

// Fonction pour afficher la commande tapée à l'écran
function logCommand(cmd) {
    const p = document.createElement('p');
    p.innerHTML = `<span style="color: #00ff66;">obed@cyber-terminal:~$</span> ${cmd}`;
    // On l'insère juste avant la ligne de saisie
    terminalContent.insertBefore(p, terminalInput.parentElement);
}

// Fonction pour analyser la commande (Le cerveau du terminal)
function processCommand(cmd) {
    const reply = document.createElement('p');

    if (cmd === 'help') {
        reply.innerHTML = `Commandes disponibles :<br>
        - <span class="highlight">about</span> : Qui suis-je ?<br>
        - <span class="highlight">projects</span> : Voir mes réalisations<br>
        - <span class="highlight">clear</span> : Effacer l'écran`;
    } 
    else if (cmd === 'about') {
        reply.innerHTML = "Je m'appelle Obed, étudiant en informatique. Passionné par les systèmes, les réseaux et le développement.";
    } 
    else if (cmd === 'projects') {
        reply.innerHTML = `Mes projets majeurs :<br>
        - <a href="https://github.com/obedd314-sketch/SysWatch" target="_blank" style="color: #00bcff;">SysWatch</a> : Dashboard de supervision réseau et logs (C/Python/SQLite).`;
    } 
    else if (cmd === 'clear') {
        // Optionnel : vide l'écran (on verra comment faire si tu veux l'activer)
        reply.innerHTML = "Fonctionnalité 'clear' en cours de développement...";
    } 
    else if (cmd === '') {
        return; // Si c'est vide, on ne fait rien
    } 
    else {
        reply.innerHTML = `Commande inconnue: "${cmd}". Tapez <span class="highlight">help</span> pour obtenir de l'aide.`;
        reply.style.color = '#ff5f56'; // Texte en rouge pour l'erreur
    }

    terminalContent.insertBefore(reply, terminalInput.parentElement);
    
    // Faire défiler automatiquement le terminal vers le bas
    terminalContent.scrollTop = terminalContent.scrollHeight;
}
