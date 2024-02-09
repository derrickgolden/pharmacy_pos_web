import { RowDataPacket } from "mysql2";
import { updateMedicineDetailsProps } from "user/types/medicineDetails";
import { medicinegroupDetails } from "user/types/medicineGroupTypes";
import { universalResponse } from "user/types/universalResponse";
const { pool } = require("../../../mysqlSetup");

export const addMedicineGroup = async (medicinegroupDetails: medicinegroupDetails ): Promise<universalResponse> => {

    const {group_name, description, pharmacy_id} = medicinegroupDetails;
    
    try {
        const connection: RowDataPacket = await pool.getConnection();

            var [res] = await connection.query(`
                INSERT INTO medicine_group (group_name, description, pharmacy_id)
                VALUES (?, ?, ?)
            `, [group_name, description, pharmacy_id]);

        connection.release();

        return {
            success: true,
            msg: `Medicine Group ${group_name} Registered`,
            details: []
        };
    } catch (error) {
        console.error('Error:', error.message);

        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        } else {
            return { success: false, msg: error.message };
        }
    }
};

export const updateMedicineDetails = async (medicinegroupDetails:  updateMedicineDetailsProps ): Promise<universalResponse> => {

    const {medicine_id, warning_limit, medicine_name} = medicinegroupDetails;
    
    try {
        const connection: RowDataPacket = await pool.getConnection();

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
        } else {
              return {
                err: false,
                  success: false,
                  msg: `No rows were updated. Medicine not found.`,
                  details: res
              };
          }

    } catch (error) {
        console.error('Error:', error.message);

        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        } else {
            return { success: false, msg: error.message };
        }
    }
};

export const getMedicineGroups = async (filterNull: boolean, pharmacy_id: number): Promise<universalResponse> => {
    try {
        const connection: RowDataPacket = await pool.getConnection();
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
                    'instructions', ml.instructions,
                    'side_effect', ml.side_effect,
                    'img_path', ml.img_path,
                    'pricing_id', p.pricing_id,
                    'price', p.price,
                    'unit_of_measurement', p.unit_of_measurement,
                    'stock_qty', s.containers,
                    'package_size', s.units_per_container,
                    'open_container_units', s.open_container_units
                )
            ) AS medicines
        FROM
            medicine_group mg
        LEFT JOIN
            medicine_list ml ON mg.group_id = ml.group_id
        LEFT JOIN
            pricing p ON ml.medicine_id = p.medicine_id
        LEFT JOIN
            stock s ON ml.medicine_id = s.medicine_id
        WHERE
            ${filterNull ? "ml.medicine_id IS NOT NULL AND" : ""}
            mg.pharmacy_id = ?
        GROUP BY
            mg.group_id, mg.group_name, mg.description;
        `;

        const [res] = await connection.query(query, [pharmacy_id]);

        connection.release();

        return {
            success: true,
            msg: `Medicine Group list`,
            details: res,
        };
    } catch (error) {
        console.error('Error:', error.message);

        if (error.sqlMessage) {
            return { success: false, msg: "Database Error", err: error.sqlMessage };
        } else {
            return { success: false, msg: "Database Error", err: error.message };
        }
    }
};

export const shiftMedicineGroup = async (medicinegroupDetails:  updateMedicineDetailsProps ): Promise<universalResponse> => {

    const {medicine_id, group_id} = medicinegroupDetails;
    
    try {
        const connection: RowDataPacket = await pool.getConnection();
            var [res] = await connection.query(`
                UPDATE medicine_list 
                SET group_id = ?
                WHERE medicine_id = ?
            `, [group_id, medicine_id]);
                
        connection.release();

        if ( res.affectedRows > 0) {
            return {
                err: false,
                success: true,
                msg: `Group has been shifted`,
                details: res
            };
        } else {
              return {
                err: false,
                  success: false,
                  msg: `No rows were updated. Medicine not found.`,
                  details: res
              };
          }

    } catch (error) {
        console.error('Error: ', error);

        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        } else {
            return { success: false, msg: error.message };
        }
    }
};
     

module.exports = {
    addMedicineGroup,
    getMedicineGroups,
    updateMedicineDetails ,
    shiftMedicineGroup
}