import contractService from "../src/services/contractService";
import interventionService from "../src/services/interventionService.js";
import extraCostService from "../src/services/extraCostService.js";
import userService from "../src/services/userService.js";
import sessionFormationService from "../src/services/sessionFormationService.js";
import interventionCategoryService from "../src/services/interventionCategoryService.js";
import extraCostCategoryService from "../src/services/extraCostCategoryService.js";
import moduleFormationService from "../src/services/moduleFormationService.js";

test("addOneContract", async () => {
  const initialContracts = await contractService.getAll();
  const initialInterventions = await interventionService.getAll();
  const initialExtraCosts = await extraCostService.getExtraCosts();
  const extraCostCategories = await extraCostCategoryService.getAll();
  const interventionCategories = await interventionCategoryService.getAll();
  const modules = await moduleFormationService.getModuleFormations();
  const users = await userService.getUsers();
  const sessionFormations = await sessionFormationService.getSessions();
  const user = users.users[0];
  const extraCostCategory = extraCostCategories[0];
  const sessionFormation = sessionFormations.sessionFormations[0];
  const interventionCategory = interventionCategories[0];
  const module = modules[0];
  const testContract = {
    sessionFormationId: sessionFormation.id,
    formateurId: user.id,
    startDate: "2025-09-25",
    endDate: "2025-10-14",
    interventions: [
      {
        dateIntervention: "2025-09-28",
        hours: 4,
        shift: "matin",
        description: "lorem ipsum",
        InterventionCategory: interventionCategory,
        ModuleFormation: module,
        extraCosts: [
          {
            categoryId: extraCostCategory.id,
            val: null,
          },
        ],
      },
    ],
  };
  const newContract = await contractService.create(testContract);
  const finalcontracts = await contractService.getAll();
  const finalInterventions = await interventionService.getAll();
  const finalExtraCosts = await extraCostService.getExtraCosts();

  expect(finalcontracts.contracts.length).toBe(
    initialContracts.contracts.length + 1,
  );

  expect(finalInterventions.length).toBe(initialInterventions.length + 1);

  expect(finalExtraCosts.length).toBe(initialExtraCosts.length + 1);
});
