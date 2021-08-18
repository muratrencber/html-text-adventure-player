var adventures = [
    new Adventure("Cna Quest","cnaquest"),
    new Adventure("HCRF: Text Adventure", "hcrftxt"),
    new Adventure("HCRF: Yazılı Macera", "hcrftxttr"),
];

/*function LoadAdventureList()
{
    if (location.hostname === "")
    {
        var reader = new FileReader();
        reader.onload = function(e) {
            let contents = e.target.result;
            adventures = [];
            let adventureArray = JSON.parse(contents);
            for(let i = 0; i < adventureArray.length; i++)
                adventures.push(new Adventure(adventureArray[i].name, adventureArray[i].fileName));
            SetExistingAdventuresList();
        };
        reader.readAsText(new File("./adventures/availableAdventures.txt", ));
    }
    else
    {
        let request = new XMLHttpRequest();
        request.open('GET', './adventures/availableAdventures.txt', true);
        request.onreadystatechange = function () {
            if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
                adventures = [];
                let adventureArray = JSON.parse(request.responseText);
                for(let i = 0; i < adventureArray.length; i++)
                    adventures.push(new Adventure(adventureArray[i].name, adventureArray[i].fileName));
                SetExistingAdventuresList();
            }
        }
        request.send(null);
    }
}*/

function LoadExistingAdventure(fileName)
{
    if (location.hostname === "")
    {
        LoadAdventure();
        return;
    }
    let request = new XMLHttpRequest();
    request.open('GET', './adventures/'+fileName+".pnsc", true);
    request.onreadystatechange = function () {
        if (request.readyState === 4 && (request.status === 200 || request.status === 0)) {
            LoadPS(request.responseText);
        }
    }
    request.send(null);
}

function LoadAdventure()
{
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = ".pnsc";
    input.click();
    input.onchange = e => {
        var file = e.target.files[0];
        var fr = new FileReader();
        fr.onload = function(){
            LoadPS(fr.result);
        }
        fr.readAsText(file);
    }
}

function SetExistingAdventuresList()
{
    let container = document.getElementById("existing-adventures-buttons");
    container.innerHTML = "";
    for(let i = 0; i < adventures.length; i++)
    {
        let btn = document.createElement("button");
        btn.innerHTML = decodeURIComponent(escape(adventures[i].name));
        btn.setAttribute("onclick", "LoadExistingAdventure(\""+adventures[i].fileName+"\")");
        container.appendChild(btn);
    }
}