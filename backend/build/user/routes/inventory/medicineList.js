"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const medicineList_1 = require("../../dbServices/inventory/medicineList");
const router = express_1.default.Router();
router.post('/add-medicine', async (req, res) => {
    const body = req.body;
    const img_file = req.file;
    // console.log(body);
    try {
        const response = await (0, medicineList_1.addMedicine)(body, img_file);
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.get('/get-medicine', async (req, res) => {
    try {
        const response = await (0, medicineList_1.getMedicineList)();
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
//# sourceMappingURL=medicineList.js.map