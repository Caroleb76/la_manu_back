import prisma from "../../src/utils/prisma.js";
import {
    defaultNotifications,
    createNotificationSeed,
} from "./notificationSeed.js";
import { defaultRoles, createRoleSeeds } from "./roleSeed.js";
import { defaultUsers, createUserSeeds } from "./userSeed.js";
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
import { defaultExtraCosts, createExtraCostSeeds } from "./extraCostSeed.js";

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
    for (let i = 0; i < defaultUsers.length; i++) {
        users.push(await createUserSeeds(defaultUsers[i], roles[i], addresses[i]));
    }

    // Seed formations
    const formations = [];
    for (const formation of defaultFormations) {
        formations.push(await createFormationSeeds(formation));
    }

    //Seed Sessionformation
    const sessionFormations = [];
    for (let i = 0; i < defaultSessionFormations.length; i++) {
        sessionFormations.push(
            await createSessionFormationSeeds(
                defaultSessionFormations[i],
                formations[i],
                addresses[i]
            )
        );
    }

    //Seed Contracts
    const contracts = [];
    for (let i = 0; i < defaultContracts.length; i++) {
        contracts.push(
            await createContractSeeds(
                defaultContracts[i],
                sessionFormations[i],
                users[i]
            )
        );
    }

    //Seed modules formations
    const modulesFormations = [];
    for (const module of defaultModuleFormations) {
        modulesFormations.push(await createModuleFormationSeeds(module));
    }

    //Seed interventionCategories
    const interventionCategories = [];
    for (const interventionCategory of defaultInterventionCategories) {
        interventionCategories.push(
            await createInterventionCategorySeeds(interventionCategory)
        );
    }

    //Seed Interventions
    const interventions = [];
    for (let i = 0; i < defaultInterventions.length; i++) {
        interventions.push(
            await createInterventionSeeds(
                defaultInterventions[i],
                contracts[i],
                interventionCategories[i],
                modulesFormations[i]
            )
        );
    }

    //Seed extraCosts
    const extraCosts = [];
    for (let i = 0; i < defaultExtraCosts.length; i++) {
        extraCosts.push(await createExtraCostSeeds(defaultExtraCosts[i], interventions[i]));
    }
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
