"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicineGroup_1 = require("../../dbServices/inventory/medicineGroup");
const router = express_1.default.Router();
router.post('/add-group', async (req, res) => {
    const { group_name, description, pharmacy_id } = req.body;
    const token = req.header('Authorization');
    try {
        const response = await (0, medicineGroup_1.addMedicineGroup)({ group_name, description, pharmacy_id });
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.post('/get-groups', async (req, res) => {
    const { filterNull, pharmacy_id } = req.body || false;
    try {
        const response = await (0, medicineGroup_1.getMedicineGroups)(filterNull, pharmacy_id);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.post('/update', async (req, res) => {
    const body = req.body;
    try {
        const response = await (0, medicineGroup_1.updateMedicineDetails)(body);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.patch('/shift-group', async (req, res) => {
    const body = req.body;
    try {
        const response = await (0, medicineGroup_1.shiftMedicineGroup)(body);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=medicineGroup.js.map