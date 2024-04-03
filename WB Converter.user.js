// ==UserScript==
// @name         WB Converter devilicious.dev
// @version      1.0
// @description  Converts the TW format on devilicious.dev noble and advanced planner to WB Format
// @author       suilenroc
// @match        https://devilicious.dev/planner/noble
// @match        https://devilicious.dev/planner/advanced
// @grant        none
// ==/UserScript==

(function() {

    function twFormatToWorkbench(text) {
        if (typeof text == 'undefined')
            text = document.querySelector("body > app-root > main > app-planner > div > div.col-md-12.mt-2.mb-3 > div > article > div > div > textarea").value;
        return text.split('\n').map((e,i)=>{
            const input = e.replace('/\[b\]\[size=12\][ :\-\d]*\[\/size\]\[\/b\]/gm', '');
            const dateRegex = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3}/;
            const dateMatch = input.match(dateRegex);
            let date;
            if (dateMatch) {
                date = new Date(dateMatch[0]);
                console.log("Date: ", date);
                console.log("Date in long: ", date.getTime())
            } else {
                console.log("No date found in input.")
            }
            const unitType = (input.match(/\[unit\]([\w\s]+)\[\/unit\]/) || [])[1];
            const villageIndex = input.indexOf("village=") + 8;
            const villageValue = input.substring(villageIndex, input.indexOf("&", villageIndex));
            console.log("Village: ", villageValue);
            const targetIndex = input.indexOf("target=") + 7;
            const targetValue = input.substring(targetIndex, input.indexOf("]", targetIndex));
            console.log("Target: ", targetValue);
            return villageValue + '&' + targetValue + '&' + unitType + '&' + date.getTime() + '&'+(unitType=='snob'?'11':'8')+'&false&true&spear=MA==/sword=MA==/axe=MA==/archer=/spy=MA==/light=MA==/marcher=/heavy=MA==/ram=MA==/catapult=MA==/knight=MA==/snob=MA==/militia=MA=='
        }
        ).join('\n')
    }
    function copyTextToClipboard(text) {
        var textArea = document.createElement("textarea");
        textArea.style.position = 'fixed';
        textArea.style.top = 0;
        textArea.style.left = 0;
        textArea.style.width = '2em';
        textArea.style.height = '2em';
        textArea.style.padding = 0;
        textArea.style.border = 'none';
        textArea.style.outline = 'none';
        textArea.style.boxShadow = 'none';
        textArea.style.background = 'transparent';
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy')
        } catch (err) {
            prompt('Oops, unable to copy', text)
        }
        document.body.removeChild(textArea)
    }
    function updateUI(text) {
        let article = document.createElement("div");
        article.className = "col-md-12" //mt-2
        article.innerHTML = `<div class="card"><article class="card-group-item"><header class="card-header bg-dark"><h6 class="title">Planning - WB Fromat </h6></header><div class="filter-content"><div class="card-body"><!----><textarea id="WBF" cols="15" class="mt-2 w-100 form-control form-control-sm ng-untouched ng-pristine ng-valid" rows="5"></textarea></div></div></article></div>`
        document.querySelector('app-planning-result div.card').parentNode.before(article);
        document.querySelector('#WBF').value = text;
    }

    function tryN(callback, delay, tries) {
        if (tries && callback() !== true) {
            setTimeout(tryN.bind(this, callback, delay, tries - 1), delay);
        }
    }

    function addListner() {
        document.querySelectorAll("body > app-root > main > app-planner > app-advanced-planner > form > button, body > app-root > main > app-planner > app-noble-spam-planner > div > div.w-50 > button")[0].addEventListener("click", function() {
            console.log("Loading Plan:");
            setTimeout(()=>tryN(isPlannLoaded, 2000, 100),3000)
        });
    }

    function isPlannLoaded() {
        const panNobels = document.querySelectorAll("body > app-root > main > app-planner > app-advanced-planner > form > button, body > app-root > main > app-planner > app-noble-spam-planner > div > div.w-50 > button")[0].disabled
        if (!panNobels) {
            let isHere = document.querySelector("app-planning-result > div.col-md-12.mt-2.mb-3 > div > article > div > div > textarea")
            if (isHere != null && isHere.value != '') {
                let wbPlan = twFormatToWorkbench(isHere.value)
                updateUI(wbPlan);
                copyTextToClipboard(wbPlan);
            }
        }
        return !panNobels;

    }

    setTimeout(addListner, 1000)

}
)();
