import nodemailer from "nodemailer";
import { resolve } from 'path';
import fs from "fs";
import Handlebars from 'handlebars';

class EmailManager
{
    constructor()
    {
        this.smtp_config = {
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false
        };
    }

    async send(templateFile, username, token)
    {
        const transporter = nodemailer.createTransport(this.smtp_config);

        const templatePath = resolve(`src/presentation/templates/${templateFile}`);
        const source = fs.readFileSync(templatePath).toString();
        const template = Handlebars.compile(source);
        const html = template({
            username,
            token
        });

        const mailOptions = {
            from: '"Forgot Password" <from@forgospassword.com>',
            to:  username,
            subject: '',
            html
        };

        await transporter.sendMail(mailOptions);

        return {username, token}

    }
}

export default EmailManager;