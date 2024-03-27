// ==UserScript==
// @name         SteammeKarte
// @version      1.1
// @description  Draw quick lines with f and delte last one with r
// @include      http://de*.diestaemmekarte.de/*
// @include      https://de*.diestaemmekarte.de/*
// @include      https://de*.tribalwarsmap.com/*/*
// @icon         https://www.google.com/s2/favicons?domain=diestaemmekarte.de
// @grant        none
// ==/UserScript==

//Setup
// (keyCodes needed, can be different dependent on browser)
//Mark starting Village (Default = '83')
var markSVillage = 83;
//Mark Destination Village (Default = '68')
var markDVillage = 68;
/* If the preset buttons don't suit you feel free to change them according to your browser.
 The following website helps you just search (STRG+F) for  '83' and there you can see Browsers and keys and their number.
 https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
*/

// Remove last line
var removeLine = 'r';
// remove last line in list (last placed line)
var drawLine = 'f';
// draw line with drag ond drop buttonpress
var sdLine = 'c';
// draw line from start village to destination village

//Hotkey setup 's' to mark start village
setTimeout(()=>{
        if (typeof hotkeylist[markSVillage] != 'object') {
            hotkeyfunction.save(markSVillage, 'w', false);
        }
        ;//Hotkey setup 'd' to mark destination village
        if (typeof hotkeylist[markDVillage] != 'object') {
            hotkeyfunction.save(markDVillage, 'x', false);
        }
        display.panel('settings', 0, 1);
        display.panel('messages',0,1);
    }
    , 1000)

//Keylisteners to manage drawing of lines
var keydownHandler = function(e) {
    if (e.key == drawLine) {
        manual(mapvars.mapx, mapvars.mapy, '1');
        show('Move the mouse pointer to the point where you want to draw a line and release the keyboard key.', 3);
    } else if (e.key == removeLine) {
        draw.list.pop();
        draw.build();
        draw.refresh();
    }
    ;document.removeEventListener('keydown', keydownHandler);
}
document.addEventListener("keydown", keydownHandler);
document.addEventListener("keypress", function(e) {
    if (e.key == drawLine) {
        manual(mapvars.mapx, mapvars.mapy);
    }
    ;
});
document.addEventListener("keyup", function(e) {
    if (e.key == drawLine) {
        draw.add('' + vars.start.x, '' + vars.start.y, '' + vars.dest.x, '' + vars.dest.y, '3', display.drawcol);
        manual(mapvars.mapx, mapvars.mapy, '1');
        manual(mapvars.mapx, mapvars.mapy, );
    } else if (e.key == sdLine) {
        draw.add('' + vars.start.x, '' + vars.start.y, '' + vars.dest.x, '' + vars.dest.y, '3', display.drawcol);
    }
    ;document.addEventListener("keydown", keydownHandler);
});

draw.expoLines = function() {
    draw.copyToClipboard(JSON.stringify(draw.list))
    window.alertmessage('Exportet lines')
}

draw.impoLines = function() {
    try {
        var jLines = prompt('Import String from another Map');
        JSON.parse(jLines).forEach(e=>{
                draw.add(e[0], e[1], e[2], e[3], e[4], e[5])
            }
        );
        window.alertmessage('Importet lines sucessfuly')
    } catch (x) {
        window.alertmessage('Failed to import! Check your Insertet String')
    }

}

draw.copyToClipboard = function(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand('copy');
    } catch (err) {
        window.alertmessage('Fehler beim Kopier process')
    }
    document.body.removeChild(textArea);
}

draw.expoUserscript = function() {
    var $ = jQuery;
    var usScript = `// ==UserScript==
// @name         Map sdk
// @version      0.4
// @description  draw on map
// @author       Shinko to Kuma, suilenroc
// @match        https://${'' + serversettings.prefix + serversettings.server}.die-staemme.de/game.php?*village=*screen=map*
// @grant        none
// ==/UserScript==\n`
    usScript += `$.getScript("https://shinko-to-kuma.com/scripts/mapSdk.js").done(function() {`;
    draw.list.forEach(e=>{
            usScript += `MapSdk.lines.push({x1: ${e[0]},y1: ${e[1]},x2: ${e[2]},y2: ${e[3]},styling:{main: {"strokeStyle": "#${e[5]}","lineWidth": 2},mini: {"strokeStyle": "#${e[5]}","lineWidth": 2}},drawOnMini: true,drawOnMap: true,});\n`
        }
    );
    usScript += `MapSdk.mapOverlay.reload();});`;
    draw.copyToClipboard(usScript)
    window.alertmessage('Exportet Userscript! Add it as new Userscript to Tampermonkey')
}

function addUI() {
    jQuery("#coord > table > tbody > tr").append(`<td>
<table cellpadding="0" cellspacing="0" class="MenuO">
<tbody>
<tr class="MenuD hmm hmmtop">
<td class="center">
</span>Userscript</a></td><td class="center">
<a href="javascript: draw.expoLines();">
</span> Export Lines</a></td></tr>
<tr class="center hmm hmmbottom"><td class="center"><a href="javascript: draw.expoUserscript();">
</span>Export Userscript</a></td><td>
<a href="javascript:;" onclick="draw.impoLines(); return false;" >
Import Lines</a></td></tr>
</tbody></table>
</td>`)
}
addUI();
