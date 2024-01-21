import { RowDataPacket } from "mysql2";
import { medicineDetailsProps } from "user/types/medicineDetails";
import { universalResponse } from "user/types/universalResponse";
const { pool } = require("../../../mysqlSetup");

export const addMedicine = async (medicineDetails: medicineDetailsProps, img_file: Express.Multer.File ): Promise<universalResponse> => {
    
    const {medicine_code, medicine_name, stock_qty, 
    instructions, side_effect, group_id, price, unit_of_mesurement, package_size} = medicineDetails;

    const path = img_file?.path || null
    
    try {
        const connection: RowDataPacket = await pool.getConnection();

        await connection.beginTransaction();

            var [res] = await connection.query(`
                INSERT INTO medicine_list (medicine_code, medicine_name, stock_qty, 
                    instructions, side_effect, group_id, img_path)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [medicine_code, medicine_name, stock_qty, 
                instructions, side_effect, group_id, path]);
                
                const medicine_id = res.insertId;
                console.log("medicine_id: ", medicine_id);
                
                var [pricing_res] = await connection.query(`
                INSERT INTO pricing (medicine_id, price, unit_of_measurement, package_size)
                VALUES (?, ?, ?, ?)
                `, [medicine_id, price, unit_of_mesurement, package_size]);
                console.log("pricing_id: ", pricing_res.insertId);

                var [stock_res] = await connection.query(`
                    INSERT INTO stock (medicine_id, containers, units_per_container, open_container_units, warning_limit)
                    VALUES (?, ?, ?, ?, ?)
                `, [medicine_id, stock_qty, package_size, 0, 20]);

        await connection.commit();

        connection.release();

        return {
            success: true,
            msg: `${medicine_name} has been Registered`,
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

export const getMedicineList = async ( ): Promise<universalResponse> => {    
    try {
        const connection: RowDataPacket = await pool.getConnection();

            var [res] = await connection.query(`
            SELECT
    ml.medicine_id,
    ml.medicine_code,
    ml.medicine_name,
    ml.instructions,
    ml.side_effect,
    ml.img_path,
    mg.group_id,
    mg.group_name,
    mg.description,
    s.containers AS stock_qty,
    s.units_per_container,
    s.open_container_units,
    s.last_stocked,
    s.warning_limit
FROM
    medicine_list ml
JOIN
    medicine_group mg ON ml.group_id = mg.group_id
LEFT JOIN
    stock s ON ml.medicine_id = s.medicine_id;
         
            `);

        connection.release();
// console.log(res);

        return {
            success: true,
            msg: `Medicine list`,
            details: res
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

module.exports = {
    addMedicine,
    getMedicineList,
}