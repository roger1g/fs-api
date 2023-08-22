import { Request, Response, raw } from "express";
import { getOneMonthRange, getDateStringByDuration } from "../util/misc";
import { I_Customer } from "../models/customers.model";
import { customerModel } from "../models/customers.model";
import { sendMailWithOptions } from "../service/nodeMailler.global.service";
import axios from 'axios';
import * as dotenv from "dotenv";

dotenv.config();
const customerProfileCreation = async (req: Request, res: Response) => {
	// step 0 , midware already validate the information from the customer
	// If it is not matching, req already got bounced with status code 400.
	const { body: rawData } = req;
	try {
		let resultObject;
		// This work inside the HTTPS server is moved to our HTTP server	
		// HTTPS server is like a wrapper around the HTTP server because the front end could not directly make request to the HTTP server.
		// 1. clean the data and make the fields consistent
		// const cleanedData = __cleanRawData(rawData);
		// 2. save it inside the DB.
		// try {
		// 	await customerModel.create(cleanedData);
		// 	savedDBResult = true;
		// } catch (error) {
		// 	console.error(
		// 		`The record below was not saved into DB. Exception happened during the persisting stage.`
		// 	);
		// 	console.error(cleanedData);
		// 	console.error(`Exception detail is below.`);
		// 	console.error(error);
		// }
		try {
		// Forward the request from the Cyclic server to the HTTP server.
		// Literally making cyclic server as a HTTP adaptor.  
			const httpResponse = await __sendEmailToSales(rawData);
			resultObject = httpResponse;
		} catch (error) {
			console.error(
				`The record below was not sent to sales team. Exception happened inside the node mailler.`
			);
			console.error(rawData);
			console.error(`Exception detail is below.`);
			console.error(error);
			resultObject = error
		}
		res.status(201).json(resultObject);
	} catch (error) {
		res.status(400).json({
			dbResult: false,
			emailResult: false,
		});
	}
};

const __cleanRawData = (rawData: I_Customer) => {
	let result: I_Customer = {
		companyName: rawData.companyName.toUpperCase(),
		postalCode: rawData.postalCode.toUpperCase().replace(/[ -]/g, ""),
		firstName: rawData.firstName.toUpperCase(),
		lastName: rawData.lastName.toUpperCase(),
		phoneNumber: rawData.phoneNumber,
		email: rawData.email,
		businessAddress: rawData.businessAddress.toUpperCase(),
		city: rawData.city.toUpperCase(),
		province: rawData.province.toUpperCase(),
		country: rawData.country.toUpperCase(),
		referralSource: rawData.referralSource.toUpperCase(),
	};
	return result;
};

const __sendEmailToSales = async (rawData: I_Customer) => {
	try {
        const response = await axios.post(`${process.env['AWS_SERVER_URL']}`, rawData);
        // console.log(response);
        return response.data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
};

export default {
	customerProfileCreation,
};
