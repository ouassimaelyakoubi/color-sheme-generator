const inputColor = document.getElementById("colorInput");
const colorSchemeMode = document.getElementById("schemeModeSelect");


document.getElementById("get-btn").addEventListener("click", function () {
  const color = inputColor.value;
  const schemeMode = colorSchemeMode.value;

  fetch(`https://www.thecolorapi.com/scheme?hex=${color.slice(1)}&mode=${schemeMode}`)
    .then((response) => response.json())
    .then((data) => {
      const colorSchemes = document.getElementById("color-shemes");
      const colorHexes = document.getElementById("color-hex");

      let schemesHTML = '';
      let hexesHTML = '';

      data.colors.forEach((color) => {
        const hex = color.hex.value;

        schemesHTML += `
          <button class="btn-color" id="${hex}" style="background-color: ${hex}">
          </button>
        `;

        hexesHTML += `
          <button class="btn-hex" id="b${hex}">${hex}</button>
        `;
      });

      // Insert HTML
      colorSchemes.innerHTML = schemesHTML;
      colorHexes.innerHTML = hexesHTML;

      // Attach event listeners
      data.colors.forEach((color) => {
        const hex = color.hex.value;

        const colorBtn = document.getElementById(hex);
        const hexBtn = document.getElementById(`b${hex}`);

        if (colorBtn) {
          colorBtn.addEventListener("click", (e) => {
            navigator.clipboard.writeText(hex);
            showToast(e.target);
        }
      )}

        if (hexBtn) {
          hexBtn.addEventListener("click", (e) => {
            navigator.clipboard.writeText(hex);
            showToast(e.target);
          });
        }
      });
      document.getElementById("color-shemes").style.display = "flex";

    })
    .catch((error) => {
      console.error("Error fetching color scheme:", error);
    });

});


function showToast(el) {
  const toast = document.getElementById("toast");
  const rect = el.getBoundingClientRect();
  
  toast.style.left = rect.left + window.scrollX + "px";
  toast.style.top = rect.top + window.scrollY - 15 + "px"; // show above
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 1500);
}
