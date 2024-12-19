const {body,validationResult } = require("express-validator")


const userValidationRules = () => {
    return[
        body("name").notEmpty().withMessage("اسم المستخدم مطلوب"),
        body("email").notEmpty().withMessage("البريد الالكتروني مطلوب"),
        body("email").isEmail().withMessage("يجب ادخال صيغة البريد الالكتروني بشكل صحيح"),
        body("password").notEmpty().withMessage("كلمة المرور مطلوبة"),
        body("password").isLength({min:5}).withMessage("يجب الا تقل كلمة المرور عن 5 محارف"),
    ]
}

const validate = (req,res,next) => {

    const errors = validationResult(req)
    
    if (errors.isEmpty()) {
        return next()
    }
    return res.status(400).json({errors:errors.array() })
}

module.exports = {
    userValidationRules,
    validate
}