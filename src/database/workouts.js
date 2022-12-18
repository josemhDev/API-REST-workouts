const {pool} = require('./conection');



const getAllWorkouts = async (filters) => {


    try {

        let query = 'SELECT * FROM workouts';
        let numWhereQueries = 0;


        if (filters.mode || filters.equipment) {

            query += ' WHERE ';

            if (filters.equipment) {
                query += ` data->'equipment' @> '["${filters.equipment}"]'::jsonb`;
                numWhereQueries++;
            }


            if (filters.mode) {

                if (numWhereQueries > 0) {
                    query += ' AND';
                }

                query += ` data->'mode' = '"${filters.mode}"'`;

            }

        }



        if (filters.limit) {
            query += ` LIMIT ${filters.limit}`;
            
        }



        const dbResponse = await pool.query(query);
        const allWorkouts = dbResponse.rows;

        return allWorkouts;



    } catch (error) {

        throw { status: 500, message: error }

    }
}



const getOneWorkout = async (id) => {

    try {

        const dbResponse = await pool.query('SELECT * FROM workouts WHERE id = $1;', [id]);
        if (dbResponse.rows.length == 0) {
            throw {
                status: 400,
                message: `Workout ${id} not found`
            };

        }


        return dbResponse.rows;

    } catch (error) {

        throw { status: 500, message: error?.message || error };

    }
}



const createNewWorkout = async (id, workout) => {

    try {

        const alreadyExists = await pool.query('SELECT * FROM workouts WHERE id = $1;', [id]);

        if (alreadyExists.rows.length != 0) {

            throw {
                status: 400,
                message: `Workout with the same id already exists, can't be added`
            }
        }

        const dbResponse = await pool.query("INSERT INTO workouts VALUES ($1,$2);", [id, workout]);
        


    } catch (error) {

        throw { status: 500, message: error?.message || error };

    }


}


const updateWorkout = async (id, changes) => {

    try {

        const dbResponse = await pool.query('SELECT data FROM workouts WHERE id = $1;', [id]);

        if (dbResponse.rows.length > 0) {

            const workoutToChange = dbResponse.rows[0].data;

            const updatedWorkout = {

                ...workoutToChange,
                ...changes,
                 updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),

            };


            await pool.query('UPDATE workouts SET data = $1 WHERE id = $2;', [updatedWorkout, id]);


        } else {

            throw {
                status: 400,
                message: `Workout id can't be found`
            }

        }



    } catch (error) {

        throw { status: 500, message: error?.message || error };

    }

}


const deleteWorkoutById = async (id) => {

    try {

        const dbResponse = await pool.query('SELECT * FROM workouts WHERE id = $1;', [id]);

        if (dbResponse.rows.length > 0) {

            await pool.query('DELETE FROM workouts WHERE id = $1;', [id]);

            await pool.query(`DELETE FROM records WHERE data->'workout' = '"${id}"';`);

        } else {
            throw {
                status: 400,
                message: `Workout id can't be found`
            }
        }

    } catch (error) {

        throw { status: 500, message: error?.message || error };

    }
}




module.exports = {

    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updateWorkout,
    deleteWorkoutById
}
