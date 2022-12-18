


const {pool} = require('./conection');


const createNewRecord = async (id, record) => {

    try {

        const alreadyExists = await pool.query('SELECT * FROM records WHERE id = $1;', [id]);

        if (alreadyExists.rows.length != 0) {

            throw {
                status: 400,
                message: `Record with the same id already exists, can't be added`
            }
        }

        const {
            workout
        } = record;
        

        const workoutExists = await pool.query(`SELECT * FROM workouts WHERE id = $1;`,[workout]);

        if (workoutExists.rows.length == 0) {

            throw {
                status: 400,
                message: `Workout id not found`
            }
        }

        await pool.query("INSERT INTO records VALUES ($1,$2);", [id, record]);


    } catch (error) {

        throw { status: 500, message: error?.message || error };

    }


}

const getOneRecord = async (id) => {

    try {

        const dbResponse = await pool.query('SELECT * FROM records WHERE id = $1;', [id]);
        if (dbResponse.rows.length == 0) {
            throw {
                status: 400,
                message: `Record ${id} not found`
            };

        }


        return dbResponse.rows;

    } catch (error) {

        throw { status: 500, message: error?.message || error };

    }
}

const deleteRecordById = async (id) => {

    try {

        const dbResponse = await pool.query('SELECT * FROM records WHERE id = $1;', [id]);

        if (dbResponse.rows.length > 0) {

            await pool.query('DELETE FROM records WHERE id = $1;', [id]);

        } else {
            throw {
                status: 400,
                message: `Record id can't be found`
            }
        }

    } catch (error) {

        throw { status: 500, message: error?.message || error };

    }
}


const getAllRecords = async (filters) => {


    try {

        let query = 'SELECT * FROM records';



        if (filters.limit) {
            query += ` LIMIT ${filters.limit}`;
            
        }


        const dbResponse = await pool.query(query);
        const allRecords = dbResponse.rows;

        return allRecords;



    } catch (error) {

        throw { status: 500, message: error }

    }
}


const updateRecord = async (id, changes) => {

    try {

        const dbResponse = await pool.query('SELECT data FROM records WHERE id = $1;', [id]);

        if (dbResponse.rows.length > 0) {


            const recordToChange = dbResponse.rows[0].data;

            const updatedRecord = {

                ...recordToChange,
                ...changes,

            };


            await pool.query('UPDATE records SET data = $1 WHERE id = $2;', [updatedRecord, id]);

        } else {

            throw {
                status: 400,
                message: `Record id can't be found`
            }

        }



    } catch (error) {

        throw { status: 500, message: error?.message || error };

    }

}


module.exports = {
    createNewRecord,
    getAllRecords,
    getOneRecord,
    deleteRecordById,
    updateRecord

}