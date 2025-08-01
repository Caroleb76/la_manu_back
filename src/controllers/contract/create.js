import contractService from "../../services/contractService.js";
import interventionService from "../../services/interventionService.js";
import ApiResponse from "../../utils/apiResponse.js";
import {  toStandardDate } from "../../utils/date.js";

export default async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            throw new Error("aucune donnée reçue")
        }
        console.log(data)
        // Expected ISO-8601 DateTime
        const formattedStartDate = toStandardDate(data.startDate)
        const formattedEndDate = toStandardDate(data.endDate)
        console.log(formattedEndDate, formattedStartDate)

        // appeler le service de création des contrats et appeler les identifiants créés
        const formattedContract = {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            signed: false,
            declared: false,
            sessionFormationId: data.sessionId,
            userId: data.formateurId,
        }
        // console.log(formattedContract)
        const createdContract = await contractService.create(formattedContract)
        if (!createdContract) {
            throw new Error("erreur dans la création du contrat")
        }
        // appeler le service de creation des interventions et recuperer les identifiants créés
        if (!data.interventions) {
            throw new Error("aucune intervention enregistrée")
        }
        let formattedInterventions = []
        data.interventions.forEach(intervention => {
            let extraCostsArray = intervention.extraCosts.map(extraCost => ({ id: extraCost }));
            console.log("[+] extraCostsArray", extraCostsArray);
            // throw new Error("stop")
            console.log("intervention date" ,intervention.dateIntervention)
            const formattedDateIntervention = toStandardDate(intervention.dateIntervention)
            const formattedIntervention = {
                dateIntervention: new Date(formattedDateIntervention),
                hours: intervention.hours,
                shift: intervention.shift,
                description: intervention.description,
                validatedByFormateur: false,
                validatedByAdmin: false,
                contractId: createdContract.id,
                interventionCategoryId: intervention.interventionCategoryId,
                moduleFormationId: intervention.moduleId,
               extraCosts: {
                connect: extraCostsArray
               }
            }
            formattedInterventions.push(formattedIntervention)
        });

        for( let intervention of formattedInterventions) {
            await interventionService.create(intervention)
        }
        // if (!createdInterventions) {
        //     throw new Error("erreur dans la création des interventions")
        // }
        // const contract = await contractService.create(data);
        ApiResponse.success(res, createdContract, "Resource created");
    } catch (error) {
        console.error(error)
        return ApiResponse.error(res, error);
    }
};



// dateIntervention: "2025-07-19"
// description: ""
// extraCosts: ['{"label":"Repas","id":"751d6ce6-079c-4b6a-931e-9c2d2697cf2c"}']
// hours: 2
// interventionCategoryId: "a34db267-7701-4039-ae5f-b61852246d71"
// interventionCategoryName: "Correction de copie"
// moduleId: "6a88756b-a697-4d90-b15b-a7cdf98b42e4"
// moduleName: "Formation Web Design"
// shift: "pm"