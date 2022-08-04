const loaderItem = Array.from(document.querySelectorAll("#loader .pixel"));
const fragment = document.createDocumentFragment();
const wrapper = document.querySelector('.wrapper');


(function AnimateLoader() {
  {
    let idx = 0;
    let id = setInterval(() => {
      loaderItem[idx].style.transform = "scale(1.4)";
      loaderItem[idx].style.boxShadow =
        "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px";

      if (idx > 0) {
        loaderItem[idx - 1].style.transform = "scale(1)";
        loaderItem[idx - 1].style.boxShadow = "none";
      }
      if (idx == 0) {
        loaderItem[loaderItem.length - 1].style.transform = "scale(1)";
        loaderItem[loaderItem.length - 1].style.boxShadow = "none";
      }
      idx < loaderItem.length - 1 ? idx++ : (idx = 0);
    }, 300);

    setTimeout(() => {
        clearInterval(id);
        document.querySelector("#loader").style.display = "none";
        wrapper.style.display = "flex";
    }, 2000);
  }
})()
