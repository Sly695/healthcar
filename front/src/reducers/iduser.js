export default function (iduser = "", action) {
  if (action.type == "addIduser") {
    return action.iduser;
  } else {
    return iduser;
  }
}
