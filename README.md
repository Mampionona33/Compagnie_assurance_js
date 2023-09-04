## C'est un projet pour la pratique de JavaScript

# Sujet:

Une compagnie d'assurance automobile propose quatre types de tarifs identifiables par une couleur, du moins cher au plus cher : tarifs bleu, vert, orange et rouge. Le tarif dépend de la situation du conducteur :

• un conducteur de moins de 25 ans et titulaire du permis depuis moins de deux ans, se voit attribuer le tarif rouge, si toutefois il n'a jamais été responsable d'accident. Sinon, la compagnie refuse de l'assurer.

• un conducteur de moins de 25 ans et titulaire du permis depuis plus de deux ans, ou de plus de 25 ans mais titulaire du permis depuis moins de deux ans a le droit au tarif orange s'il n'a jamais provoqué d'accident, au tarif rouge pour un accident, sinon il est refusé.

• un conducteur de plus de 25 ans titulaire du permis depuis plus de deux ans bénéficiera du tarif vert s'il n'est à l'origine d'aucun accident , du tarif orange pour un accident, du tarif rouge pour deux accidents, et refusé au-delà

• De plus, pour encourager la fidélité des clients acceptés, la compagnie propose un contrat de la couleur immédiatement la plus avantageuse s'il est entré dans la compagnie depuis plus de cinq ans. Ainsi, s'il satisfait à cette exigence, un client "vert" devient "bleu", un client "orange" devient "vert", et le "rouge" devient orange.

Ecrire l'algorithme permettant de saisir les données nécessaires (sans contrôle de saisie) et de traiter ce problème.

# Design Pattern utilisé : Design Pattern Strategy

Dans ce projet, nous avons utilisé le design pattern "Strategy" pour gérer les différents types de tarifs d'assurance en fonction de la situation du conducteur. Le design pattern "Strategy" permet de définir une famille d'algorithmes, de les encapsuler et de les rendre interchangeables. Chaque type de tarif est représenté par une classe concrète qui implémente une interface commune. Cela nous permet de calculer les tarifs en fonction des critères spécifiques et de les changer facilement sans modifier le code principal.

Les classes implémentant l'interface `IOffreAssurance` représentent les différentes stratégies de calcul de tarifs, telles que `Refuse`, `RedOffer`, `OrangeOffer`, et `GreenOffer`. Chaque classe a sa propre implémentation de la méthode `calculerTarif`, ce qui nous permet de choisir dynamiquement la stratégie appropriée en fonction de la situation du conducteur.

Ce design pattern rend notre code flexible, extensible et facilite la gestion des différents cas de calcul de tarifs d'assurance.
