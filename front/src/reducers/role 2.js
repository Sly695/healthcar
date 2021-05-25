export default function (role = "", action) {
  if (action.type == "addRole") {
    return action.role;
  } else {
    return role;
  }
}
