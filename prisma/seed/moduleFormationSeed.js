import prisma from "../../src/utils/prisma.js";

const socialProfessionalAccompanimentFormationId = 0;
const techniquedInterventionEducativeFormationId = 1;
const gestionOrganisationFormationId = 2;
const communicationFormationId = 3;
export const defaultModuleFormations = [
  // -------------------------------
  // Accompagnement Social Professionnel
  // -------------------------------
  {
    tag: socialProfessionalAccompanimentFormationId,
    name: "Analyse des Situations Professionnelles",
    description:
      "Méthodes d’analyse de situations rencontrées dans l’accompagnement socio-professionnel, identification des besoins et construction d’actions adaptées.",
  },
  {
    tag: socialProfessionalAccompanimentFormationId,
    name: "Construction du Projet d’Accompagnement",
    description:
      "Techniques pour élaborer des projets personnalisés, suivi d’évolution, coordination avec les partenaires et institutions sociales.",
  },

  // -------------------------------
  // Techniques d’Intervention Éducative
  // -------------------------------
  {
    tag: techniquedInterventionEducativeFormationId,
    name: "Méthodes et Outils d’Intervention",
    description:
      "Découverte et mise en pratique des techniques éducatives, observation, évaluation et gestion des situations complexes.",
  },
  {
    tag: techniquedInterventionEducativeFormationId,
    name: "Gestion des Conflits",
    description:
      "Stratégies d’écoute active, médiation, communication non violente et résolution de conflits auprès de différents publics.",
  },

  // -------------------------------
  // Gestion et Organisation des Établissements Sociaux
  // -------------------------------
  {
    tag: gestionOrganisationFormationId,
    name: "Réglementation du Secteur Social",
    description:
      "Étude de la législation et des obligations réglementaires applicables aux établissements sociaux et médico-sociaux.",
  },
  {
    tag: gestionOrganisationFormationId,
    name: "Conduite de Projets Institutionnels",
    description:
      "Outils et méthodes pour piloter des projets dans une structure sociale : planification, gestion d’équipe, évaluation et reporting.",
  },

  // -------------------------------
  // Communication et Relations Professionnelles
  // -------------------------------
  {
    tag: communicationFormationId,
    name: "Communication Interpersonnelle",
    description:
      "Bases de la communication efficace, écoute active, gestion des émotions, posture professionnelle et relations de confiance.",
  },
  {
    tag: communicationFormationId,
    name: "Rédaction et Communication Professionnelle",
    description:
      "Techniques de rédaction de rapports, comptes rendus, notes professionnelles et animation de réunions.",
  },
];

export async function createModuleFormationSeeds(moduleFormation) {
  const createdModuleFormation = await prisma.moduleFormation.create({
    data: moduleFormation,
  });
  return createdModuleFormation;
}
