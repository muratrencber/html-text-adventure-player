//File load functions
function LoadPS(text)
{
    panels = {};
    variables = {};
    let varStrArray = text.split("<var");
    for(let i = 1; i < varStrArray.length; i++)
    {
        let vartext = varStrArray[i].split("</var>")[0];
        let varname = vartext.split(">")[1];
        let defvalue = vartext.split("def=\"")[1].split("\"")[0];
        variables[varname] = new Variable(varname, defvalue);
    }
    let panelStrArray = text.split("<PANEL");
    for(let i = 1; i < panelStrArray.length; i++)
    {
        let partRemainder = panelStrArray[i].split("</PANEL>")[0];
        let id = partRemainder.split("id=\"")[1].split("\"")[0];
        partRemainder = partRemainder.substring(partRemainder.indexOf(">"));
        let opResults = LoadOptions(partRemainder);
        partRemainder = opResults[0];
        console.log("AFTEROPTIONS:"+partRemainder);
        let resResults = LoadResults(partRemainder);
        partRemainder = resResults[0];
        let options = opResults[1];
        let results = resResults[1];
        let text = partRemainder.split("<text>")[1].split("</text>")[0];
        panels[id] = new Panel(id, text, options, results);
    }
    DrawPanel("start");
}
function LoadOptions(text)
{
    let remainder = "";
    remainder += text.split("<option>")[0];
    let optionsInner = [];
    let optStrArray = text.split("<option>");
    for(let i = 1; i < optStrArray.length; i++)
    {
        let otext = optStrArray[i];
        let currentRemainder = otext.split("</option>")[1];
        if(currentRemainder != undefined)
            remainder += currentRemainder;
        otext = otext.split("</option>")[0];
        let id = otext.split("<id>")[1].split("</id>")[0];
        let resResults = LoadResults(otext);
        otext = resResults[0];
        let trResults = LoadTransitions(otext);
        otext = trResults[0];
        let condResults = LoadConditions(otext, "op");
        otext = condResults[0];
        let condArray = condResults[1];
        let trArray = trResults[1];
        let resArray = resResults[1];
        let text = otext.split("<text>")[1].split("</text>")[0];
        let opt = new Option(text, id, trArray, condArray, resArray);
        optionsInner.push(opt);
        if(id != "" && options[id] == undefined)
            options[id] = opt;
    }
    return [remainder, optionsInner];
}
function LoadTransitions(text)
{
    let remainder = "";
    let trStrArray = text.split("<transition");
    let transitions = [];
    remainder += trStrArray[0];
    for(let i = 1; i < trStrArray.length; i++)
    {
        let ttext = trStrArray[i].split("</transition>")[0];
        let currentRemainder = trStrArray[i].split("</transition>")[1];
        if(currentRemainder != undefined)
            remainder += currentRemainder;
        let loadResults = LoadConditions(ttext, "tr");
        let conds = loadResults[1];
        ttext = loadResults[0];
        let id = ttext.split("id=\"")[1].split("\"")[0];
        transitions.push(new Transition(id, conds));
    }
    return [remainder, transitions];
}
function LoadConditions(text, prefix)
{
    let fulln = prefix + "condition";
    let remainder = "";
    let condStrArray = text.split("<"+fulln);
    let conditions = [];
    remainder += condStrArray[0];
    for(let i = 1; i < condStrArray.length; i++)
    {
        let ctext = condStrArray[i];
        let currentRemainder = ctext.split("</"+fulln+">")[1];
        if(currentRemainder != undefined)
            remainder += currentRemainder;
        let type = ctext.split("var-type=\"")[1].split("\"")[0];
        let targetName = ctext.split("var-name=\"")[1].split("\"")[0];
        let targetValue = ctext.split("var-target=\"")[1].split("\"")[0];
        conditions.push(new Condition(targetName, targetValue, type));
    }
    return [remainder, conditions];
}
function LoadResults(text)
{
    let remainder = "";
    let resultStrArray = text.split("<result");
    let results = [];
    remainder += resultStrArray[0];
    for(let i = 1; i < resultStrArray.length; i++)
    {
        let rtext = resultStrArray[i];
        let currentRemainder = rtext.split("</result>")[1];
        if(currentRemainder != undefined)
            remainder += currentRemainder;
        let type = rtext.split("type=\"")[1].split("\"")[0];
        let targetName = rtext.split("name=\"")[1].split("\"")[0];
        let targetValue = rtext.split("value=\"")[1].split("\"")[0];
        results.push(new Result(targetName, targetValue, type));
    }
    return [remainder, results];
}