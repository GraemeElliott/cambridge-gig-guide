const User = require('../models/userModel'),
      Gig = require('../models/gigModel'),
      Venue = require('../models/venueModel'),
      catchAsync = require('../utilities/catchAsync'),
      passport = require('passport'),
      moment = require('moment')
      nodemailer = require('nodemailer'),
      async = require('async'),
      crypto = require('crypto');


// REGISTER
exports.registerForm = async (req, res) => {
  res.render('index/register');
};

exports.register = catchAsync(async (req, res, next) => {
  const newUser = new User(
    {firstName: req.body.firstName,
    lastName: req.body.lastName, 
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });
  User.register(newUser, req.body.password, (error, user) => {
    if (error) {
      req.flash("error", "Registration unsuccessful");
      return res.render('index/register');
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/users/' + user.username);
    });
  });
});

//LOGIN / LOGOUT
exports.loginForm = async (req, res) => {
  res.render('index/login');
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }

    if (!user) { return req.flash("error", "Incorrect username and/or password"), res.redirect('/login'); }

    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return req.flash("success", "Successfully logged in"), res.redirect('/users/' + user.username);
    });
  })(req, res, next);
};

exports.logout = async (req, res) => {
    req.logout();
    req.flash("success", "You have successfully logged out")
    res.redirect('/');
  };

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You must be logged in to do that")
  res.redirect('/login');
});

// USER PROFILE
exports.userProfile = catchAsync(async (req, res) => {

  User.findOne({ username: req.params.id}, function (err, foundUser) {
    if (err) {
      res.redirect('back');
    }

    Gig.find().where('author.id').equals(foundUser._id).exec(function(err, gigs) {

      const sortedGigs = gigs.sort((a, b) => {
        return Date.parse(new Date(a.date)) - Date.parse(new Date(b.date));
      });
      
      res.render('users/user-profile', {user: foundUser, moment:moment, sortedGigs:sortedGigs})
    });
    }
  )
});

// CHECK OWNERSHIP
exports.checkGigOwnership = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    await Gig.findOne({ nameForUrl: req.params.id }, 
      (error, editGig) => {
        if (error) {
          req.flash("error", "Gig does not exist")
          res.redirect('back')
        } else {
          if (editGig.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You don't have permission to do that")
            res.redirect('back');
          };          
        };
    });
  } else {
    req.flash("error", "You must be logged in to do that")
    res.redirect('back');
  };
});

exports.checkVenueOwnership = catchAsync(async (req, res, next) => {
  if (req.isAuthenticated()) {
    await Venue.findOne({ nameForUrl: req.params.id }, 
      (error, editVenue) => {
        if (error) {
          req.flash("error", "Venue does not exist")
          res.redirect('back')
        } else {
          if (editVenue.author.id.equals(req.user._id)) {
            next();
          } else {
            req.flash("error", "You don't have permission to do that")
            res.redirect('back');
          };          
        };
    });
  } else {
    req.flash("error", "You must be logged in to do that")
    res.redirect('back');
  };
});

exports.forgotPassword = async(req, res) => {
  res.render('index/password-reset');
};

