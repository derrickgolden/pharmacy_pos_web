import { RowDataPacket } from "mysql2";
import { universalResponse } from "user/types/universalResponse";
const { pool } = require("../../../mysqlSetup");

export const getSalesReport = async ( pharmacy_id: number): Promise<universalResponse> => {    
    try {
        const connection: RowDataPacket = await pool.getConnection();

            var [res] = await connection.query(`
            SELECT
                s.sale_id,
                s.sale_date,
                s.total_price,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'sales_item_id', si.sales_item_id,
                        'medicine_id', si.medicine_id,
                        'units_sold', si.units_sold,
                        'sub_total', si.sub_total
                    )
                ) AS sales_items
            FROM
                sales s
            JOIN
                sales_items si ON s.sale_id = si.sale_id
            GROUP BY
                s.sale_id, s.sale_date, s.total_price;
            `);

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