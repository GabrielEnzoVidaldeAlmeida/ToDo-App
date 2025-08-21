import { hashPassword } from "@/libs/login/manage-login";

(async () => {
  const myPassword = ""; //Apague a senha após utilizar
  const hashMyPassword = await hashPassword(myPassword);

  console.log(hashMyPassword);
})();
