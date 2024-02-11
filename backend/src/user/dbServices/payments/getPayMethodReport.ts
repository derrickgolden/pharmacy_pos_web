import { RowDataPacket } from "mysql2";
import { universalResponse } from "user/types/universalResponse";
const { pool } = require("../../../mysqlSetup");

export const getPayMethodsReport = async ( pharmacy_id: number): Promise<universalResponse> => {    
    try {
        const connection: RowDataPacket = await pool.getConnection();

        var [res] = await connection.query(`
            SELECT
                s.sale_id,
                s.sale_date,
                s.total_price,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'payment_method', sp.payment_method,
                        'amount', sp.amount
                    )
                ) AS payment_methods
            FROM
                sales s
            JOIN
                sale_payments sp ON s.sale_id = sp.sale_id
            WHERE pharmacy_id = ?
            GROUP BY
                s.sale_id, s.sale_date, s.total_price;
        `, [pharmacy_id]);

        connection.release();

        return {
            success: true,
            msg: `Payment methods Report`,
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
    getPayMethodsReport,
}