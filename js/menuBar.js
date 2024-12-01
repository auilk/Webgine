const menuBar = document.querySelector(".menu-bar");
const menuButon = document.querySelectorAll(".menu-btn");
let dropdown;
let selected;

menuButon.forEach((element) => {
    element.addEventListener("click", (event) =>
    { 
        selected = true;
        ShowMenu(event);
    });
    element.addEventListener("mouseenter", ShowMenu);
});

window.addEventListener("click", HideMenu);

function ShowMenu(event)
{
    if (!selected) return;

    if (dropdown)
    {
        dropdown.classList.remove("active-dropdown"); 
    }

    if(event.target.classList.contains("dropdown-btn"))
    {
        dropdown = event.target.querySelector(".dropdown");
        dropdown.classList.add("active-dropdown");
    }
}

function HideMenu(event)
{
    if (!selected || event.target.classList.contains("menu-btn")) return;
    dropdown.classList.remove("active-dropdown");
    selected = false;
}