const workoutService = require('../services/workout_service')


const getWorkouts = async (req, res) => {


    const filters =  {
        mode,
        limit,
        equipment
    } = req.query;

    

    try {


        const allWorkouts = await workoutService.getAllWorkouts(filters);
        res.status(200).send(allWorkouts);

    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });
    }
}



const getWorkoutById = async (req, res) => {


    try {


        const workoutByid = await workoutService.getOneWorkout(req.params.id);

        res.send({ status: 'Ok', data: workoutByid });

    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });

    }

}




const updateworkout = async (req, res) => {



    try {

        const id = req.params.id;
        const changes = req.body;

        await workoutService.updatedWorkout(id, changes);

        res.send({ status: 'Ok', data: 'The workout was updated successfully' });

    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });


    }



}



const deleteWorkoutById = async (req, res) => {


    try {

        const id = req.params.id;

        await workoutService.deleteWorkoutById(id);

        res.send({status: 'Ok', data: 'The workout was deleted successfully'});
        
    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });
        
    }



}

const createWorkout = async (req, res) => {

    const newWorkout = req.body;

    if (!newWorkout.name || !newWorkout.mode || !newWorkout.equipment || !newWorkout.exercises) {
        res.status(400).send({
            status: "Failed",
            data: {
                error: "Some of the expected keys are missing"
            }
        });
        return
    }

    const workoutToInsert = {
        name: newWorkout.name,
        mode: newWorkout.mode,
        equipment: newWorkout.equipment,
        exercises: newWorkout.exercises,
        trainerTips: newWorkout.trainerTips
    };


    try {

        await workoutService.createNewWorkout(workoutToInsert);
        res.status(201).send({ status: 'ok' });


    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });

    }


}

module.exports = {
    getWorkouts,
    createWorkout,
    getWorkoutById,
    deleteWorkoutById,
    updateworkout,
}