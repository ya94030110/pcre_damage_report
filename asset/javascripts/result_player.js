


var players = ["初音的哈士貓", "沒人愛的丁丁丁丁丁丁", "(¯‧ω‧¯)", "達拉崩巴(NPC)", "綰逸", "神弒月", "Fobis", "好吃布丁", "苦搜game", "綠茶愛咖啡", "小紫", "かほ", "勤勉先生", "琉璃", "Silence", "小頑童", "塔卡", "Lamo(NPC)", "風華", "Turlock", "戰隊孤兒", "水蛋", "把你斬成兩半", "99期生娜娜(缺瑪娜", "Chaos", "漂流弦月", "朧月", "一擊桃樂絲", "星菲的紡希是最可愛的", "住在非洲的歐洲人"];


window.onload = function()
{
    var nameDiv = document.getElementById("player-list");
    for(i = 0; i < players.length; i++)
    {
        var player_link = document.createElement("a");
        player_link.innerHTML = players[i] + "<br>";
        player_link.setAttribute("href", "player-damage.html?id=" + (i+1));
        nameDiv.appendChild(player_link);
    }
    
}