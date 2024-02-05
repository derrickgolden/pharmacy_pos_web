"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSales = void 0;
const { pool } = require("../../../mysqlSetup");
const registerSales = async (saleDetails, user_id) => {
    console.log(saleDetails);
    const orderDetails = saleDetails.orderDetails;
    const totalPrice = saleDetails.totalPrice;
    const moneyTrans = saleDetails.moneyTrans;
    const updateStock = saleDetails.updateStock;
    const sale_date = new Date();
    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        const { customerGave, change } = moneyTrans;
        var [res] = await connection.query(`
                INSERT INTO sales (sale_date, total_price, change_amount, cashier)
                VALUES (?, ?, ?, ?)
            `, [sale_date, totalPrice, change, user_id]);
        const sale_id = res.insertId;
        orderDetails.map(async (details) => {
            const { medicine_id, units, sub_total } = details;
            var [pricing_res] = await connection.query(`
                    INSERT INTO sales_items (sale_id, medicine_id, units_sold, sub_total)
                    VALUES (?, ?, ?, ?)
                `, [sale_id, medicine_id, units, sub_total]);
        });
        // insert paymentMethods
        Object.entries(customerGave).map(async ([key, value]) => {
            var [paymentMethods_res] = await connection.query(`
                    INSERT INTO sale_payments (sale_id, payment_method, amount)
                    VALUES (?, ?, ?)
                `, [sale_id, key, value]);
        });
        // update stock
        updateStock.map(async (details) => {
            const { medicine_id, remainingContainers, remainingUnits } = details;
            var [stock_res] = await connection.query(`
                    UPDATE stock 
                    SET  containers = ?, open_container_units = ?
                    WHERE medicine_id = ?
                `, [remainingContainers, remainingUnits, medicine_id]);
        });
        await connection.commit();
        connection.release();
        return {
            success: true,
            msg: `sale has been Registered`,
            details: [{ sale_id, sale_date, ...moneyTrans }]
        };
    }
    catch (error) {
        console.error('Error:', error.message);
        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        }
        else {
            return { success: false, msg: error.message };
        }
    }
};
exports.registerSales = registerSales;
module.exports = {
    registerSales: exports.registerSales,
};
//# sourceMappingURL=registerSales.js.map