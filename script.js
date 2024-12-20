let btn = document.querySelector(".button");
let qr_code_element = document.querySelector(".qr-code");

btn.addEventListener("click", () => {
  let user_input = document.querySelector("#input_text");
  if (user_input.value.trim() !== "") { // Improved the cleanliness of input handling
    qr_code_element.innerHTML = ""; // Clear previous QR code
    generate(user_input.value); // Pass the user input to the generate function
  } else {
    console.log("Not valid input");
    qr_code_element.style.display = "none"; // Hide the QR code element if input is invalid
  }
});

function generate(text) {
  qr_code_element.style.display = ""; // Ensure the QR code element is visible

  let qrcode = new QRCode(qr_code_element, {
    text: text, // Use the input parameter for QR code text
    width: 180,
    height: 180,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Create a download button
  let download = document.createElement("button");
  download.textContent = "Download"; // Set text for the button
  qr_code_element.appendChild(download);

  // Create a download link with the appropriate attributes
  let download_link = document.createElement("a");
  download_link.setAttribute("download", "qr_code.png");
  
  // Append the link to the button
  download.appendChild(download_link);

  // Use a timeout to ensure the QR code is generated before trying to retrieve the image
  setTimeout(() => {
    let qr_code_img = qr_code_element.querySelector("img");
    let qr_code_canvas = qr_code_element.querySelector("canvas");

    if (qr_code_img) {
      download_link.setAttribute("href", qr_code_img.getAttribute("src"));
    } else if (qr_code_canvas) {
      download_link.setAttribute("href", qr_code_canvas.toDataURL("image/png"));
    }
  }, 300);
}



