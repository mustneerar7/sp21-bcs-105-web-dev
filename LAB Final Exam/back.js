// Create a post route to login from the form
// app.post("/login",async (req, res) => {
//   const { email, password } = req.body;

//   console.log(req.body);

//   // get user from database
//   const user = await User.findOne({ email });

//   // check if user exists
//   if (!user) {
//     //return res.status(404).send("User not found");

//     req.session.flash = {
//       type: "danger",
//       message: "User not found",
//     };
//     return res.render("layout", { flash: req.session.flash });
//   }

//   {

//     // get all users from database
//     const users = await User.find({});

//     req.session.user = user;
//     return res.render("layout", { users, currentUser: user });
//   }


// });
