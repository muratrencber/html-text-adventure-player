var partArray = [];
var panels = {};
var variables = {};
var options = {};

const transitionDuration = 1;

SetExistingAdventuresList();

function DrawPartFromID(id)
{
	for(let i = 0; i < partArray.length; i++)
	{
		if(partArray[i].id == id)
		{
			DrawPart(partArray[i]);
			break;
		}
	}
}

function DrawPanel(id)
{
    BackToGame();
    let panel = panels[id];
    for(let i = 0; i < panel.results.length; i++)
        ApplyResult(panel.results[i]);
    let h3Text = document.getElementById("part_text");
    h3Text.innerHTML = panel.text;
    let buttonContainer = document.getElementById("button_container");
	buttonContainer.innerHTML = "";

    let transitionOnly = true;
	for(let i = 0; i < panel.options.length; i++)
	{
        if(panel.options[i].text != "")
        {
            transitionOnly = false;
            break;
        }
    }

    if(transitionOnly)
    {
        setTimeout(function() {
            console.log(panel);
            for(let i = 0; i < panel.options.length; i++)
            {
                let opt = panel.options[i];
                let valid = true;
                for(let j = 0; j < opt.conditions.length; j++)
                {
                    let cond = opt.conditions[j];
                    if(!cond.Check(variables[cond.targetName].value))
                        valid = false;
                }
                if(!valid)
                    continue;
                DrawPanel(opt.transitions[0].targetId);
                return;
            }
        }, transitionDuration * 1000);
        return;
    }
    else
    {
        for(let i = 0; i < panel.options.length; i++)
        {
            let opt = panel.options[i];
            if(opt.id == "")
                continue;
            let valid = true;
            for(let j = 0; j < opt.conditions.length; j++)
            {
                let cond = opt.conditions[j];
                if(!cond.Check(variables[cond.targetName].value))
                    valid = false;
            }
            if(!valid)
                continue;
            let optionButton = document.createElement("button");
            optionButton.innerHTML = panel.options[i].text;
            optionButton.setAttribute("style", "width: 100%; height: 100px;");
            optionButton.setAttribute("onclick", "ApplyOption(\""+opt.id+"\")");
            buttonContainer.appendChild(optionButton);
        }
    }
}

function ApplyOption(optionId)
{
    let opt = options[optionId];
    if(opt == null || opt == undefined)
    {
        console.error("Something went wrong!");
        return;
    }
    for(let i = 0; i < opt.results.length; i++)
        ApplyResult(opt.results[i]);
    for(let i = 0; i < opt.transitions.length; i++)
    {
        let tr = opt.transitions[i];
        let valid = true;
        for(let j = 0; j < tr.conditions.length; j++)
        {
            let cond = tr.conditions[j];
            if(!cond.Check(variables[cond.targetName].value))
                valid = false;
        }
        if(!valid)
            continue;
        let panel = panels[tr.targetId];
        if(panel == null ||panel == undefined)
            continue;
        DrawPanel(tr.targetId);
        return;
    }
}

function ApplyResult(result)
{
    if(result.type == "change-node-text")
    {
        let trgt = panels[result.targetName];
        if(trgt == null || trgt == undefined)
            trgt = options[result.targetName];
        trgt.text = result.targetValue;
    }
    else if(result.type == "change-variable")
    {
        variables[result.targetName].value = result.targetValue;
    }
}

function BackToGame()
{
    let gamePanel = document.getElementById("in-game");
    let homePanel = document.getElementById("home");
    let button = document.getElementById("back-to-home-button");
    gamePanel.style.display = "";
    homePanel.style.display = "none";
    button.style.display = "";
}
function BackToHome()
{
    let gamePanel = document.getElementById("in-game");
    let homePanel = document.getElementById("home");
    let button = document.getElementById("back-to-home-button");
    gamePanel.style.display = "none";
    homePanel.style.display = "";
    button.style.display = "none";
    SetExistingAdventuresList();
}