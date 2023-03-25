const{body,validationResult} =require("express-validator")

const signupValidator = [body("user.userName").isString().isLength({ min: 5 ,max:20 }),body("user.email").isEmail().withMessage("email must be email").isLength({ min: 5 }).withMessage("must be at least 5 chars long"),body("user.password").isString().isLength({ min: 5 })]
const signinValidator = [body("user.email").isEmail().withMessage("email must be email").isLength({ min: 5 }).withMessage("must be at least 5 chars long"),body("user.password").isString().isLength({ min: 5 }).withMessage("must be at least 5 chars long")]
const taskValidator = [body("task.taskName").isString().isLength({ min: 5 }),body("task.complete").isBoolean()]

const validat = (req, res,next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next()
}
module.exports={signupValidator,
    signinValidator,
    taskValidator,
    validat,}