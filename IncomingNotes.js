// ==UserScript==
// @name         Incoming Notes
// @version      0.9
// @description  adds notes to incoming tab
// @author       secundum
// @include      https://de*.die-staemme.de/game.php?*mode=incomings*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // {Number: ['Regex', 'button name', 'background color', 'text color']}
    var note_settings = {
        0: ['Off', 'OFF', 'lred', 'white'],
        1: ['Deff', 'DEFF', 'lightblue', 'white']
    };

    // {ColorName: ['theme color 1', 'theme color 2']}
    var colors = {
        'red': ['#e20606', '#b70707'], // ff7d7d
        'green': ['#31c908', '#228c05'],
        'blue': ['#0d83dd', '#0860a3'],
        'yellow': ['#ffd91c', '#e8c30d'],
        'orange': ['#ef8b10', '#d3790a'],
        'lblue': ['#22e5db', '#0cd3c9'],
        'lime': ['#ffd400', '#ffd400'],
        'white': ['#ffffff', '#dbdbdb'],
        'black': ['#000000', '#2b2b2b'],
        'gray': ['#adb6c6', '#828891'],
        'dorange': ['#ff0000', '#ff0000'],
        'pink': ['#ff69b4', '#ff69b4'],
        'lred': ['#ff8282','#ff8282'],
        'lightblue': ['#31a6ff','#31a6ff']
    };

    // Function to apply styles
    function applyStyles(buttonName, backgroundColor, textColor) {
        $(`button:contains(${buttonName})`).css({
            'background-color': backgroundColor,
            'color': textColor
        });
    }

    function getColorByText(text) {
        // Loop through note_settings to find a match regex and color
        for (const [key,[regex,buttonName,bgColor,textColor]] of Object.entries(note_settings)) {
            const regExp = new RegExp(regex,'gi');
            if (regExp.test(text)) {
                const [bgColor1,bgColor2] = colors[bgColor.toLowerCase()];
                const [textColor1,textColor2] = colors[textColor.toLowerCase()];
                return bgColor1;
                break;
                // Stop loop after the first match
            }
        }
    }

    function getLastCoordFromString(string) {
        if (!string)
            return [];
        const regex = /\d{1,3}\|\d{1,3}/g;
        let match;
        let lastMatch;
        while ((match = regex.exec(string)) !== null) {
            lastMatch = match;
        }
        return lastMatch ? lastMatch[0] : [];
    }

    $("#incomings_table tr").each((i,e)=>{
        let tds = $(e).find('td')
        if (tds.length == 0) {
            $(e).find('th:nth-child(1)').after('<th id=""#note_head">Notizen</th>')
        } else {

            //target
            let targettd = $(tds[1]);
            const searchTarget = `<img onclick="$('input[name*=target_name]').val('${getLastCoordFromString(targettd.text())}')" src="https://dsde.innogamescdn.com/asset/31698b62/graphic/search.png" alt="">`
            targettd.append(searchTarget);

            //source
            let sourcetd = $(tds[2]);
            const searchSource = `<img onclick="$('input[name*=origin_name]').val('${getLastCoordFromString(sourcetd.text())}')" src="https://dsde.innogamescdn.com/asset/31698b62/graphic/search.png" alt="">`
            sourcetd.append(searchSource);

            //player
            let playertd = $(tds[3]);
            const searchPlayer = `<img onclick="$('input[name*=origin_player]').val('${playertd.text().trim()}')" src="https://dsde.innogamescdn.com/asset/31698b62/graphic/search.png" alt="">`
            playertd.append(searchPlayer);

            //add tooltipText
            let name = playertd.text().trim()
            let tt = sourcetd[0].children.length == 3 ? sourcetd[0].children[0].tooltipText : ""
            //filter Report Data becouse its to long
            tt = tt.includes('|') && tt.includes('Gesendet') ? tt.split('Gesendet')[0] : (tt.includes('Gesendet') ? "Bericht" : tt)
            //check and Remove Player name
            tt = (tt.length == 0 ? '' : tt.includes(name) ? tt.replace(name, '').replace('|', '').trim() : 'OLD')
            $(tds[0]).after(`<td style="font-weight: bold;  background-color: ${getColorByText(tt)};">` + tt + '</td>')

        }
    }
    )

    function tabelFilter(id, hcount, tcount) {
        function comparer(index) {
            function getCellValue(row, index) {
                const data = $(row).children('td').eq(index).text().replace('%', '').trim()
                return index > 5 ? data.replaceAll(':', '') : data;
            }
            return function(a, b) {
                var valA = getCellValue(a, index)
                  , valB = getCellValue(b, index)
                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB)
            }
        }
        $('[id=' + id + '] tr:first-child th').click(function() {
            var table = $(this).parents('table').eq(0)
            var rows = table.find('tr')
            var head = rows.slice(0, hcount)
            var tale = tcount == 0 ? rows.slice(0, 0) : rows.slice(tcount)
            rows = (tcount == 0 ? rows.slice(hcount) : rows.slice(hcount, tcount)).toArray().sort(comparer($(this).index()))
            this.asc = !this.asc
            if (!this.asc) {
                rows = rows.reverse()
            }
            for (var i = 0; i < head.length; i++) {
                table.append(head[i])
            }
            for (i = 0; i < rows.length; i++) {
                $(rows[i]).toggleClass('row_a', i % 2 == 0)
                $(rows[i]).toggleClass('row_b', i % 2 == 0)
                table.append(rows[i])
            }
            for (i = 0; i < tale.length; i++) {
                table.append(tale[i])
            }
        })
    }
    tabelFilter('incomings_table', 1, -1)
}
)();
