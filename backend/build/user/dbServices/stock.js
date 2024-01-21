"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStockDetails = exports.getStockDetails = void 0;
const { pool } = require("../../mysqlSetup");
const getStockDetails = async (user_id) => {
    try {
        const connection = await pool.getConnection();
        var [res] = await connection.query(`
                SELECT medicine_list.medicine_name, stock.*
                FROM medicine_list
                JOIN stock ON medicine_list.medicine_id = stock.medicine_id;
            `, [user_id]);
        connection.release();
        return {
            success: true,
            msg: `Stock details`,
            details: res
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
exports.getStockDetails = getStockDetails;
const updateStockDetails = async (newStockDetails) => {
    const { totalStock, medicine_id } = newStockDetails;
    try {
        const connection = await pool.getConnection();
        var [res] = await connection.query(`
                UPDATE stock 
                SET containers = ?
                WHERE medicine_id = ?
            `, [totalStock, medicine_id]);
        connection.release();
        if (res.affectedRows > 0) {
            return {
                err: false,
                success: true,
                msg: `Stock details updated`,
                details: res
            };
        }
        else {
            return {
                err: false,
                success: false,
                msg: `No rows were updated. Medicine not found.`,
                details: res
            };
        }
    }
    catch (error) {
        console.error('Error:', error.message);
        if (error.sqlMessage) {
            return { err: true, success: false, msg: error.sqlMessage };
        }
        else {
            return { err: true, success: false, msg: error.message };
        }
    }
};
exports.updateStockDetails = updateStockDetails;
module.exports = {
    getStockDetails: exports.getStockDetails,
    updateStockDetails: exports.updateStockDetails
};
//# sourceMappingURL=stock.js.map