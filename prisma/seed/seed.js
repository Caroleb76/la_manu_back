import prisma from "../../src/utils/prisma.js";
import {
  defaultNotifications,
  createNotificationSeed,
} from "./notificationSeed.js";
import { defaultRoles, createRoleSeeds } from "./roleSeed.js";
import {
  createSuperAdminSeeds,
  createAdminSeeds,
  createFormateurSeeds,
  defaultSuperAdmins,
  defaultAdmins,
  defaultFormateurs,
} from "./userSeed.js";
import {
  defaultSessionFormations,
  createSessionFormationSeeds,
} from "./sessionFormationSeed.js";
import { defaultContracts, createContractSeeds } from "./contractSeed.js";
import { defaultAddresses, createAddressSeeds } from "./addressSeed.js";
import { defaultFormations, createFormationSeeds } from "./formationSeed.js";
import {
  defaultInterventionCategories,
  createInterventionCategorySeeds,
} from "./interventionCategorySeed.js";
import {
  defaultModuleFormations,
  createModuleFormationSeeds,
} from "./moduleFormationSeed.js";
import {
  defaultInterventions,
  createInterventionSeeds,
} from "./interventionSeed.js";
import { defaultExtraCosts } from "./extraCostSeed.js";
import {
  createExtraCostCategorySeeds,
  defaultExtraCostsCategories,
} from "./extraCostCategorySeed.js";

async function main() {
  //Seed Notifications
  const notifications = [];
  for (const notification of defaultNotifications) {
    notifications.push(await createNotificationSeed(notification));
  }

  //Seed Roles
  const roles = [];
  for (const role of defaultRoles) {
    roles.push(await createRoleSeeds(role));
  }

  //Seed Addresses
  const addresses = [];
  for (const address of defaultAddresses) {
    addresses.push(await createAddressSeeds(address));
  }

  //Seed Users
  const users = [];

  //Ajouter les superAdmins
  for (let i = 0; i < defaultSuperAdmins.length; i++) {
    users.push(
      await createSuperAdminSeeds(defaultSuperAdmins[i], addresses[i]),
    );
  }
  //Ajouter les admins
  for (let i = 0; i < defaultAdmins.length; i++) {
    users.push(await createAdminSeeds(defaultAdmins[i], addresses[i]));
  }

  //Ajouter les formateurs
  for (let i = 0; i < defaultFormateurs.length; i++) {
    users.push(await createFormateurSeeds(defaultFormateurs[i], addresses[i]));
  }
  let formationsIds = [];
  // Seed formations
  const formations = [];
  for (const formation of defaultFormations) {
    const createdFromation = await createFormationSeeds(formation);
    formations.push(createdFromation);
    formationsIds.push(createdFromation.id);
  }

  //Seed Sessionformation
  const sessionFormations = [];
  for (let i = 0; i < defaultSessionFormations.length; i++) {
    console.log(addresses);

    sessionFormations.push(
      await createSessionFormationSeeds(
        defaultSessionFormations[i],
        formations[i],
        addresses[i],
      ),
    );
  }

  //Seed Contracts
  const contracts = [];
  for (let i = 0; i < defaultContracts.length; i++) {
    contracts.push(
      await createContractSeeds(
        defaultContracts[i],
        sessionFormations[i],
        //Les seeds "formateurs" ont les id 7 à 9, donc j'ajouter 6
        users[i + 6],
      ),
    );
  }

  //Seed modules formations
  const modulesFormations = [];

  for (let i = 0; i < defaultModuleFormations.length; i++) {
    const { tag, ...module } = defaultModuleFormations[i];
    const curentFormation = formationsIds[tag];
    module.formationId = curentFormation;

    modulesFormations.push(await createModuleFormationSeeds(module));
  }

  //Seed interventionCategories
  const interventionCategories = [];
  for (const interventionCategory of defaultInterventionCategories) {
    interventionCategories.push(
      await createInterventionCategorySeeds(interventionCategory),
    );
  }

  //Seed extraCosts
  // const extraCosts = [];
  // for (let i = 0; i < defaultExtraCosts.length; i++) {
  //     const extraCost = await createExtraCostSeeds(defaultExtraCosts[i]);
  //     extraCosts.push(
  //         extraCost
  //     );
  // }

  // seed extraCostCategories
  let i = 0;
  for (const extraCostCategory of defaultExtraCostsCategories) {
    const createdExtraCostCategory =
      await createExtraCostCategorySeeds(extraCostCategory);
    defaultExtraCosts[i].categoryId = createdExtraCostCategory.id;
    i++;
  }

  //Seed Interventions
  const interventions = [];
  for (let i = 0; i < defaultInterventions.length; i++) {
    // console.log(extraCosts[i]);

    const currentExtraCostId = defaultExtraCosts[i];
    const currentIntervention = defaultInterventions[i];
    currentIntervention.extraCosts = [currentExtraCostId];
    interventions.push(
      await createInterventionSeeds(
        currentIntervention,
        contracts[i],
        interventionCategories[i],
        modulesFormations[i],
      ),
    );
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
