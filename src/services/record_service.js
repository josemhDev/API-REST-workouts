const dbRecords = require('../database/records');
const { v4: uuid } = require("uuid");



const createNewRecord = async (record) => {



    try {

        const id = uuid();

        const newRecord = {
            ...record,

        };

        await dbRecords.createNewRecord(id,newRecord)

    } catch (error) {

        throw error;

    }
}

const updateRecord = async (id,changes) => {

    try {

        await dbRecords.updateRecord(id,changes);
        
    } catch (error) {

        throw error;
        
    }


}


const getOneRecord = async (id) => {

    try {


        const recordByid = await dbRecords.getOneRecord(id);
        return recordByid;

    } catch (error) {

        throw error;

    }
}

const deleteRecordById = async (id) => {

    try {

        await dbRecords.deleteRecordById(id)
        
    } catch (error) {

        throw error
        
    }
}



const getAllRecords = async (filters) => {


    try {

        const allRecords = await dbRecords.getAllRecords(filters)
        return allRecords;

    } catch (error) {

        throw error;

    }
}


module.exports = {
    createNewRecord,
    getAllRecords,
    getOneRecord,
    deleteRecordById,
    updateRecord

}