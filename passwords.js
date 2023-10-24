/**
 * @function passwordCheck1
 * @param {string} password
 * @returns {boolean}
 * @description accepts password as argument and on it performs multiple tests to check it's validity
 */
function passwordCheck1(password) {
  let passArr = [...password];
  let flag;

  // // check unique
  for (let i = 0; i < passArr.length; i++) {
    let counter = 0;
    for (let j = 0; j < passArr.length; j++) {
      if (passArr[i] == passArr[j]) {
        counter++;
        //console.log("counter:", counter);
      }
    }
    if (counter > 1) {
      return (flag = false);
    } else {
      counter = 0;
      flag = true;
    }
  }

  // check number
  for (let i = 0; i < passArr.length; i++) {
    let num = +passArr[i];
    //console.log(num);
    if (isNaN(num)) {
      return (flag = false);
    } else {
      flag = true;
    }
  }

  // check lenght
  if (passArr.length < 10) {
    flag = false;
  } else {
    flag = true;
  }

  return flag;
}

function resizePassword(password) {
  let newPass = password.substring(0, 10);

  return `
    Password: ${newPass},
    Password length: ${newPass.length}`;
}

//console.log(passwordCheck("9876543210"));
//console.log(resizePassword("0123456789"));

//===============================================================
//===============================================================
//===============================================================
/**
 * @function passwordCheck2
 * @param  {...function} fns
 * @returns {password: string, isValid: boolean, msg: string}
 * @description
 */
const passwordCheck2 =
  (...fns) =>
  (password) =>
    fns.reduce((pass, fn) => fn(pass), password);

//===============================================================
/**
 *
 * @param {password: string, isValid: boolean, msg: string} passObj
 * @returns {passObj}
 */
function isUnique(passObj) {
  let passArr = [...passObj.password];

  if (passObj.isValid) {
    for (let i = 0; i < passArr.length; i++) {
      let counter = 0;
      for (let j = 0; j < passArr.length; j++) {
        if (passArr[i] == passArr[j]) {
          counter++;
          //console.log("counter:", counter);
        }
      }
      if (counter > 1) {
        passObj.msg = "Characters in password are not unique.";
        passObj.isValid = false;
        return passObj;
      } else {
        counter = 0;
        passObj.isValid = true;
      }
    }
  } else return passObj;
  return passObj;
}
//===============================================================
/**
 *
 * @param {password: string, isValid: boolean,msg: string} passObj
 * @returns {passObj}
 */
function isNumber(passObj) {
  let passArr = [...passObj.password];

  if (passObj.isValid) {
    for (let i = 0; i < passArr.length; i++) {
      let num = +passArr[i];
      //console.log(num);
      if (isNaN(num)) {
        passObj.isValid = false;
        passObj.msg = "Characters in password must be numbers.";
        return passObj;
      } else {
        passObj.isValid = true;
      }
    }
  } else return passObj;
  return passObj;
}
//===============================================================
/**
 *
 * @param {password: string, isValid: boolean,msg: string} passObj
 * @returns {passObj}
 */
function checkLength(passObj) {
  if (passObj.isValid) {
    if (passObj.password.length < 10) {
      passObj.isValid = false;
      passObj.msg =
        "Password is to short. Password must contain at least 10 characters.";
      return passObj;
    } else {
      passObj.isValid = true;
    }
  } else return passObj;
  return passObj;
}

console.log(
  passwordCheck2(
    isUnique,
    isNumber,
    checkLength
  )({ password: "0123456", isValid: true, msg: "" })
);
