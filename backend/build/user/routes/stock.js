"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stock_1 = require("../dbServices/stock");
const router = express_1.default.Router();
router.post('/update', async (req, res) => {
    const newStockDetails = req.body;
    console.log(newStockDetails);
    try {
        const response = await (0, stock_1.updateStockDetails)(newStockDetails);
        response.err ?
            res.status(302).json(response) :
            res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
        res.status(302).json({ success: false, msg: "sever side error", err: error.message });
    }
});
router.post('/stock-details', async (req, res) => {
    const { user_id } = req.user;
    try {
        const response = await (0, stock_1.getStockDetails)(user_id);
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
//# sourceMappingURL=stock.js.map