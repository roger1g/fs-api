import dotenv from "dotenv";
import nodeMailer from "nodemailer";

dotenv.config();

const transporter = nodeMailer.createTransport({
	service: "gmail",
	secure:true,
	auth: {
		user: process.env.TEST_EMAIL_USER,
		pass: process.env.TEST_EMAIL_APP_PASSWORD,
	},
});

export const sendMailWithOptions = (
	to: string,
	subject: string,
	body: string
) => {
	const mailOptions = {
		to: to,
		subject: subject,
		text: body,
	};
	// console.log(transporter)
	console.log(process.env.TEST_EMAIL_USER);
	console.log(process.env.TEST_EMAIL_APP_PASSWORD);
	return new Promise((resolve, rejects) => {
		console.log(`inside the promise logic`)
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.error(
					`Exception happened inside the node mailer module, sendMailWithOptions function`
				);
				console.error(error);
				rejects(error);
			} else {
				console.log(`Receipt accepted ` + info.accepted);
				console.log(`Response code ` + info.response);
				resolve(info);
			}
		});
	});
};
