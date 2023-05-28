const router = require('express').Router();

const { updateProfileValidation } = require('../utils/validation/userValidation');

const { getMyUser, updateProfile } = require('../controllers/users');

router.get('/me', getMyUser);

router.patch('/me', updateProfileValidation, updateProfile);

module.exports = router;
