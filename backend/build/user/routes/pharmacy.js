"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pharmacy_1 = require("../dbServices/pharmacy");
const router = express_1.default.Router();
router.post('/register-pharmacy', async (req, res) => {
    const pharmacyDetails = req.body;
    const user = req.user;
    const logo = req.file;
    if (user.added_by !== user.user_id) {
        return res.status(200).json({ success: false, msg: "Only user registered as owner is allowed to register a pharmacy" });
    }
    try {
        const response = await (0, pharmacy_1.registerPharmacy)({ pharmacyDetails, user, logo });
        response.success ?
            res.status(200).json(response) :
            res.status(302).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.get('/pharmacy-details', async (req, res) => {
    const { added_by } = req.user;
    try {
        const response = await (0, pharmacy_1.getPharmacyListDetails)(added_by);
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
//# sourceMappingURL=pharmacy.js.map