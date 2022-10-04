<p align="center">
  <img src="./pictery-icon.png" alt="Pictery Icon">
</p>

<h1 align="center">Pictery</h1>

Une application de gestion de galerie d'images construite en Vue et Express.js avec Typescript.

**Vérifiez-le: https://pictery.onrender.com/**

> **IMPORTANT:** Ceci n'est pas une application destinée au grand public. Il s'agit d'un projet personnel à des fins de démonstration et d'apprentissage technique. Veuillez utiliser avec prudence et ne pas télécharger de contenu nuisible, classifié ou explicite. J'espère que vous le trouverez intéressant et s'il vous plaît ne me piratez pas, merci. ❤️

Vous êtes libre d'explorer le code et si vous souhaitez me contacter pour une raison connexe, vous pouvez le faire via les différents moyens publics que je mets à votre disposition.

Vous pouvez lire ce document dans les langues suivantes:

- [Anglais](README.md)
- [Espagnol](README.es.md)
- [Français (sélectionné)](README.fr.md)

## ⚗️ Technologies utilisées (le plus remarquable)

- Typescript (tout le code)
- Vue 3 (Composition API)
- TailwindCSS
- Cypress
- Express.js
- Prisma (PostgreSQL)
- Passport.js
- Google OAuth
- Cloudinary
- Zod
- Jest
- Etc...

# 😴 TL;DR;JK 📖

Il s'agit d'un projet unique et exclusivement démonstratif axé sur mon apprentissage personnel durant celui-ci. L'ensemble de ce document est écrit à partir d'une approche personnelle avec des touches techniques sur les parties que j'ai considérées comme les plus pertinentes ou distinctives du projet et en étant critique envers moi-même.

## Le contexte

L'ensemble du processus de développement de ce projet a été un grand voyage dont j'ai beaucoup appris et avec lequel je me suis amélioré à bien des égards (lequel est le but). Cependant, près de 10,000 lignes de code plus tard et plusieurs mois de développement dans des conditions moins qu'optimales (parmi eux, un ordinateur avec 4 GB de RAM et un processeur Intel Celeron 847 Dual Core à 1.1 Ghz), le projet m'a pris beaucoup plus de temps que J'ai anticipé et l'expérience de développement en général diminuait à mesure que d'autres y étaient ajoutées. Compte tenu de cela, il y avait plusieurs fonctionnalités qui ont été laissées de côté dans le produit final et que je mentionnerai plus tard, mais même ainsi, cela reste de loin le projet personnel dans lequel j'ai investi le plus d'efforts.

> REMARQUE: En raison de ne pas savoir avec certitude si ce projet verrait le jour au début et compte tenu du long processus d'apprentissage avec des changements constants, brusques et perturbateurs, je n'étais pas tout à fait clair quand je devrais commencer à faire des commits et au moment où je l'ai vu clairement j'étais sur le point de finir (donc je me suis à nouveau facepalmé).

## L'idée

Ce projet a commencé avec l'idée simple de créer une galerie d'images assez facile à utiliser en utilisant Vue comme cadre d'interface utilisateur (simplement parce que j'étais assez intéressé à apprendre à utiliser cette technologie). Cependant, j'ajoutais de plus en plus d'outils comme Prisma, Zod, Jest, Cypress, etc. Et des concepts relativement nouveaux pour moi que j'ai voulu approfondir tout au long du développement, comme je le fais habituellement dans chacun de mes projets.

## Premiers pas

> **Typescript:** Du backend au frontend en passant par les outils de test, tout est écrit en Typescript au lieu de Javascript, et c'était très clair dès le départ. Je ne pense pas qu'il soit nécessaire de mentionner les nombreuses raisons pour lesquelles il en est ainsi, les avantages sont plus qu'évidents : système de type, auto-complétion, code plus robuste, moins sujet aux erreurs, etc. Typescript est la voie à suivre pour presque tous les projets de cet écosystème ces jours-ci et il est assez confortable pour moi de l'utiliser.

