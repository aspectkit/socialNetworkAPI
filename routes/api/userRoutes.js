const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    removeUser,
    addFriend,
    deleteFriend
} = require('../../controllers/userController');


router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser);

router.route('/:userId').put(updateUser);

router.route('/:userId').delete(removeUser);

router.route('/:userId/friends/:friendId').post(addFriend);

router.route('/:userId/friends/:friendId').delete(deleteFriend);

module.exports = router;