// On attend que le document soit chargé avant d'exécuter le code JavaScript
document.addEventListener("DOMContentLoaded", (event) => {
  // On définit les bonnes réponses pour chaque question
  const correctAnswers = {
    question1: "sauvegarde disque",
    question2: "mise en miroir",
    question3: "les agregat de patheon",
  };

  // On ajoute un gestionnaire d'événements au bouton "correction"
  document.querySelector("#correction").addEventListener("click", () => {
    // On récupère toutes les questions
    const questions = document.querySelectorAll("ul");
    questions.forEach((question, index) => {
      // On récupère toutes les réponses pour chaque question
      const inputs = question.querySelectorAll('input[type="checkbox"]');
      inputs.forEach((input) => {
        // On récupère le texte de la réponse
        const label = input.nextElementSibling;
        // Si la réponse est cochée
        if (input.checked) {
          // Si la réponse est correcte, on la colore en vert
          if (
            label.textContent.trim() === correctAnswers[`question${index + 1}`] // C'est une méthode JavaScript qui supprime les espaces vides au début et à la fin d'une chaîne de caractères
          ) {
            label.style.color = "green";
          } else {
            // Si la réponse est incorrecte, on la colore en rouge
            label.style.color = "red";
          }
        } else if (
          label.textContent.trim() === correctAnswers[`question${index + 1}`]
        ) {
          // Si la réponse est correcte mais non cochée, on la colore en bleu
          label.style.color = "blue";
        }
      });
    });
  });

  // On ajoute un gestionnaire d'événements au bouton "effacer"
  document.querySelector("#effacer").addEventListener("click", () => {
    // On récupère toutes les cases à cocher
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      // On décoche toutes les cases
      checkbox.checked = false;
    });
  });

  // On ajoute un gestionnaire d'événements au bouton "corriger"
  // document.querySelector("#corriger").addEventListener("click", () => {
  //   // On récupère toutes les questions
  //   const questions = document.querySelectorAll("ul");
  //   questions.forEach((question, index) => {
  //     // On récupère toutes les réponses pour chaque question
  //     const inputs = question.querySelectorAll('input[type="checkbox"]');
  //     inputs.forEach((input) => {
  //       // On récupère le texte de la réponse
  //       const label = input.nextElementSibling;
  //       // Si la réponse est correcte, on la coche
  //       if (
  //         label.textContent.trim() === correctAnswers[`question${index + 1}`]
  //       ) {
  //         input.checked = true;
  //       }
  //     });
  //   });
  // });

  // On ajoute un gestionnaire d'événements au bouton "corriger"
  document.querySelector("#corriger").addEventListener("click", () => {
    // On initialise une chaîne de caractères pour stocker les bonnes réponses
    let correctAnswersString = "Les bonnes réponses sont :\n";

    // On parcourt l'objet des bonnes réponses
    for (let question in correctAnswers) {
      correctAnswersString += `${question}: ${correctAnswers[question]}\n`;
    }

    // On affiche les bonnes réponses dans un message d'alerte
    alert(correctAnswersString);
  });

  // On ajoute un gestionnaire d'événements au bouton "valider"
  document.querySelector("#valider").addEventListener("click", () => {
    // On initialise le score à 0
    let score = 0;
    // On récupère toutes les questions
    const questions = document.querySelectorAll("ul");
    questions.forEach((question, index) => {
      // On récupère toutes les réponses pour chaque question
      const inputs = question.querySelectorAll('input[type="checkbox"]');
      inputs.forEach((input) => {
        // On récupère le texte de la réponse
        const label = input.nextElementSibling;
        // Si la réponse est cochée et correcte, on augmente le score
        if (
          input.checked &&
          label.textContent.trim() === correctAnswers[`question${index + 1}`]
        ) {
          score++;
        }
      });
    });
    // On met à jour le texte de l'élément #score avec le score
    document.querySelector(
      "#score"
    ).textContent = `Votre score est de : ${score}/3`;
    // On affiche l'élément #popup
    document.querySelector("#popup").style.display = "block";
  });
});

// On sélectionne le bouton "partager" dans le DOM
document.querySelector("#partager").addEventListener("click", () => {
  // On vérifie si l'API Web Share est disponible dans le navigateur
  if (navigator.share) {
    // Si l'API Web Share est disponible, on partage le contenu
    navigator
      .share({
        title: "Mon score", // Le titre du contenu à partager
        text: document.querySelector("#score").textContent, // Le texte du contenu à partager
      })
      .then(() => console.log("Contenu partagé avec succès")) // Si le partage a réussi, on affiche un message dans la console
      .catch((error) => console.log("Erreur lors du partage", error)); // Si une erreur s'est produite lors du partage, on affiche l'erreur dans la console
  } else {
    // Si l'API Web Share n'est pas disponible, on affiche un message dans la console
    console.log("Votre navigateur ne supporte pas l'API Web Share");
  }
});
