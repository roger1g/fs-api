import { celebrate, Joi, Segments } from "celebrate";
import { customerModel, I_Customer } from "../models/customers.model";
import { Request, Response, NextFunction } from "express";
import { CelebrateError } from "celebrate";
import { ValidationError } from "joi";

// const genErrorMessage = (label:string) =>({
//     "any.required": `${label} is required.`,
//     "string.empty": `${label} cannot be empty.`,
// })
const validateCustomerPhoneNumber = async (req:Request, res:Response, next:NextFunction)=>{
    const {phoneNumber} = req.body;
    const foundRecord = await customerModel.findOne({ phoneNumber:phoneNumber });
    if(foundRecord){
        return res.status(400).json({
            error: "Validation failed",
            messages: "Another application has been submitted under this phone number. Please do not submit the same application twice."
        });
    }

}

const validateCustomerProfileInputMiddleWare = celebrate(
	{
		[Segments.BODY]: Joi.object<I_Customer>().keys({
            companyName: Joi.string().required().messages({
				"string.empty": `Company name field can not be empty\n`,
				"any.required": `Company name field is required\n`,
			}),
			firstName: Joi.string().required().messages({
				"string.empty": `First name field can not be empty\n`,
				"any.required": `First name field is required\n`,
			}),
			lastName: Joi.string().required().messages({
				"string.empty": `Last name field can not be empty\n`,
				"any.required": `Last name field is required\n`,
			}),
			phoneNumber: Joi.string()
				.required()
				.pattern(/[2-9][0-9]{9}/)                
				.messages({
					"string.empty": `Phone number field can not be empty\n`,
					"any.required": `Phone number field is required\n`,
					"string.pattern.base": `Check your phone number field again. North American Phone number contains 10 digits. International area code is not required.\n`,
                }),
			email: Joi.string()
				.required()
				.email({
					multiple: false,
					tlds: false,
				})
				.messages({
					"string.empty": `Email field can not be empty\n`,
					"any.required": `Email field is required\n`,
					"string.pattern.base": `Check your email field again. It is not in a valid format.\n`,
				}),
			businessAddress: Joi.string().required().messages({
				"string.empty": `Business Address field can not be empty\n`,
				"any.required": `Business Address field is required\n`,
			}),
			// postal code regex pattern credits all go to https://stackoverflow.com/questions/15774555/efficient-regex-for-canadian-postal-code-function
			// Efficient, strict, and allows '-' ' ' for those kinds of users
			postalCode: Joi.string()
				.required()
				.pattern(
					/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
				)
				.messages({
					"string.empty": `Postal code can not be empty\n`,
					"any.required": `Postal code field is required\n`,
					"string.pattern.base": `Check your postal code field again. It is not a valid Canadian Postal Code.\n`,
				}),
			city: Joi.string().required().messages({
				"string.empty": `City field can not be empty\n`,
				"any.required": `City field is required\n`,
			}),
			province: Joi.string().required().messages({
				"string.empty": `Province field can not be empty\n`,
				"any.required": `province field is required\n`,
			}),
			country: Joi.string().required().messages({
				"string.empty": `Country field can not be empty\n`,
				"any.required": `Country field is required\n`,
			}),
			referralSource: Joi.string().required().messages({
				"string.empty": `Referral source field can not be empty\n`,
				"any.required": `Referral source is required\n`,
			}),
		}),
	},
	{
		abortEarly: false,
	}
);

const validateCustomerProfileInputErrorHandler = (
	err: CelebrateError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err) {
		// Customize your error response here
		//   console.log(err)
		let errorMessages: string = "";
		const errorDetailMap: Map<string, ValidationError> = err.details;
		errorDetailMap.forEach((val, key) => {
			// Pretty complicated struture of JOI
			// Keep this for you guys to figure out the structure.
			// console.log(val)
			// console.log(`_--------_`)
			// console.log(Object.keys(val))
			// console.log(typeof val)
			// console.log(`_--------_`)
			// console.log(val.details)
			errorMessages += val.message;
		});
		res.status(400).json({
			error: "Validation failed",
			messages: errorMessages,
		});
	} else {
		next();
	}
};

export {
	validateCustomerProfileInputMiddleWare as customerProfileValidationMiddleware,
	validateCustomerProfileInputErrorHandler as customerProfileValidationErrorHandler,
    validateCustomerPhoneNumber
};