J'ai commencé ce projet en fait à travers un autre projet sur lequel je travaillais qui n'était qu'un backend dans Express.js avec Typescript et Prisma (le meilleur ORM que j'ai utilisé jusqu'à présent dans Node.js), influencé un peu par les principes SOLID et un structure plus évolutive par caractéristiques. J'ai profité de cette implémentation que j'ai faite du backend et l'ai modifiée pour l'intégrer à cette nouvelle idée (deux oiseaux avec une pierre) avec un schéma de base de données qui comprenait des utilisateurs, des galeries et des images.

> **POO et principes SOLID:** Je n'ai jamais beaucoup utilisé la POO (Programmation Orientée Objet) dans mes projets même si c'est un sujet que je connais relativement bien, tout simplement parce que la programmation fonctionnelle a tendance à être mieux adaptée compte tenu du langage et du type de projet. Pour cette occasion, j'ai voulu le faire, mais de manière très simplifiée et uniquement dans le backend, en essayant également de suivre les principes SOLID (que je n'ai pas strictement appliqués, je dois le dire). Les avantages du développement de logiciels suivant ce paradigme et cette conception sont appréciables, en particulier dans les équipes de développement et les projets à plus grande échelle. Bien que je me sois également rendu compte que si certaines mesures ne sont pas prises, cela peut rendre tout plus complexe qu'il ne devrait l'être et que quelque chose de très similaire peut être réalisé avec une programmation fonctionnelle bien organisée. Enfin, je dois dire qu'au lieu de faire cela par vous-même (même si vous apprenez beaucoup), il est préférable d'utiliser un framework déjà établi et plus dogmatique comme Nest.js.

> **Structuration par caractéristiques:** Compte tenu de l'ampleur du projet, j'ai décidé d'opter pour une structure organisée par fonctionnalités (features) et la vérité est que cela a été une excellente décision, même si ma mise en œuvre pourrait être meilleure.

Avant d'écrire la première ligne de code dans le client, j'ai entrepris de concevoir dans Figma (de manière très basique) certaines des choses que j'avais en tête à l'époque pour un MVP (Minimum Viable Product). Vous pouvez visualiser ledit conception via ce lien: https://www.figma.com/file/7ZvkKPdhLL8ycGwyyVUaVr/Vue-Gallery

> Le nom du projet a été choisi jusqu'au bout, ainsi lors du développement, il a gardé le nom générique de "Vue Gallery".

Une fois que j'ai terminé le squelette de base de l'application dans Figma, j'ai fait quelques petits tests en apprenant Vue 3 avec l'API de composition et Typescript à la volée, en utilisant également Vite (le meilleur frontend tooling) et du CSS pur. Mon meilleur ami était la documentation tout au long de ce processus, car c'était la première fois que j'utilisais ce framework.

### L'expérience Vue

En général, l'expérience de développement dans Vue a été assez agréable, avec une courbe d'apprentissage très confortable, un écosystème et une documentation de haute qualité mais peu abondante.

En utilisant l'API de composition dans Vue, il était très facile de trouver des similitudes avec React (mon benchmark) ce qui a rendu le processus d'apprentissage beaucoup plus facile. Comparé à React, tout semble beaucoup plus organisé, intégré et cohérent, du moins pour les nouveaux arrivants comme moi et, comme son nom l'indique, c'est un cadre progressif qui est découvert et étendu au besoin. Pourtant, React est encore plus pertinent pour moi car il y a tellement plus de support et de demande en comparaison, et je suis déjà assez habitué à JSX.

Ce que j'ai le plus aimé dans Vue, c'est la facilité de choisir entre les options (officiellement) recommandées de son écosystème et de travailler avec des animations, ce qui n'est pas si facile avec React.

## S'améliorer dans la conception de sites web

Après un long processus d'apprentissage, apprenant les bases de Vue et construisant une partie de l'interface utilisateur, j'ai décidé d'améliorer le design. Pour cela, j'ai fini par lire un excellent livre qui s'appelle **Refactoring UI**, que je recommande fortement car il est focalisé par et pour des développeurs qui ne sont pas des designers en tant que tels (ce qui est mon cas). J'ai essayé d'absorber autant de connaissances que possible et de les appliquer au projet, dont j'ai beaucoup appris et l'amélioration par rapport aux autres projets précédents est assez remarquable à mon avis, même s'il reste encore beaucoup à apprendre. Étant principalement un développeur backend, je suis fier des progrès.

