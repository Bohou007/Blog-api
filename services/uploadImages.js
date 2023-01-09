require("dotenv").config();
const fetch = require("node-fetch");
const UploaderImage = require("imgbb-uploader");

exports.uploadImage = async (image) => {
  console.log("====================================");
  console.log(image);
  console.log("====================================");
  let data = await UploaderImage(process.env.IMGBB_API_KEY, image)
    .then((response) => {
      console.log(response);
      return [200, response];
    })
    .catch((error) => {
      console.log(error);
      return [500, error.message];
    });
  return data;
};

// let body = { image: image };
// let data = await fetch(process.env.IMGBB_API_URL + process.env.IMGBB_API_KEY, {
//   method: "POST",
//   body: JSON.stringify(body),
// })
//   .then(async (res) => {
//     let response = await res.json();
//   })
//   .catch((err) => {});
