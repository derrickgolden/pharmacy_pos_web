"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPharmacyListDetails = exports.registerPharmacy = void 0;
const { pool } = require("../../mysqlSetup");
const registerPharmacy = async ({ pharmacyDetails, user, logo }) => {
    const { pharmacy_name, location, pharmacy_email, pharmacy_tel, extra_info } = pharmacyDetails;
    const { user_id } = user;
    // const {path} = logo
    try {
        const connection = await pool.getConnection();
        await connection.beginTransaction();
        var [res] = await connection.query(`
                INSERT INTO pharmacy_details (
                    user_id, pharmacy_name, location, pharmacy_email, pharmacy_tel, extra_info
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `, [user_id, pharmacy_name, location, pharmacy_email, pharmacy_tel, extra_info]);
        const pharmacy_id = res.insertId;
        await connection.commit();
        connection.release();
        return {
            success: true,
            msg: `Pharmacy has been Registered`,
            details: [{ pharmacy_id }]
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
exports.registerPharmacy = registerPharmacy;
const getPharmacyListDetails = async (user_id) => {
    try {
        const connection = await pool.getConnection();
        var [res] = await connection.query(`
                SELECT * FROM pharmacy_details 
                WHERE user_id = ?
            `, [user_id]);
        connection.release();
        return {
            success: true,
            msg: `Pharmacy details`,
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
exports.getPharmacyListDetails = getPharmacyListDetails;
module.exports = {
    registerPharmacy: exports.registerPharmacy,
    getPharmacyListDetails: exports.getPharmacyListDetails,
};
//# sourceMappingURL=pharmacy.js.map