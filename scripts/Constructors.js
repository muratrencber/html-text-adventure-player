class Adventure
{
    constructor(name, fileName)
    {
        this.name = name;
        this.fileName = fileName;
    }
}
class Panel
{
	constructor(id, text, options = [], results = [])
	{
		this.id = id;
		this.text = text;
		this.options = options;
        this.results = results;
	}
}
class Option
{
    constructor(text, id, transitions = [], conditions = [], results = [])
    {
        this.text = text;
        this.id = id;
        this.transitions = transitions;
        this.conditions = conditions;
        this.results = results;
    }
}
class Transition
{
    constructor(targetId, conditions = [])
    {
        this.targetId = targetId;
        this.conditions = conditions;
    }
}
class Result
{
    constructor(targetName, targetValue, type)
    {
        this.targetName = targetName;
        this.targetValue = targetValue;
        this.type = type;
    }
}

class Condition
{
    constructor(targetName, targetValue, targetType)
    {
        this.targetName = targetName;
        this.targetValue = targetValue;
        this.targetType = targetType;
    }

    Check(value)
    {
        if(this.targetType == "EQUAL TO")
        {
            return this.targetValue == value;
        }
        else if(this.targetType == "LESSER THAN")
        {
            return value < this.targetValue;
        }
        else if(this.targetType == "GREATER THAN")
        {
            return value > this.targetValue;
        }
        return false;
    }
}
class Variable
{
    constructor(name, defaultValue)
    {
        this.name = name;
        this.value = defaultValue;
        this.defaultValue = defaultValue;
    }

    Reset()
    {
        this.value = this.defaultValue;
    }
}