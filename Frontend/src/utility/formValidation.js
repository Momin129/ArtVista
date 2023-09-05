import axios from "axios";

export async function validateForm(userId, name, value) {
  let msg = "";

  if (value.length == 0) return "*Field can't be empty";

  if (name == "fullname") {
    if (!value.match(/^[a-zA-Z\s]+$/)) {
      msg = `*Name should only contain alphabets.`;
    }
  } else if (name == "mobile") {
    if (!value.match(/^[0-9]+$/)) {
      msg = `*Name should only contain digits.`;
    }
    if (value.length != 10) msg = "\n*Number should be of 10 digits.";
    try {
      await axios.post(`${import.meta.env.VITE_HOST}/api/user/validate`, {
        id: userId,
        mobile: value,
      });
    } catch (error) {
      msg = "*" + error.response.data.message;
    }
  } else if (name == "email") {
    if (!value.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)) {
      msg = "*Invalid email.";
    } else {
      try {
        await axios.post(`${import.meta.env.VITE_HOST}/api/user/validate`, {
          id: userId,
          email: value,
        });
      } catch (error) {
        msg = "*" + error.response.data.message;
      }
    }
  } else if (name == "password") {
    if (value.length < 8) msg += `*atleast 8 characters.\n`;
    if (!value.match(/[a-z]/g)) msg += `*atleast one lowercase.\n`;
    if (!value.match(/[A-Z]/g)) msg += `*atleast one uppercase.\n`;
    if (!value.match(/[0-9]/g)) msg += `*atleast one digit.\n`;
    if (!value.match(/[!@#$%^&*]/g)) msg += `*atleast one special character.\n`;

    if (msg.length != 0) msg = "Password must contain\n" + msg;
  }

  return msg;
}
