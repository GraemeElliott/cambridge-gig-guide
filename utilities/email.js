const noemailer = require('nodemailer');



module.exports = class Email {
    constructor (user, url) {
        this.to = user.email;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.url = url;
        this.from = `Cambridge Gig Guide Admin <${process.env.EMAIL_FROM}>`;
    }

    createTransport() {
        
    }
};