exports.passwordResetEmail = async(req, res, next) => {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(error, buf) {
        var token = buf.toString('hex');
        done(error, token);
      });
    },
    function (token, done) {
      User.findOne({ email: req.body.email }, function(error, user) {
        if (!user) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/password-reset');
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
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
          <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 25px;" valign="top" align="center">
            <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/f853ccbd9d1e74e0/dfd16980-675e-4dcb-a424-58f1692d912d/449x194.png">
          </td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="3de578e9-8b91-4b3f-aa97-223f100f4f88">
      <tbody>
        <tr>
          <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
          </td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d8d33787-f84a-42a6-a5c3-b4ef819f14bd">
      <tbody>
        <tr>
          <td style="padding:18px 0px 18px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-weight: bold; font-family: helvetica, sans-serif; font-size: 36px">Password Reset</span>&nbsp;</div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="d540492c-c591-45c6-a4ce-83bf9237c2a6" data-mc-module-version="2019-10-22">
      <tbody>
        <tr>
          <td style="padding:18px 1px 6px 20px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: inherit"><span style="font-family: helvetica, sans-serif; font-size: 16px">Hi there ${user.firstName} ${user.lastName},</span></div>
  <div style="font-family: inherit; text-align: inherit"><br></div>
  <div style="font-family: inherit; text-align: inherit"><span style="font-family: helvetica, sans-serif; font-size: 16px">You are receiving this email because you (or somebody else) have requested your password to be changed. Please click on the link below to reset your password:</span></div>
  <div style="font-family: inherit; text-align: inherit"><br></div>
  <div style="font-family: inherit; text-align: inherit"><span style="font-family: helvetica, sans-serif; font-size: 16px">https://cambridge-gig-guide.herokuapp.com/reset/${token}</span></div>
  <div style="font-family: inherit; text-align: inherit"><br></div>
  <div style="font-family: inherit; text-align: inherit"><span style="font-family: helvetica, sans-serif; font-size: 16px">If you did not request this change, please ignore this email and your password will remain unchanged.</span></div>
  <div style="font-family: inherit; text-align: inherit"><br></div>
  <div style="font-family: inherit; text-align: inherit"><span style="font-family: helvetica, sans-serif; font-size: 16px">Regards,</span></div>
  <div style="font-family: inherit; text-align: inherit"><br></div>
  <div style="font-family: inherit; text-align: inherit"><span style="font-family: helvetica, sans-serif; font-size: 16px">Cambridge Gig Guide Team</span></div>
  <div style="font-family: inherit; text-align: inherit"><a href="https://cambridge-gig-guide.herokuapp.com/"><span style="font-family: helvetica, sans-serif; font-size: 16px">https://cambridge-gig-guide.herokuapp.com/</span></a>&nbsp;</div><div></div></div></td>
        </tr>
      </tbody>
    </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="bdcdfeb2-0957-48cc-be7a-6b68391e16c6">
      <tbody>
        <tr>
          <td style="padding:0px 0px 40px 0px;" role="module-content" bgcolor="">
          </td>
        </tr>
      </tbody>
    </table></td>
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
    </html>
    `;
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

      var mailOptions = {
        to: user.email,
        from: `Cambridge Gig Guide Admin <${process.env.EMAIL_FROM}>`,
        subject: 'Cambridge Gig Guide - Password Reset',
        text: 'Message',
        html: output
      };

      transporter.sendMail(mailOptions, (error) => {
        if(error) {
          res.redirect('/forgot');
          next();
        }
        req.flash('success', 'An email has been sent to ' + user.email + ' with further instructions.');
        res.redirect('/password-reset');
      });
    }
  ])};

  exports.passwordResetForm = async (req, res) => {
    User.findOne({ 
      resetPasswordToken: req.params.token }, function(error, user) {
      if (!user) {
        req.flash('error', 'Password reset token is invalid or has expired.');
        return res.redirect('/password-reset');
      }
      res.render('index/password-reset-form', {token: req.params.token});
    });
  };
  
  exports.passwordReset = async (req, res) => {
    async.waterfall([
      function(done) {
        User.findOne({ 
          resetPasswordToken: req.params.token }, function(error, user) {
          if (!user) {
            req.flash('error', 'Password reset token is invalid or has expired.');
            return res.redirect('back');
          }
          if(req.body.password === req.body.passwordConfirmation) {
            user.setPassword(req.body.password, function(error) {

              user.resetPasswordToken = undefined;
              user.resetPasswordExpires = undefined;
  
              user.save(function(error) {
                req.logIn(user, function(err) {
                  if (err) { return next(err); }
                  return req.flash("success", "Your password has been reset"), res.redirect('/users/' + user.username);
                });
              });
            })
          } else {
              req.flash("error", "Passwords do not match.");
              return res.redirect('back');
          }
        });
      },
  ])};

  