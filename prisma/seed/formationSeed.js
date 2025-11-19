import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const defaultFormations = [
  {
    name: "Accompagnement Social Professionnel",
    description:
      "Programme dédié au développement des compétences d’accompagnement socio-professionnel, incluant l’analyse de situations, la construction de projets personnalisés et la coordination avec les partenaires sociaux.",
  },
  {
    name: "Techniques d’Intervention Éducative",
    description:
      "Formation axée sur les méthodes d’intervention auprès de différents publics, comprenant la gestion de conflits, les approches éducatives innovantes et les outils d’observation.",
  },
  {
    name: "Gestion et Organisation des Établissements Sociaux",
    description:
      "Module destiné aux futurs responsables et coordinateurs, couvrant la gestion administrative, la réglementation du secteur social et la conduite de projets institutionnels.",
  },
  {
    name: "Communication et Relations Professionnelles",
    description:
      "Développe les compétences en communication interpersonnelle, animation de réunions, rédaction professionnelle et gestion des situations difficiles dans un cadre éducatif.",
  },
];

export async function createFormationSeeds(formation) {
  const createdContract = await prisma.formation.create({
    data: {
      name: formation.name,
      description: formation.description,
    },
  });
  return createdContract;
}
