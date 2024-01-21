"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getSalesReport_1 = require("../../dbServices/sales/getSalesReport");
const router = express_1.default.Router();
router.post('/get-sales', async (req, res) => {
    const { pharmacy_id } = req.body;
    try {
        const response = await (0, getSalesReport_1.getSalesReport)(pharmacy_id);
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
//# sourceMappingURL=getSalesReport.js.map