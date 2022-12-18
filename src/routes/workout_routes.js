const { Router } = require('express');
const router = Router();
const workoutsController = require('../controllers/workout_controller');
const membersController = require('../controllers/member_controller');
const recordController = require('../controllers/record_controller');


//Workouts Routes


router.get('/workouts', workoutsController.getWorkouts);

router.get('/workouts/:id', workoutsController.getWorkoutById )

router.post('/workouts', workoutsController.createWorkout);

router.delete('/workouts/:id', workoutsController.deleteWorkoutById);

router.patch('/workouts/:id', workoutsController.updateworkout);


//Members Routes


router.post('/members', membersController.createMember);

router.get('/members', membersController.getMembers);

router.patch('/members/:id', membersController.updateMember);

router.delete('/members/:id', membersController.deleteMemberById);

router.get('/members/:id', membersController.getMemberById);


//Records Routes


router.post('/records', recordController.createRecord );

router.get('/records', recordController.getRecords);

router.get('/records/:id', recordController.getRecordById);

router.delete('/records/:id', recordController.deleteRecordById);

router.patch('/records/:id', recordController.updateRecord);













module.exports = router