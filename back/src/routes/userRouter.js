const {Router} = require('express')
const userRouter = Router();

const { storeUser } = require('../controller/userController');

userRouter.post('/store/user', storeUser);

module.exports = userRouter;