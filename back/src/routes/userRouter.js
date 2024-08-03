const {Router} = require('express')
const userRouter = Router();

const { storeUser } = require('../controller/userController');

userRouter.post('/store/user', storeUser);
// userRouter.get('/get/user', getUser);


module.exports = userRouter;