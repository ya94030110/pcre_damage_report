
var player = 0;
var day = 0;

var send;
var success;

var players = ["------", "初音的哈士貓", "沒人愛的丁丁丁丁丁丁", "(¯‧ω‧¯)", "達拉崩巴(NPC)", "綰逸", "神弒月", "Fobis", "好吃布丁", "苦搜game", "綠茶愛咖啡", "小紫", "かほ", "勤勉先生", "琉璃", "Silence", "小頑童", "塔卡", "Lamo(NPC)", "風華", "Turlock", "戰隊孤兒", "水蛋", "把你斬成兩半", "99期生娜娜(缺瑪娜", "Chaos", "漂流弦月", "朧月", "一擊桃樂絲", "星菲的紡希是最可愛的", "住在非洲的歐洲人"];
var days=["------", "1/22", "1/23", "1/24", "1/25", "1/26", "1/27", "1/28", "1/29", "1/30"];
var boss = ["龍", "鳥", "死靈領主", "巨人", "處女座"];
window.onload = function()
{
    var nameDropdown = document.getElementById("name-dropdown");
    var dayDropdown  = document.getElementById("day-dropdown");
    
    for(i = 0; i < players.length; i++)
    {
        var new_option = document.createElement("option");
        new_option.innerHTML = players[i];
        nameDropdown.appendChild(new_option);
    }
    
    for(i = 0; i < days.length; i++)
    {
        var new_option = document.createElement("option");
        new_option.innerHTML = days[i];
        dayDropdown.appendChild(new_option);
    }
    
    document.getElementById("submit-button").addEventListener("click", submit_function);
    
}


function submit_function(event)
{
    document.getElementById("confirm-button").removeEventListener("click", confirm_function);
    player = players.indexOf($('#name-dropdown :selected').text());
    day = days.indexOf($('#day-dropdown :selected').text());
    if(player == 0)
    {
        alert("必須選擇玩家名稱");
        return;
    }
    if(day == 0)
    {
        alert("必須選擇日期");
        return;
    }
    if(getInfo(battle1, "round1", "Radio1", "damage1") == 0) return;
    if(getInfo(battle1_compensate, "compensation-round1", "compensation-Radio1", "compensation-damage1") == 0) return;
    if(getInfo(battle2, "round2", "Radio2", "damage2") == 0) return;
    if(getInfo(battle2_compensate, "compensation-round2", "compensation-Radio2", "compensation-damage2") == 0) return;
    if(getInfo(battle3, "round3", "Radio3", "damage3") == 0) return;
    if(getInfo(battle3_compensate, "compensation-round3", "compensation-Radio3", "compensation-damage3") == 0) return;
    
    var message = document.getElementById("check-message");
    while(message.firstChild) message.removeChild(message.firstChild);
    
    var name_message = document.createElement("p");
    name_message.innerHTML = "玩家名稱: " + players[player];
    message.appendChild(name_message);
    
    var day_message = document.createElement("p");
    day_message.innerHTML = "日期: " + days[day];
    message.appendChild(day_message);
    
    getMessage(battle1, message, "第一刀");
    getMessage(battle1_compensate, message, "第一刀補償刀");
    getMessage(battle2, message, "第二刀");
    getMessage(battle2_compensate, message, "第二刀補償刀");
    getMessage(battle3, message, "第三刀");
    getMessage(battle3_compensate, message, "第三刀補償刀");

    document.getElementById("confirm-button").addEventListener("click", confirm_function);
    $('#myModal').modal('show');
}

