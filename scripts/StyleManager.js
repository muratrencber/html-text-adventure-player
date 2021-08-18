var isLight = false;

function ChangeStyle()
{
    let changeElement = document.getElementById("mode-change-button");
    let style = document.getElementById("theme-link");
    if(isLight)
    {
        style.setAttribute("href", "./style/colors_dark.css");
        changeElement.innerHTML = "Switch to Light Mode";
    }
    else
    {
        style.setAttribute("href", "./style/colors_light.css");
        changeElement.innerHTML = "Switch to Dark Mode";
    }
    isLight = !isLight;
}