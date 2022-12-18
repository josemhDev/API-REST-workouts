const memberService = require('../services/member_service');






const getMembers = async (req, res) => {


    const filters =  {
        gender,
        limit
    } = req.query;

    

    try {

        const allMembers = await memberService.getAllMembers(filters);
        res.status(200).send(allMembers);

    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });
    }
}



const createMember = async (req, res) => {

    const newMember = req.body;

    if (!newMember.name || !newMember.gender || !newMember.dateOfBirth || !newMember.email || !newMember.password) {
        res.status(400).send({
            status: "Failed",
            data: {
                error: "Some of the expected keys are missing"
            }
        });
        return
    }

    const memberToInsert = {
        name: newMember.name,
        gender: newMember.gender,
        dateOfBirth: newMember.dateOfBirth,
        email: newMember.email,
        password: newMember.password
    };


    try {

        await memberService.createNewMember(memberToInsert);
        res.status(201).send({ status: 'ok' });


    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });

    }


}



const updateMember = async (req, res) => {



    try {

        const id = req.params.id;
        const changes = req.body;

        await memberService.updateMember(id,changes);

        res.send({ status: 'Ok', data: 'The member was updated successfully' });

    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });

    }



}


const deleteMemberById = async (req, res) => {


    try {

        const id = req.params.id;

        await memberService.deleteWorkoutById(id);

        res.send({status: 'Ok', data: 'The member was deleted successfully'});
        
    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });
        
    }



}


const getMemberById = async (req, res) => {


    try {


        const memberByid = await memberService.getOneMember(req.params.id);

        res.send({ status: 'Ok', data: memberByid });

    } catch (error) {

        res.status(error?.status || 500).send({ status: "Failed", data: { error: error?.message || error } });

    }

}


module.exports = {

    createMember,
    getMembers,
    updateMember,
    deleteMemberById,
    getMemberById
}