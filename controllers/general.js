import nodemailer from 'nodemailer';

export const sendEmail = function (req, res) {
    const { name, email, subject, message } = req.body;

    // Configuring the nodemailer transporter
    const transporter = nodemailer.createTransport({
        // service: 'gmail',
        // auth: {
        //     user: 'frenchfests@gmail.com',
        //     pass: 'D&ferlantes2023'
        // }


        // A configurer
    });

    // Configuring the email message
    const mailOptions = {
        from: email,
        to: 'frenchfests@gmail.com',
        subject: subject,
        text: `From: ${name} (${email})\n\n${message}`
    };

    // Sending the email using the transporter and mail options
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error: Could not send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
}