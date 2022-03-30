import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import * as handlebars from "handlebars";
import * as path from 'path';;
import * as fs from "fs";
import PdfUtil from "./pdf/pdfUtil";

export default class EmailUtil {
    fromEmail: string;
    transporter: Mail;

    constructor(){
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: "testing.tec.aguilarluisdi@gmail.com",
                pass: "2018147110"
            }
        });
        this.fromEmail = "testing.tec.aguilarluisdi@gmail.com";
    }

    async sendEmail(toAddress: string, subject: string, content: any ){
        const compiledTemplate = handlebars.compile(fs.readFileSync(path.join(__dirname,"email", "email.handlebars"),"utf8"));
        return await this.transporter.sendMail({
            from: this.fromEmail,
            to: toAddress,
            subject: subject,
            html: compiledTemplate(content)
        });
    }

    async sendBilling(pBody : any){
        const pdfcontroller = new PdfUtil();
        pdfcontroller.createPdf(pBody);
        return await this.transporter.sendMail({
            from: this.fromEmail,
            to: pBody.toAddress,
            subject: "Factura Cinepolis",
            html: "<h3>Adjuntamos el pdf de tu compra, no olvides presentarlo antes de la pelicula</h3>",
            attachments: [
                {
                    filename: "Factura_Compras",
                    path: "/pdf/test.pdf"
                }
            ]
        });
        
    }
}