À ce stade et pour accélérer le processus de développement avec un système de mise en page déjà établi, j'ai remplacé le CSS pur par TailwindCSS (mon framework CSS préféré) car le code évoluerait beaucoup plus qu'au début.

L'idée générale du design et de l'interface utilisateur était qu'il soit assez minimaliste et intuitif, qu'il fasse plus avec moins et que tout soit adapté aux différentes tailles d'écran. Au lieu de surcharger l'interface avec beaucoup de choses, j'ai essayé de garder tout aussi simple et léger que possible afin qu'il soit très confortable et fluide à utiliser. En ce sens, je crois avoir rempli l'objectif, bien qu'il y ait des parties qui pourraient être améliorées, sans aucun doute.

## Trucs de backend

Avec une partie de l'interface établie, la prochaine étape logique était d'intégrer l'API backend avec le client. En ce sens, la première chose a été le système d'authentification avec Passport.js, qui à cette occasion, je voulais qu'il soit quelque chose de différent: OAuth (Open Authentication). Parmi les services disponibles, j'ai choisi Google OAuth car c'est le plus accessible parmi les plus pertinents. Plus tard, j'ai également décidé d'intégrer l'option d'enregistrement avec des informations d'identification locales (e-mail et mot de passe), dans laquelle je voulais implémenter la vérification des e-mails, mais je l'ai exclue car je n'avais pas de service SMTP disponible que je pouvais confortablement mettre en production.

