const { v4: uuid } = require("uuid");
const dbMembers = require("../database/members");



const getAllMembers = async (filters) => {


    try {

        const allMembers = await dbMembers.getAllMembers(filters);
        return allMembers;

    } catch (error) {

        throw error;

    }
}


const createNewMember = async (newMember) => {

    try {

        const id = uuid();


        await dbMembers.createNewMember(id,newMember);

    } catch (error) {

        throw error;

    }
}


const updateMember = async (id,changes) => {

    try {

        await dbMembers.updateMember(id,changes);
        
    } catch (error) {

        throw error;
        
    }


}


const deleteWorkoutById = async (id) => {

    try {

        await dbMembers.deleteMemberById(id);
        
    } catch (error) {

        throw error
        
    }
}


const getOneMember = async (id) => {

    try {


        const memberByid = await dbMembers.getOneMember(id);
        return memberByid;

    } catch (error) {

        throw error;

    }
}


module.exports = {
    createNewMember,
    getAllMembers,
    updateMember,
    deleteWorkoutById,
    getOneMember
}