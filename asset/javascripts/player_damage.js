

var days=["1/22", "1/23", "1/24", "1/25", "1/26", "1/27", "1/28", "1/29", "1/30"];
var boss = ["龍", "鳥", "死靈領主", "巨人", "處女座"];

window.onload = function()
{
    var playerid = getValue("id");
    //console.log(playerid);
    $.get("./api/getDamage.php?player=" + playerid,
            {
                
            }
         ).done(function(res){
                //console.log(res);
                res = json_preprocess(res);
                response = JSON.parse(res);
                showDamage(response);
           })
            .fail(function(xhr, status, error) {
                    alert(status + ":" + error);
           });
}

function showDamage(damage_array)
{
    for(i = 0; i < damage_array.length; i++)
    {
        var day = days[damage_array[i]['day'] - 1],
            battle_neme = "",
            boss_name = boss[damage_array[i]['boss'] - 1],
            round_name;
        if(damage_array[i]['battle'] == 1) battle_neme+="第一刀";
        if(damage_array[i]['battle'] == 2) battle_neme+="第二刀";
        if(damage_array[i]['battle'] == 3) battle_neme+="第三刀";
        //if(damage_array[i]['compensate'] == 1) battle_neme += "補償刀";
        
        if(damage_array[i]['round'] == 1) round_name = "第一階段";
        else round_name = "第二階段";
        
        var message = document.createElement("p");
        message.innerHTML = day + " " + battle_neme + ": " + round_name + boss_name + " 傷害: " + damage_array[i]['damage'];
        document.getElementById("damage-list").appendChild(message);
    }
}

function getValue(varname)
{
    var url = window.location.href;
    var varparts = url.split("?");
    if (varparts.length < 2){return 0;}
    var vars = varparts[1].split("&");
    //console.log(vars);
    var value = 0;
    for (i=0; i<vars.length; i++)
    {
        var parts = vars[i].split("=");
        if (parts[0] == varname)
        {
            value = parts[1];
            break;
        }
    }
    value = unescape(value);
    value.replace(/\+/g," ");
    return value;
}

function json_preprocess(response)
{
    for(i = 0; i < response.length; i++)
    {
        if(response[i] == "{" || response[i] == "[") return response.substring(i);
    }
}
