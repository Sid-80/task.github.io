const togglePassword = (button) => {
  button.classList.toggle("showing");
  const input = document.getElementById("password");
  input.type = input.type === "password" ? "text" : "password";
};
async function myFunc () {
  let userInput = document.querySelector("#userInput");
  let userInputWarn = document.querySelector("#warning");
  const accessToken = "a84456f7119c21b5e61ff84398e5bb83";
  const pi = 139397;
  const click_id = "a1b2c3";
  let ip = "";
  const reqApi = "https://pin.trafficcompany.com/api/v1/sendpin";
  if(userInput.value === ""){
    return userInputWarn.innerHTML = "Enter the number !!";
  }else{
    try {
      const res = await fetch('https://api.ipify.org/?format=json');
      const data = await res.json();
      ip = data.ip;
      const inputApi = `${reqApi}?access-token=${accessToken}&ip=${ip}&msisdn=${userInput.value}&pi=${pi}&click_id=${click_id}`;
      const res2 = await fetch(inputApi);
      const data2 = await res2.json();
      if(data2.status === "error"){
        return userInputWarn.innerHTML = `Message : ${data2.message}`;
      }else{
        localStorage.setItem('tracker',JSON.stringify(data2.tracker));
        return userInputWarn.innerHTML = `Message : ${data2.message}`;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
async function myFuncCheck () {
  let passInput = document.querySelector("#password");
  let checkWarn = document.querySelector("#warning");
  let tracker = "";
  const verApi = "https://pin.trafficcompany.com/api/v1/verify";
  if(passInput.value === ""){
    return userInputWarn.innerHTML = "Enter the number !!";
  }else{
    try {
      const localData = await JSON.parse(localStorage.getItem(`tracker`));
      tracker = localData;
      const checkApi = `${verApi}?tracker=${tracker}&pin=${passInput.value}`;
      const res = await fetch(checkApi);
      const data2 = await res.json();
      console.log(data2);
      return checkWarn.innerHTML = `Message : ${data2.message}`;
    } catch (e) {
      console.log(e);
    }
  }
}