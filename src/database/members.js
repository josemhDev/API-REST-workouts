
const {pool} = require('./conection');







const getAllMembers = async (filters) => {

    try {

        let query = 'SELECT * FROM members';



        if (filters.gender) {
            query += ` WHERE data->'gender' = '"${filters.gender}"'`;
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


const createNewMember = async (id, member) => {

    try {

        const alreadyExists = await pool.query('SELECT * FROM members WHERE id = $1;', [id]);

        if(alreadyExists.rows.length != 0){

            throw{
                status: 400,
                message: `Member with the same id already exists, can't be added`
            }
        }

        const dbResponse = await pool.query("INSERT INTO members VALUES ($1,$2);", [id, member]);
        

        
    } catch (error) {

        throw {status: 500, message: error?.message || error};
        
    }


}


const updateMember = async (id, changes) => {

    try {

        const dbResponse = await pool.query('SELECT data FROM members WHERE id = $1;', [id]);

        if (dbResponse.rows.length > 0) {

            const memberToChange = dbResponse.rows[0].data;

            const updatedMember = {

                ...memberToChange,
                ...changes,

            };


            await pool.query('UPDATE members SET data = $1 WHERE id = $2;', [updatedMember, id]);

        } else {

            throw {
                status: 400,
                message: `Member id can't be found`
            }

        }



    } catch (error) {

        throw { status: 500, message: error?.message || error };

    }

}


const deleteMemberById = async (id) => {

    try {

        const dbResponse = await pool.query('SELECT * FROM members WHERE id = $1;', [id]);

        if (dbResponse.rows.length > 0) {

            await pool.query('DELETE FROM members WHERE id = $1;', [id]);

        } else {
            throw {
                status: 400,
                message: `Member id can't be found`
            }
        }

    } catch (error) {

        throw { status: 500, message: error?.message || error };

    }
}


const getOneMember = async (id) => {

    try {

        const dbResponse = await pool.query('SELECT * FROM members WHERE id = $1;', [id]);
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


module.exports= {
    createNewMember,
    getAllMembers,
    updateMember,
    deleteMemberById,
    getOneMember
}