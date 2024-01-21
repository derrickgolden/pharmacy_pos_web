import { RowDataPacket } from "mysql2";
import { universalResponse } from "user/types/universalResponse";
import { RegisterPharmacyProps } from "./types";
const { pool } = require("../../mysqlSetup");

export const registerPharmacy = async ({pharmacyDetails, user, logo}: RegisterPharmacyProps ): Promise<universalResponse> => {

    const {pharmacy_name, location, pharmacy_email, pharmacy_tel, extra_info} = pharmacyDetails;
    const {user_id} = user;
    // const {path} = logo
    
    try {
        const connection: RowDataPacket = await pool.getConnection();

        await connection.beginTransaction();
            var [res] = await connection.query(`
                INSERT INTO pharmacy_details (
                    user_id, pharmacy_name, location, pharmacy_email, pharmacy_tel, extra_info
                )
                VALUES (?, ?, ?, ?, ?, ?)
            `, [user_id, pharmacy_name, location, pharmacy_email, pharmacy_tel, extra_info ]);

            const pharmacy_id = res.insertId;
                
        await connection.commit();

        connection.release();

        return {
            success: true,
            msg: `Pharmacy has been Registered`,
            details: [{pharmacy_id}]
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

export const getPharmacyListDetails = async (user_id: number) => {
    try {
        const connection: RowDataPacket = await pool.getConnection();

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
    } catch (error) {
        console.error('Error:', error.message);

        if (error.sqlMessage) {
            return { success: false, msg: error.sqlMessage };
        } else {
            return { success: false, msg: error.message };
        }
    }
};

module.exports = {
    registerPharmacy,
    getPharmacyListDetails,
}