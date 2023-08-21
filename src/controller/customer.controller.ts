import { Request, Response, raw } from "express";
import { getOneMonthRange, getDateStringByDuration } from "../util/misc";
import { I_Customer } from "../models/customers.model";
import { customerModel } from "../models/customers.model";
import { sendMailWithOptions } from "../service/nodeMailler.global.service";

const customerProfileCreation = async (req: Request, res: Response) => {
  // step 0 , midware already validate the information from the customer
  // If it is not matching, req already got bounced with status code 400.
  const { body: rawData } = req;
  try {
    let savedDBResult = false;
    let emailSentResult = false;
    // 1. clean the data and make the fields consistent
    const cleanedData = __cleanRawData(rawData);
    // 2. save it inside the DB.
    try {
      await customerModel.create(cleanedData);
      savedDBResult = true;
    } catch (error) {
      console.error(
        `The record below was not saved into DB. Exception happened during the persisting stage.`
      );
      console.error(cleanedData);
      console.error(`Exception detail is below.`);
      console.error(error);
    }

    try {
      // 3. sending email result
      __sendEmailToSales(rawData);
      emailSentResult = true;
    } catch (error) {
      console.error(
        `The record below was not sent to sales team. Exception happened inside the node mailler.`
      );
      console.error(rawData);
      console.error(`Exception detail is below.`);
      console.error(error);
    }

    res.status(201).json({
      dbResult: savedDBResult,
      emailResult: emailSentResult,
    });
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
  // console.log(result)
  return result;
};

const __sendEmailToSales = async (rawData: I_Customer): Promise<boolean> => {
  let result = false;
  try {
    let body = "";
    for (const property in rawData) {
      // Part of me hates ts expressions
      body += `${property}: ${rawData[property as keyof I_Customer]}\n`;
    }
    sendMailWithOptions(rawData.email, "New Customer Application", body)
      .then((data) => {
        result = true;
      })
      .catch((err) => {
        result = false;
      });
  } catch (error) {
    console.error(
      `Exception happened inside the __sendEmailToSales(), Customer controller file.`
    );
    console.error(error);
    result = false;
  }
  return result;
};

export default {
  customerProfileCreation,
};