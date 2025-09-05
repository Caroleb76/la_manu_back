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

        const createdContract = await contractService.create(data)
    
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