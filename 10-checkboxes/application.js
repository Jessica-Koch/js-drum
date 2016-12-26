let lastChecked;

function handleCheck(e){
    // check if htye had the shift key down
    // check that they are checking it 
    let inBetween = false;
    if (e.shiftKey && this.checked) {
        // loop over every single checkbox
        checkboxes.forEach(checkbox => {
            if (checkbox === this || checkbox === lastChecked) {
                inBetween = !inBetween;
            }

            if (inBetween) {
                checkbox.checked = true;
            }
        })

    }

    lastChecked = this;
}


const checkboxes = document.querySelectorAll(".inbox input[type='checkbox']");

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleCheck));