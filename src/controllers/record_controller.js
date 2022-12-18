const recordService = require('../services/record_service');




const getRecords = async (req, res) => {


    const filters =  {
        limit,
    } = req.query;

    

    try {


        const allRecords = await recordService.getAllRecords(filters);
        res.status(200).send(allRecords);

    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });
    }
}

const getRecordById = async (req, res) => {


    try {

        const recordByid = await recordService.getOneRecord(req.params.id);

        res.send({ status: 'Ok', data: recordByid });

    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });

    }

}






const createRecord = async (req, res) => {

    const newRecord = req.body;

    if (!newRecord.workout || !newRecord.record) {
        res.status(400).send({
            status: "Failed",
            data: {
                error: "Some of the expected keys are missing"
            }
        });
        return
    }

    const recordToInsert = {
        workout: newRecord.workout,
        record: newRecord.record
    };


    try {

        await recordService.createNewRecord(recordToInsert);
        res.status(201).send({ status: 'ok' });


    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });

    }


}


const deleteRecordById = async (req, res) => {


    try {

        const id = req.params.id;

        await recordService.deleteRecordById(id);

        res.send({status: 'Ok', data: 'The record was deleted successfully'});
        
    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });
        
    }



}


const updateRecord = async (req, res) => {



    try {

        const id = req.params.id;
        const changes = req.body;

        await recordService.updateRecord(id,changes);

        res.send({ status: 'Ok', data: 'The record was updated successfully' });

    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });

    }



}


module.exports = {
    createRecord,
    getRecords,
    getRecordById,
    deleteRecordById,
    updateRecord
}