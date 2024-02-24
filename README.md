# Dev-Web-2024
Template de repo pour le projet Dev Web 2023

## Comment copier ce Wiki? 

Pour récupérer le template et l'utiliser dans le cadre de votre projet, vous allez devoir faire un "fork" de ce repo.  Cependant, le wiki n'est pas copié automatiquement.  Suivez donc la procédure ci-dessous : 

1.  Créez un fork de ce repository.  Ce sera votre repo de projet, avec une URL de type `https://github.com/<username>/<repo-name>`.  
2.  Créez un wiki dans ce nouveau repo, avec une Home page vide par exemple. 
3.  Clonez le repo git du wiki original sur votre machine :  `git clone https://github.com/EphecLLN/Dev-Web-2024.wiki.git`
4.  Pour "pousser" le wiki présent sur votre machine vers votre repository de projet, vous allez changer le pointeur "remote" de votre copie locale : 
    `git remote add fork https://github.com/<username>/<repo-name>.wiki.git`
6.  Forcez à présent la copie du wiki sur votre machine vers votre repository de projet.  Cela écrasera le wiki vide que vous aviez créé plus tôt avec le template :   `git push -f fork master`

## Utilisation

- Une fois sur votre PC, faite `npm install` sur le backend et le frontend. 
- Puis sur le backend faite `npm start`
- Et sur le frontend `npm run dev`
