function processCommand(cmd) {
    const reply = document.createElement('p');

    if (cmd === 'help') {
        reply.innerHTML = `Commandes disponibles :<br>
        - <span class="highlight">about</span> : En savoir plus sur mon parcours<br>
        - <span class="highlight">skills</span> : Mes compétences techniques<br>
        - <span class="highlight">projects</span> : Découvrir mes projets majeurs`;
    } 
    else if (cmd === 'about') {
        // Remplis ici avec ton nom et ton domaine d'études !
        reply.innerHTML = "Je m'appelle Obed Muanda, étudiant en /* À COMPLÉTER */. Passionné par le développement bas niveau et la sécurité.";
    } 
    else if (cmd === 'skills') {
        // Ajoute les langages que tu as appris (C, Python, SQL...)
        reply.innerHTML = "Technologies maîtrisées : /* À COMPLÉTER */<br>Outils réseau : Cisco Packet Tracer & Huawei eNSP";
    } 
    else if (cmd === 'projects') {
        // Mets le lien vers ton tout nouveau dépôt SysWatch !
        reply.innerHTML = `Mon projet principal :<br>
        - <a href="/* METS TON LIEN GITHUB DE SYSWATCH ICI */" target="_blank" style="color: #00bcff; text-decoration: underline;">SysWatch</a> : Dashboard de supervision de logs (C/Python/Flask/SQLite).`;
    } 
    else if (cmd === '') {
        return; 
    } 
    else {
        reply.innerHTML = `Commande inconnue: "${cmd}". Tapez <span class="highlight">help</span>.`;
        reply.style.color = '#ff5f56';
    }

    terminalContent.insertBefore(reply, terminalInput.parentElement);
    terminalContent.scrollTop = terminalContent.scrollHeight;
}
