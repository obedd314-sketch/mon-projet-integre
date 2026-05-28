#include <stdio.h>
#include <stdlib.h>
#include <time.h>

#ifdef _WIN32
#include <windows.h>
#else
#include <unistd.h>
#endif

int main() {
    printf("=========================================\n");
    printf("   COLLECTEUR EN C (MODE COMPATIBLE)     \n");
    printf("=========================================\n");

    while(1) {
        time_t maintenant;
        struct tm *info_temps;
        char chaine_heure[30];

        time(&maintenant);
        info_temps = localtime(&maintenant);
        strftime(chaine_heure, sizeof(chaine_heure), "%Y-%m-%d %H:%M:%S", info_temps);

        // Au lieu d'appeler sqlite3, on ouvre (ou cree) un fichier texte nommé flux.txt
        // Le mode "a" signifie "append" (ajouter à la fin du fichier sans effacer le reste)
        FILE *fichier = fopen("flux.txt", "a");
        if (fichier != NULL) {
            fprintf(fichier, "%s [Moteur-C]\n", chaine_heure);
            fclose(fichier); // On ferme le fichier pour libérer l'accès
            printf("[C-Engine] Log ecrit dans flux.txt : %s\n", chaine_heure);
        } else {
            printf("Erreur : Impossible d'ouvrir flux.txt\n");
        }

        #ifdef _WIN32
        Sleep(5000);
        #else
        sleep(5);
        #endif
    }
    return 0;
}
