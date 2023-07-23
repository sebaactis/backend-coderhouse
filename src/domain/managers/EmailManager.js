import nodemailer from "nodemailer";
import { resolve } from 'path';
import fs from "fs";
import Handlebars from 'handlebars';
import { generateToken } from "../../utils/index.js";

class EmailManager {
    constructor() {
        this.smtp_config = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false
        };
    }

    async send(templateFile, email) {
        const transporter = nodemailer.createTransport(this.smtp_config);

        const token = await generateToken(email);

        console.log(token);
        const link = `http://localhost:8081/api/password/updatePassword?token=${token}&email=${email}`;

        const templatePath = resolve(`src/presentation/templates/${templateFile}`);
        const source = fs.readFileSync(templatePath).toString();
        const template = Handlebars.compile(source);
        const html = template({
            email,
            link
        });

        const mailOptions = {
            from: '"Forgot Password" <from@forgospassword.com>',
            to: email,
            subject: '',
            html
        };

        await transporter.sendMail(mailOptions);

        return { email, token }

    }
}

export default EmailManager;