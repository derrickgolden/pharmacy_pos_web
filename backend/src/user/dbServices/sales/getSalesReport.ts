import { RowDataPacket } from "mysql2";
import { universalResponse } from "user/types/universalResponse";
const { pool } = require("../../../mysqlSetup");

export const getSalesReport = async ( pharmacy_id: number): Promise<universalResponse> => {  
    console.log(pharmacy_id)  
    try {
        const connection: RowDataPacket = await pool.getConnection();

            var [res] = await connection.query(`
            SELECT
                s.sale_id,
                s.sale_date,
                s.total_price,
                'cashier',
                JSON_OBJECT(
                    'cashier_f_name', ud.first_name,
                    'cashier_l_name', ud.last_name,
                    'cashier_id', s.cashier
                ) As cashier,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'sales_item_id', si.sales_item_id,
                        'medicine_id', si.medicine_id,
                        'medicine_name', ml.medicine_name, -- Include medicine_name
                        'units_sold', si.units_sold,
                        'sub_total', si.sub_total
                    )
                ) AS sales_items
            FROM
                sales s
            JOIN
                user_details ud ON s.cashier = ud.user_id
            JOIN
                sales_items si ON s.sale_id = si.sale_id
            JOIN
                medicine_list ml ON si.medicine_id = ml.medicine_id -- Join with medicine_list table
            WHERE s.pharmacy_id = ?
            GROUP BY
                s.sale_id, s.sale_date, s.total_price;

            `, [pharmacy_id]);

        connection.release();

        return {
            success: true,
            msg: `Sales Report`,
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
    getSalesReport,
}