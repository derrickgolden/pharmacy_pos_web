"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMedicineGroups = exports.updateMedicineDetails = exports.addMedicineGroup = void 0;
const { pool } = require("../../../mysqlSetup");
const addMedicineGroup = async (medicinegroupDetails) => {
    const { group_name, description } = medicinegroupDetails;
    try {
        const connection = await pool.getConnection();
        var [res] = await connection.query(`
                INSERT INTO medicine_group (group_name, description)
                VALUES (?, ?)
            `, [group_name, description]);
        connection.release();
        return {
            success: true,
            msg: `Medicine Group ${group_name} Registered`,
            details: []
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
exports.addMedicineGroup = addMedicineGroup;
const updateMedicineDetails = async (medicinegroupDetails) => {
    const { medicine_id, warning_limit, medicine_name } = medicinegroupDetails;
    try {
        const connection = await pool.getConnection();
        var [res] = await connection.query(`
                UPDATE stock 
                SET warning_limit = ?
                WHERE medicine_id = ?
            `, [warning_limit, medicine_id]);
        var [name_res] = await connection.query(`
                UPDATE medicine_list 
                SET medicine_name = ?
                WHERE medicine_id = ?
            `, [medicine_name, medicine_id]);
        connection.release();
        if (res.affectedRows > 0 || name_res.affectedRows > 0) {
            return {
                err: false,
                success: true,
                msg: `Medicine details updated`,
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
            return { success: false, msg: error.sqlMessage };
        }
        else {
            return { success: false, msg: error.message };
        }
    }
};
exports.updateMedicineDetails = updateMedicineDetails;
const getMedicineGroups = async (filterNull) => {
    try {
        const connection = await pool.getConnection();
        // Organize SQL query for better readability
        const query = `
        SELECT
            mg.group_id,
            mg.group_name,
            mg.description,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'medicine_id', ml.medicine_id,
                    'medicine_code', ml.medicine_code,
                    'medicine_name', ml.medicine_name,
                    'stock_qty', ml.stock_qty,
                    'instructions', ml.instructions,
                    'side_effect', ml.side_effect,
                    'img_path', ml.img_path,
                    'pricing_id', p.pricing_id,
                    'price', p.price,
                    'unit_of_measurement', p.unit_of_measurement,
                    'package_size', p.package_size
                )
            ) AS medicines
        FROM
            medicine_group mg
        LEFT JOIN
            medicine_list ml ON mg.group_id = ml.group_id
        LEFT JOIN
            pricing p ON ml.medicine_id = p.medicine_id
        ${filterNull ? "WHERE ml.medicine_id IS NOT NULL" : ""}
        GROUP BY
            mg.group_id, mg.group_name, mg.description;
    
        `;
        const [res] = await connection.query(query);
        connection.release();
        return {
            success: true,
            msg: `Medicine Group list`,
            details: res,
        };
    }
    catch (error) {
        console.error('Error:', error.message);
        if (error.sqlMessage) {
            return { success: false, msg: "Database Error", err: error.sqlMessage };
        }
        else {
            return { success: false, msg: "Database Error", err: error.message };
        }
    }
};
exports.getMedicineGroups = getMedicineGroups;
module.exports = {
    addMedicineGroup: exports.addMedicineGroup,
    getMedicineGroups: exports.getMedicineGroups,
    updateMedicineDetails: exports.updateMedicineDetails
};
//# sourceMappingURL=medicineGroup.js.map