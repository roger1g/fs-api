import express, { Router } from "express";
import customerController from "../controller/customer.controller";
import {
	customerProfileValidationMiddleware,
	customerProfileValidationErrorHandler,
	validateCustomerPhoneNumber,
} from "../middleware/customerValidation.middleware";

const route = express.Router();

route.post(
	"/submittingCustomerProfile",
    // // One day if the 
	// validateCustomerPhoneNumber,   
	customerProfileValidationMiddleware,
	customerProfileValidationErrorHandler,
	customerController.customerProfileCreation
);

route.post(
	"/customerContactMessage",
	customerController.customerContactMessage
)


export { route as customerRoute };
