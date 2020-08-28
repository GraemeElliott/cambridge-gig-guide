const Gig = require('../models/gigModel'),
      catchAsync = require('../utilities/catchAsync'),
      moment = require("moment"),
      nodemailer = require('nodemailer');

exports.getAllGigs = catchAsync(async (req, res, next) => {
  const gigs = await Gig.find();

  const date = new Date(), y = date.getFullYear(), m = date.getMonth();
  const startDate = new Date();
  const endDate = new Date(y, m + 3, 0);
  
  const gigDataFiltered = gigs.filter(function (gig) {
    var gigDate = new Date(gig.date)
    return (gigDate >= startDate && gigDate <= endDate)
  });
          
  const upcommingGigs = gigDataFiltered.sort((a, b) => {
    return Date.parse(new Date(a.date)) - Date.parse(new Date(b.date));
  }).slice (0, 6);

  const newlyReleasedSorted = gigs.sort((a, b) => {
    return Date.parse(new Date(a.dateAdded)) - Date.parse(new Date(b.dateAdded));
  }).reverse();

  const newlyReleasedGigs = newlyReleasedSorted.slice(0, 6);

  res.render('index', {gigs: gigs, moment: moment, upcommingGigs:upcommingGigs, newlyReleasedGigs:newlyReleasedGigs})
});

exports.contactUs = catchAsync(async (req, res, next) => {
  res.render('index/contact')
});

exports.contactFormSubmit = async (req, res,) => {
  const output = `

  <html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
    <xml>
      <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
<style type="text/css">
  body {width: 600px;margin: 0 auto;}
  table {border-collapse: collapse;}
  table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
  img {-ms-interpolation-mode: bicubic;}
</style>
<![endif]-->
    <style type="text/css">
  body, p, div {
    font-family: arial,helvetica,sans-serif;
    font-size: 14px;
  }
  body {
    color: #000000;
  }
  body a {
    color: #1188E6;
    text-decoration: none;
  }
  p { margin: 0; padding: 0; }
  table.wrapper {
    width:100% !important;
    table-layout: fixed;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
  }
  img.max-width {
    max-width: 100% !important;
  }
  .column.of-2 {
    width: 50%;
  }
  .column.of-3 {
    width: 33.333%;
  }
  .column.of-4 {
    width: 25%;
  }
  @media screen and (max-width:480px) {
    .preheader .rightColumnContent,
    .footer .rightColumnContent {
      text-align: left !important;
    }
    .preheader .rightColumnContent div,
    .preheader .rightColumnContent span,
    .footer .rightColumnContent div,
    .footer .rightColumnContent span {
      text-align: left !important;
    }
    .preheader .rightColumnContent,
    .preheader .leftColumnContent {
      font-size: 80% !important;
      padding: 5px 0;
    }
    table.wrapper-mobile {
      width: 100% !important;
      table-layout: fixed;
    }
    img.max-width {
      height: auto !important;
      max-width: 100% !important;
    }
    a.bulletproof-button {
      display: block !important;
      width: auto !important;
      font-size: 80%;
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    .columns {
      width: 100% !important;
    }
    .column {
      display: block !important;
      width: 100% !important;
      padding-left: 0 !important;
      padding-right: 0 !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .social-icon-column {
      display: inline-block !important;
    }
  }
</style>
    <!--user entered Head Start--><!--End Head user entered-->
  </head>
  <body>
    <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:arial,helvetica,sans-serif; color:#000000; background-color:#FFFFFF;">
      <div class="webkit">
        <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#FFFFFF">
          <tr>
            <td valign="top" bgcolor="#FFFFFF" width="100%">
              <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td width="100%">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <!--[if mso]>
  <center>
  <table><tr><td width="600">
<![endif]-->
                                  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                    <tr>
                                      <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
  <tr>
    <td role="module-content">
      <p></p>
    </td>
  </tr>
</table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="f50465f3-9f1e-49eb-8c14-3f81de12a909">
  <tbody>
    <tr>
      <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
      </td>
    </tr>
  </tbody>
</table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="5ebd6804-3a84-4479-81df-4465ac19de9e">
  <tbody>
    <tr>
      <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
        <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:75% !important; width:75%; height:auto !important;" width="450" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/f853ccbd9d1e74e0/dfd16980-675e-4dcb-a424-58f1692d912d/449x194.png">
      </td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="bcd7b7bd-21f5-43e8-82b0-efe681df468d" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:18px 0px 18px 0px; line-height:40px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h1 style="text-align: center"><strong>New Message Received</strong></h1><div></div></div></td>
    </tr>
  </tbody>
</table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="25f631a2-71ab-44cf-bc7c-9beea1507a19" data-mc-module-version="2019-10-22">
  <tbody>
    <tr>
      <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit">A new message has been received through the Cambridge Gig Guide contact form. Please find the details below:</div>
<div style="font-family: inherit; text-align: inherit"><br></div>
<div style="font-family: inherit; text-align: inherit">From: ${req.body.firstName} ${req.body.lastName}</div>
<div style="font-family: inherit; text-align: inherit">Email: ${req.body.email}</div>
<div style="font-family: inherit; text-align: inherit">Subject: ${req.body.query}</div>
<div style="font-family: inherit; text-align: inherit"><br></div>
<div style="font-family: inherit; text-align: inherit">${req.body.message}</div><div></div></div></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <!--[if mso]>
                                </td>
                              </tr>
                            </table>
                          </center>
                          <![endif]-->
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </center>
  </body>
</html>`;

  let transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
        user: process.env.SENDGRID_USERNAME,
        pass: process.env.SENDGRID_PASSWORD
    },
    tls: {
      rejectUnauthorised:false
    }
  });

  let mailOptions = {
    from: `Cambridge Gig Guide Admin <${process.env.EMAIL_FROM}>`,
    to: `Cambridge Gig Guide Admin <${process.env.EMAIL_FROM}>`,
    subject: 'Cambridge Gig Guide: New message received',
    text: "Message",
    html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      return console.log(error)
    }

    req.flash("success", "Thank you for getting in touch. We will respond ASAP.")
    res.redirect('/contact-us')
  });
};