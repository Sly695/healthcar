export default function (userData = [], action) {
  if (action.type == "addUserData") {
    return action.userData;
  } else {
    return userData;
  }
}
