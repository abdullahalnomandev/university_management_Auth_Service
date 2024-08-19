import nodemailer from 'nodemailer';
import config from '../../../config';

export const sendEmail = async (to: string , html :string) =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: config.SMTP_EMIAL,
          pass:  config.SMTP_PASSWORD,
        },
      });

      
    const info = await transporter.sendMail({
        from: config.SMTP_EMIAL, 
        to:"abdullahalnoman1512@gmail.com", 
        subject: "Reset Password Link",  
        html: html, 
      });
    
      console.log("Message sent: %s", info.messageId);

}