function confirm_function(event)
{
    document.getElementById("confirm-button").removeEventListener("click", confirm_function);
    send = success = 0;
    if(battle1.Empty() == 0)
    {
        send++;
        sendBattle(player, day, 1, battle1.getRound(), battle1.getBoss(), battle1.getDamage(), 0);
    }
    if(battle1_compensate.Empty() == 0)
    {
        send++;
        sendBattle(player, day, 1, battle1_compensate.getRound(), battle1_compensate.getBoss(), battle1_compensate.getDamage(), 1);
    }
    if(battle2.Empty() == 0)
    {
        send++;
        sendBattle(player, day, 2, battle2.getRound(), battle2.getBoss(), battle2.getDamage(), 0);
    }
    if(battle2_compensate.Empty() == 0)
    {
        send++;
        sendBattle(player, day, 2, battle2_compensate.getRound(), battle2_compensate.getBoss(), battle2_compensate.getDamage(), 1);
    }
    if(battle3.Empty() == 0)
    {
        send++;
        sendBattle(player, day, 3, battle3.getRound(), battle3.getBoss(), battle3.getDamage(), 0);
    }
    if(battle3_compensate.Empty() == 0)
    {
        send++;
        sendBattle(player, day, 3, battle3_compensate.getRound(), battle3_compensate.getBoss(), battle3_compensate.getDamage(), 1);
    }
    //console.log(send + " " + success);
    if(send == success) document.location.href="send_success.html";
    else $('#myModal').modal('hide');
}

function getInfo(battle, round_radio, boss_radio, damage_input)
{
    var radio1 = document.getElementsByName(round_radio);
    for(i = 0; i < radio1.length; i++) if(radio1[i].checked) battle.setRound(i);
    var radio2 = document.getElementsByName(boss_radio);
    for(i = 0; i < radio2.length; i++) if(radio2[i].checked) battle.setBoss(i);
    if(isNaN(document.getElementById(damage_input).value))
    {
        alert("傷害必須為數字");
        document.getElementById(damage_input).focus();
        return 0;
        if(document.getElementById(damage_input).value & 1 != 0 || document.getElementById(damage_input).value < 0)
        {
            alert("傷害必須為非負整數");
            document.getElementById(damage_input).focus();
            return 0;
        }
    }
    if(document.getElementById(damage_input).value == "")return 1;
    battle.setDamage(document.getElementById(damage_input).value);
    return 1;
}

function getMessage(battle, message, battle_name)
{
    //console.log(battle.getDamage());
    if(battle.Empty() == 1) return;
    var battle_message = document.createElement("p");
    battle_message.innerHTML = battle_name + ":<br>" + "第" + battle.getRound() + "階段 " + boss[battle.getBoss() - 1] + " 傷害: " + battle.getDamage();
    message.appendChild(battle_message);
}

function sendBattle(player, day, battle, round, boss, damage, compensate)
{
    // TODO: implement ajax
    
    $.ajax({
        type: 'POST',
        url: "./api/sendDamage.php",
        async:false,
        data:{
            player:player,
            day:day,
            battle:battle,
            round:round,
            boss:boss,
            damage:damage,
            compensate:compensate
        },
        success:function(res){
            res = json_preprocess(res);
            response = JSON.parse(res);
            if(response['discription'].length > 0)
            {
                alert(response['discription']);
                return;
            }
            success++;
        },
        fail:function(xhr, status, error) {
            alert(status + ":" + error);
            return;
        }
            
    });
}

function json_preprocess(response)
{
    for(i = 0; i < response.length; i++)
    {
        if(response[i] == "{" || response[i] == "[") return response.substring(i);
    }
}

var Battle = (function(){
    var round,
        boss,
        damage;
    
    //constructor
    var Battle = function () {
        this.round = 0;
        this.boss = 0;
        this.damage = 0;
    };

    Battle.prototype = {
        setRound: function(round)
        {
            this.round = round;
        },
        
        setBoss: function(boss)
        {
            this.boss = boss;
        },
        
        setDamage: function(damage)
        {
            this.damage = damage;
        },
        
        getRound: function()
        {
            return this.round;
        },
        
        getBoss: function()
        {
            return this.boss;
        },
        
        getDamage: function()
        {
            return this.damage;
        },
        
        Empty: function()
        {
            if(this.round == 0 || this.boss == 0 || this.damage == 0) return 1;
            return 0;
        }
    }
    return Battle;
}())

var battle1 = new Battle(),
    battle2 = new Battle(),
    battle3 = new Battle();
    
var battle1_compensate = new Battle(),
    battle2_compensate = new Battle(),
    battle3_compensate = new Battle();