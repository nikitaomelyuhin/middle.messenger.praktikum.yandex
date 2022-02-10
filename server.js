const express = require('express');
// const handlebars = require('express-handlebars');
const app = express();
const PORT = 3000;


// app.engine(
//   'handlebars',
//   handlebars({
//     layoutsDir: 'static',
//     defaultLayout: 'layout',
//     extname: 'hbs',
//   })
// )

// app.set("view engine", "hbs");


app.use(express.static(__dirname + "/dist"), (req, res) => {
  res.render('index.hbs')
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}!`);
}); 