Après avoir conclu de nombreuses routes (un total de 23, la plupart des CRUD), middlewares, etc. avec validation dans Zod (une bibliothèque que je voulais essayer), il était temps d'implémenter un service de téléchargement de fichiers. Les premières options que j'ai envisagées et aussi les plus connues sont AWS S3, GCS ou Microsoft Azure, cependant toutes ces options ont été écartées car elles ne sont ni gratuites ni faciles (j'ai quand même fait plusieurs tests de simulation avec leur SDK). À la recherche d'une alternative plus viable, le choix évident a fini par être Cloudinary, qui offre non seulement un service gratuit et assez généreux pour télécharger des fichiers multimédias et autres, mais aussi de nombreux outils pour manipuler dynamiquement ces fichiers. Pour ce projet, j'ai uniquement profité du téléchargement de fichiers de Cloudinary et je me suis occupé du reste, en tenant compte des limites et de l'ampleur du projet.

> A partir de ce moment du développement, j'ai tout pris au sérieux pour livrer un produit le plus "réaliste" possible, comme s'il s'adressait au grand public (avec ses nuances), même s'il ne s'agit finalement que d'une démo (chose que je fais habituellement et il me faut beaucoup de temps pour concrétiser mes "petites" idées). Pour cette raison, j'ai pris en considération beaucoup plus de détails pour donner une finition plus professionnelle. Tout au long du développement, j'ai intégré de nombreux changements et améliorations à chaque fois que j'ai vu l'opportunité d'apprendre plus et mieux, rendant le projet de plus en plus ambitieux.

### Sécurité

C'est une de ces choses que je prends toujours en considération et que j'aime dans le développement logiciel, mais sur laquelle je n'ai pas pu approfondir beaucoup de manière pratique dans un cas réel où c'est vital. C'est parce qu'il n'y a tout simplement pas un tel besoin dans des projets de ce type, avec l'essentiel c'est plus que suffisant (et c'est ce que j'ai fait). Parmi ces mesures figurent les habituelles: bien protéger les routes, valider et nettoyer les données d'entrée et de sortie, ne pas émettre d'erreurs qui compromettent le système, limiter les requêtes, maintenir l'intégrité du système et des utilisateurs, etc. J'ai également eu une considération particulière avec Cloudinary pour éviter de dépasser "accidentellement" la limite du plan.

### Enregistrer des choses

J'ai toujours voulu en savoir plus sur la connexion aux systèmes logiciels, même si la vérité est qu'il est bien préférable de laisser cette tâche entre les mains d'un service tiers plus automatisé. Malgré cela, j'ai essayé d'implémenter un middleware de journal très simplifié juste pour l'avoir même si ce n'était pas vraiment nécessaire et je ne pouvais que les envoyer à la console en raison de la limitation des fichiers non persistants (que je savais que je trouverais en production).

### Confidentialité

Comme cela se produit habituellement dans tous mes projets, la confidentialité des utilisateurs est primordiale. Il n'y a rien sous la table, ce que vous voyez est ce que vous obtenez (on peut le voir dans le code). L'utilisation des données collectées auprès de l'utilisateur n'est utilisée que dans le cadre du service que l'application propose, rien de plus. Seuls les utilisateurs authentifiés peuvent accéder au contenu de l'application et toutes les données supprimées par l'utilisateur sont en fait supprimées via un "hard delete".

Les galeries privées HIDE l'accès aux images qu'elles contiennent dans l'application, mais celles-ci sont toujours accessibles au public via leur URL directe. J’ai essayé de faire quelque chose, mais je n'ai rien trouvé de très concret, à part qu'il s'agit d'un service externe donc je n'ai pas le contrôle absolu (même si c'est possible et que je suis bête). Pour ne pas trop compliquer les choses, j'ai finalement gardé l'implémentation telle quelle.

> **IMPORTANT:** Les images téléchargées dans cette application se trouvent dans un dossier du même nom dans mon compte Cloudinary. Veuillez ne pas télécharger de contenu pouvant être préjudiciable, classifié ou explicite. N'oubliez pas qu'il s'agit d'une application de démonstration qui n'est pas destinée au grand public.

## Trucs de frontend

C'est là que se trouvent la plupart des lignes de code et, par conséquent, la plupart des efforts et du temps consacrés à ce projet.

Comparé au backend, le frontend est beaucoup moins organisé et cohérent. En effet, il y a beaucoup plus de code et tout ce code a été écrit dans le contexte d'une personne apprenant à utiliser l'outil (Vue). Il n'est donc pas surprenant de voir différentes façons de faire la même chose ou des changements qui rendent certaines sections de code incohérentes puisque je suis parti de zéro et que j'ai évolué au fur et à mesure que j'apprenais (un peu de code spaghetti, mais rien de bien méchant).

### Pages

- **Home:** En guise de simulation, j'ai pensé à faire une présentation la plus générique possible sur l'application et le service qu'elle propose, en la vendant un peu au public.

- **Register/Login:** Quelques formulaires simples pour créer un compte et se connecter respectivement, avec la possibilité de le faire via Google OAuth.

- **Dashboard:** Où toutes les galeries d'utilisateurs sont gérées.

- **Gallery:** Où une galerie et toutes les images qui lui appartiennent sont gérées.

- **Profile:** Où des informations très basiques sur un utilisateur sont affichées. Au départ, il aurait une personnalisation étendue... au final, il a fini par être l'endroit idéal pour mettre des phrases de motivation au hasard (ce qui est bien mieux à mon avis).

- **Not Found:** Une simple bannière pour rediriger vers "Home" si vous avez entré une page inexistante, qui comprend des galeries et des profils.

### Accessibilité

Je prends toujours en compte l'accessibilité lors du développement sur le frontend, du moins dans l'essentiel: contraste, retour d'interface utilisateur, interaction clavier complète et confortable, le rendre intuitif, etc.

### Performances et optimisation

La performance et l'optimisation sont toujours importantes pour moi, même si dans ce cas ce n'était pas une préoccupation prioritaire. Tant dans le backend que dans le frontend, j'ai pris certaines mesures et facteurs en considération pour éviter d'aller trop loin avec une opération informatique lourde. Vue est assez rapide (dans le contexte de Javascript) et malgré quelques opérations laborieuses, tout devrait fonctionner correctement.

### Formulaires

Travailler sur des formulaires décents pour une SPA (Single Page Application) est presque toujours un casse-tête, celui-ci n'a pas fait exception. Il y a plusieurs choses à prendre en compte: état des données, validation, messages d'erreur, soumission, etc. J'ai essayé d'utiliser une bibliothèque (Vee-validate) pour résoudre ce problème plus facilement que la méthode "manuelle" et aussi apprendre quelque chose de nouveau. Le résultat a été satisfaisant, notamment grâce au support disponible avec Zod, même si je pense qu'il existe de meilleures façons de le faire.

### Travailler avec les codes QR

Un de mes amis m'a un jour donné l'idée d'inclure des codes QR dans l'un de mes projets, alors j'ai pensé "pourquoi pas?". Je n'avais aucune idée de ce sujet, alors j'ai fait des recherches à ce sujet et j'ai cherché un moyen de mettre en œuvre quelque chose comme ça. J'ai été un peu surpris que dans l'écosystème Vue, je trouve une solution extrêmement simple à ce problème (car il y en a généralement une pour presque tout). Et juste comme ça, j'ai fini par implémenter des codes QR pour partager des galeries.

### Lighthouse

Le résultat global de Lighthouse a été presque parfait, avec quelques détails mineurs autour du contraste et rien d'autre.

![Lighthouse](https://i.ibb.co/7pq8NGv/pictery-lighthouse.png)

## Testing

Utiliser Jest dans le backend et Cypress (pour la première fois) dans le frontend... L'une des choses qui m'a causé le plus de maux de tête a été l'implémentation de tests dans les parties les plus importantes de l'application (pas par paresse, je le jure). J'avais initialement prévu de développer ce projet du début à la fin en utilisant TDD (Test Driven Development), qui est un processus de développement très intéressant et utile à mon avis. Cependant, le problème réside dans le matériel avec lequel j'ai travaillé (assez mauvais), car exécuter constamment de nouveaux tests pour tout, beaucoup de nouveau code et ainsi de suite, ne ferait que ralentir le développement et nuire à mon expérience globale sur le projet. Par conséquent, j'ai commencé à ne faire que des tests "importants" relativement tard dans le jeu, mais pas au point de rendre la mise en œuvre difficile, car il est préférable de commencer les tests le plus tôt possible dans le développement. Malgré cette mesure, la souffrance était inévitable avec environ 15 minutes d'attente dans les tests E2E. Bien sûr, cette terrible expérience de développement se reflète dans la qualité des tests. Cependant, mis à part ces problèmes, les tests sont très enrichissants pour moi et essayer Cypress pour la première fois a été, en ce qui le concerne, une expérience enrichissante.

En parlant de tests, il y en a 34 dans le client (33 E2E et 1 composant) et 81 dans le backend (unitaire et intégral). Ces tests couvrent, comme je l'ai déjà mentionné, les parties les plus importantes de l'application, mais pas de manière très approfondie. Il y a beaucoup de choses à améliorer concernant les tests: Ils sont très imbriqués, il manque beaucoup plus de mocks, certaines dépendent des connexions réseau, elles ne sont pas complètement isolées ou elles ne couvrent pas tous les cas. Cependant, l'objectif n'a jamais été une couverture à 100% ou un code qui aspire à être infaillible. L'objectif est d'apprendre, et pour moi mettre en place ces tests dans un projet de cette ampleur, compte tenu de mes limites, c'est déjà un grand pas dans la bonne direction. De plus, ce n'est qu'une démo, et à cette fin, c'est plus que suffisant.

## Tentative de Monorepo

La nécessité de partager du code (interfaces, schémas, constantes et données de simulation) entre le frontend et le backend afin de ne pas violer le principe DRY (Don't Repeat Yourself) dans ce cas particulier, m'a amené à chercher une solution dans le que j'ai vu une occasion parfaite d'apprendre quelque chose de nouveau. La solution que j'ai choisie pour ce problème était l'utilisation d'un Monorepo, quelque chose que je n'avais pas fait auparavant mais qui a attiré mon attention. J'ai recherché le sujet et les outils les plus populaires autour de cette stratégie de développement, Nx étant celui qui a le plus retenu mon attention, mais malheureusement, il n'avait pas de support natif pour Vue. Le reste des outils disponibles ne m'a pas convaincu alors j'ai fini par créer mon propre "Monorepo" avec les espaces de travail npm et Typescript (Spoiler: je me suis tiré une balle dans le pied). Le résultat n'était pas le meilleur, je dois dire, je ne suis même pas sûr qu'il mérite d'être appelé Monorepo, mais il remplit l'objectif de partage de code entre les deux parties et j'ai appris beaucoup plus de cette façon malgré le manque de clair documentation à ce sujet (pour le prochain, mieux vaut utiliser un outil optimal pour le travail).

## Plus d'idées

Il y avait beaucoup de choses que, pour une raison ou une autre, je ne pouvais pas inclure dans le produit final mais que j'avais en tête, la plupart en raison de limitations ou simplement parce que c'était trop. Parmi lesquels se trouvaient:

- Vérification de l'E-mail
- Navigateur de galerie avec pagination et filtres de recherche
- "Visites" et "J'aime" pour les galeries et les images
- Section des galeries préférées
- Personnalisation étendue du profil utilisateur (nom, image, couverture, bio, etc.)
- URL plus conviviales
- CI/CD
- Etc...

Beaucoup de ces fonctionnalités potentielles se concentrent sur le côté social de l'application. Je peux les inclure plus tard, bien que sans une motivation claire et un meilleur matériel, j'en doute fortement.

## Problèmes de production

Être un développeur fullstack/backend qui souhaite télécharger des démos de ses projets sur Internet n'est pas facile du tout. Déployer un projet frontend peut être aussi simple que quelques clics entièrement gratuits et comme par magie, mais ce n'est souvent pas le cas dans le backend. Les projets qui impliquent le backend sont beaucoup plus complexes et coûteux compte tenu de leur nature. Dans cet esprit, je savais que porter un tel projet en production serait difficile, mais ça l'était encore plus.

### Hébergement

Avec la disparition des plans gratuits de Heroku (la plate-forme sur laquelle je téléchargeais habituellement mes démos), il était difficile de trouver un remplaçant viable pour leurs services d'hébergement Web et de base de données. Heroku n'était pas parfait mais il proposait un plan gratuit, très généreux, bien documenté et facile à utiliser.

L'alternative que j'ai pu trouver était une combinaison de Render.com pour l'hébergement Web et de Supabase pour l'hébergement d'une base de données PostgreSQL.

### Google OAuth

Il y a toujours quelque chose qui fonctionne bien localement et vous pensez que ce ne sera pas un problème en production, mais c'est finalement le cas, c'était le cas avec Google OAuth. Fondamentalement, le problème réside dans le processus de vérification qui doit être effectué pour utiliser publiquement l'API Google en tant que fournisseur OAuth. Ce projet ne répond pas aux exigences et n'est donc pas vérifié pour utiliser Google OAuth dans son intégralité. Il existe une limite par défaut de seulement 100 utilisations totales du service dans ce contexte.

Je pense que c'est exagéré de passer par ce processus de vérification alors que je veux juste prouver que la fonctionnalité est là. Ce n'est donc qu'une question de temps avant que cette fonctionnalité cesse de fonctionner correctement dans la démo publique.

### Autres

Comme je l'ai mentionné tout au long du document, il existe de nombreuses autres fonctionnalités qui sont limitées ou que je n'ai pas pu inclure comme je l'avais prévu compte tenu des conditions présentées. Par exemple: vérification des e-mails, téléchargement de fichiers, etc.

> Compte tenu de tous ces problèmes, j'ai actuellement du mal à continuer à déployer des projets personnels qui impliquent une telle complexité, du temps et des coûts. Pas parce que je ne veux pas, mais parce que ce n'est pas viable dans mon contexte. Je me concentrerai sur des projets purement techniques à petite échelle jusqu'à ce que je puisse revenir à ce type de projets car ils sont très amusants pour moi et ajoutent beaucoup à mon apprentissage et à mon expérience.

## Conclusion

C'est le projet personnel dans lequel j'ai mis le plus d'efforts et de temps. Ce n'est pas celui dans lequel j'ai le plus appris, mais celui dans lequel j'ai consolidé ce que j'ai le plus appris depuis tout ce temps et il y a encore beaucoup à apprendre et à améliorer, c'est ce que j'aime le plus dans un logiciel développement et je suis très fier du travail que j'ai accompli ici. Je dois admettre que c'est là que j'ai eu la pire expérience en raison des limites avec lesquelles j'ai effectué ce travail (comme le mauvais hardware). Pourtant, cela n'a pas arrêté ce projet et les nombreux autres que j'ai en tête pour explorer des idées nouvelles et intéressantes dans ce domaine passionnant.

Pour finir, merci beaucoup d'avoir lu et à bientôt dans une autre pull request! ❤️

*J'ai failli oublier la référence à The Office LMAO.*

![The Office I'm dead inside](https://c.tenor.com/o-YELW_C6s8AAAAd/when-ur-bff-moves-away-dead-inside.gif)

_\- DevCorvus_
