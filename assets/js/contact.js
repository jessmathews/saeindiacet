const scriptURL =
  "https://script.google.com/macros/s/AKfycbzpyk8kbJQYD5tjBSV6U23aP9U31cx7fUVTBkFZ5_dl_5jUfsg2uEenddcu7556vhj6/exec";
const form = document.forms["contact-us"];

const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};

form.addEventListener("submit", (e) => {
  let selectform = select(".sent-message");
  let sendButton = select(".button");
  if (selectform) {
    const formSubmited = (status) => {
      if (status == 200) {
        selectform.style.display = "block";
        sendButton.style.display = "none";
      } else {
        sendButton.style.display = "inline-block";
        selectform.style.display = "none";
      }
    };
    formSubmited(200);
  }
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response.status);
    })
    .catch((error) => console.error("Error!", error.message));
});
