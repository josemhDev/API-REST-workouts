const dbWorkouts = require("../database/workouts");
const { v4: uuid } = require("uuid");

const getAllWorkouts = async (filters) => {


    try {

        const allWorkouts = await dbWorkouts.getAllWorkouts(filters);
        return allWorkouts;

    } catch (error) {

        throw error;

    }
}



const getOneWorkout = async (id) => {

    try {


        const workoutByid = await dbWorkouts.getOneWorkout(id);
        return workoutByid;

    } catch (error) {

        throw error;

    }
}


const createNewWorkout = async (workout) => {



    try {

        const id = uuid();

        const newWorkout = {
            ...workout,
            createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
            updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),

        };

        await dbWorkouts.createNewWorkout(id, newWorkout);

    } catch (error) {

        throw error;

    }
}


const updatedWorkout = async (id,changes) => {

    try {

        await dbWorkouts.updateWorkout(id,changes);
        
    } catch (error) {

        throw error;
        
    }


}

const deleteWorkoutById = async (id) => {

    try {

        await dbWorkouts.deleteWorkoutById(id);
        
    } catch (error) {

        throw error
        
    }
}


module.exports = {
    getAllWorkouts,
    getOneWorkout,
    createNewWorkout,
    updatedWorkout,
    deleteWorkoutById
}