import { RowDataPacket } from "mysql2";
import { universalResponse } from "user/types/universalResponse";
import { RegisterPharmacyProps } from "./types";
const { pool } = require("../../mysqlSetup");

export const getStockDetails = async (user_id: number, pharmacy_id: number) => {
    try {
        const connection: RowDataPacket = await pool.getConnection();

            var [res] = await connection.query(`
                SELECT medicine_list.medicine_name, stock.*
                FROM medicine_list
                JOIN stock ON medicine_list.medicine_id = stock.medicine_id
                WHERE medicine_list.pharmacy_id = ?;
            `, [pharmacy_id]);
                
        connection.release();

        return {
            success: true,
            msg: `Stock details`,
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

export const updateStockDetails = async (newStockDetails: {totalStock: number, medicine_id: number}) => {
    const {totalStock, medicine_id} = newStockDetails;

    try {
        const connection: RowDataPacket = await pool.getConnection();

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
            return { err: true, success: false, msg: error.sqlMessage };
        } else {
            return { err: true, success: false, msg: error.message };
        }
    }
};

module.exports = {
    getStockDetails,
    updateStockDetails
}