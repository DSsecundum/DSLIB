function getDataProduction(groupId) {
    return new Promise((e, t) => {
            let n = game_data.link_base_pure + `overview_villages&mode=prod&group=${groupId}`
                , o = httpGet(n);
            const a = (new DOMParser).parseFromString(o, "text/html");
            let r = [];
            if ($(a).find(".paged-nav-item").parent().find("select").length > 0)
                Array.from($(a).find(".paged-nav-item").parent().find("select").find("option")).forEach(function (e) {
                    r.push(e.value)
                }),
                    r.pop();
            else if (a.getElementsByClassName("paged-nav-item").length > 0) {
                let e = 0;
                Array.from(a.getElementsByClassName("paged-nav-item")).forEach(function (t) {
                    let n = t.href;
                    n = n.split("page=")[0] + "page=" + e,
                        e++,
                        r.push(n)
                })
            } else
                r.push(n);
            r = r.reverse();
            let s = []
                , l = new Map;
            !function n(o) {
                let a;
                a = o.length > 0 ? o.pop() : "stop",
                    console.log(a);
                let i = (new Date).getTime();
                o.length >= 0 && "stop" != a ? $.ajax({
                    url: a,
                    method: "get",
                    success: e => {
                        const t = (new DOMParser).parseFromString(e, "text/html");
                        if ("desktop" == game_data.device) {
                            let e = Array.from($(t).find(".row_a, .row_b"));
                            for (let t = 0; t < e.length; t++) {
                                let n = e[t].getElementsByClassName("quickedit-vn")[0].innerText
                                    ,
                                    o = e[t].getElementsByClassName("quickedit-vn")[0].innerText.match(/[0-9]{3}\|[0-9]{3}/)[0]
                                    , a = e[t].getElementsByClassName("quickedit-vn")[0].getAttribute("data-id")
                                    , r = parseInt(e[t].getElementsByClassName("wood")[0].innerText.replace(".", ""))
                                    , i = parseInt(e[t].getElementsByClassName("stone")[0].innerText.replace(".", ""))
                                    , d = parseInt(e[t].getElementsByClassName("iron")[0].innerText.replace(".", ""))
                                    , c = parseInt(e[t].querySelector("a[href*='market']").innerText.split("/")[0])
                                    , m = parseInt(e[t].querySelector("a[href*='market']").innerText.split("/")[1])
                                    , u = parseInt(e[t].children[4].innerText)
                                    , g = parseInt(e[t].children[2].innerText.replace(".", ""))
                                    ,
                                    p = parseInt(e[t].children[6].innerText.split("/")[0]) / parseInt(e[t].children[6].innerText.split("/")[1])
                                    , h = {
                                        coord: o,
                                        id: a,
                                        wood: r,
                                        stone: i,
                                        iron: d,
                                        name: n,
                                        merchants: c,
                                        merchants_total: m,
                                        capacity: u,
                                        points: g,
                                    };
                                s.push(h),
                                    l.set(o, p)
                            }
                        } else {
                            let e = Array.from($(t).find("#production_table").find(".nowrap"));
                            for (let t = 0; t < e.length; t++) {
                                let n = e[t].previousElementSibling.children[0].innerText.trim()
                                    , o = e[t].previousElementSibling.children[0].innerText.match(/\d+\|\d+/)[0]
                                    ,
                                    a = e[t].previousElementSibling.getElementsByClassName("quickedit-vn")[0].getAttribute("data-id")
                                    , r = parseInt(e[t].getElementsByClassName("mwood")[0].innerText.replace(".", ""))
                                    , i = parseInt(e[t].getElementsByClassName("mstone")[0].innerText.replace(".", ""))
                                    , d = parseInt(e[t].getElementsByClassName("miron")[0].innerText.replace(".", ""))
                                    , c = parseInt(e[t].querySelector("a[href*='market']").innerText)
                                    , m = 500
                                    , u = parseInt(e[t].getElementsByClassName("ressources")[0].parentElement.innerText)
                                    , g = parseInt(e[t].previousElementSibling.children[1].innerText.replace(".", ""))
                                    ,
                                    p = parseInt(e[t].getElementsByClassName("population")[0].parentElement.innerText.split("/")[0]) / parseInt(e[t].getElementsByClassName("population")[0].parentElement.innerText.split("/")[1])
                                    , h = {
                                        coord: o,
                                        id: a,
                                        wood: r,
                                        stone: i,
                                        iron: d,
                                        name: n,
                                        merchants: c,
                                        merchants_total: m,
                                        capacity: u,
                                        points: g
                                    };
                                s.push(h),
                                    l.set(o, p)
                            }
                        }
                        let a = (new Date).getTime() - i;
                        console.log("wait: " + a),
                            window.setTimeout(function () {
                                n(r),
                                    UI.SuccessMessage("get production page: " + o.length)
                            }, 200 - a)
                    }
                    ,
                    error: e => {
                        t(e)
                    }
                }) : (console.log("list_production: herererre", s),
                    UI.SuccessMessage("done"),
                    e({
                        list_production: s,
                        map_farm_usage: l
                    }))
            }(r)
        }
    )
}

function getDataIncoming(groupId) {
    return new Promise((e, t) => {
            let n = game_data.link_base_pure + `overview_villages&mode=trader&type=all&group=${groupId}`
                , o = httpGet(n);
            const a = (new DOMParser).parseFromString(o, "text/html");
            let r = [];
            if ($(a).find(".paged-nav-item").parent().find("select").length > 0)
                Array.from($(a).find(".paged-nav-item").parent().find("select").find("option")).forEach(function (e) {
                    r.push(e.value)
                }),
                    r.pop();
            else if (a.getElementsByClassName("paged-nav-item").length > 0) {
                let e = 0;
                Array.from(a.getElementsByClassName("paged-nav-item")).forEach(function (t) {
                    let n = t.href;
                    n = n.split("page=")[0] + "page=" + e,
                        e++,
                        r.push(n)
                })
            } else
                r.push(n);
            r = r.reverse();
            let s = new Map;
            !function n(o) {
                let a;
                a = o.length > 0 ? o.pop() : "stop",
                    console.log(a);
                let l = (new Date).getTime();
                o.length >= 0 && "stop" != a ? $.ajax({
                    url: a,
                    method: "get",
                    success: e => {
                        const t = (new DOMParser).parseFromString(e, "text/html");
                        let a = Array.from($(t).find(".row_a, .row_b"));
                        for (let e = 0; e < a.length; e++) {
                            let t = "";
                            t = "desktop" == game_data.device ? extractSingleCoord(a[e].children[5].innerText, 0) : extractSingleCoord(a[e].children[3].innerText, 1);
                            so = "desktop" == game_data.device ? extractSingleCoord(a[e].children[3].innerText, 0) : extractSingleCoord(a[e].children[2].innerText, 1);
                            me = "desktop" == game_data.device ? parseInt(a[e].children[7].innerText) : parseInt(a[e].children[5].innerText);
                            let n = parseInt($(a[e]).find(".wood").parent().text().replace(".", ""))
                                , o = parseInt($(a[e]).find(".stone").parent().text().replace(".", ""))
                                , r = parseInt($(a[e]).find(".iron").parent().text().replace(".", ""))
                                , l = { // stored by destination coord
                                scoord: so,
                                wood: n = 1 == Number.isNaN(n) ? 0 : n,
                                stone: o = 1 == Number.isNaN(o) ? 0 : o,
                                iron: r = 1 == Number.isNaN(r) ? 0 : r,
                                merchants: me,
                            };
                            if (s.has(t)) {
                                let e = s.get(t);
                                e.push(l);
                                s.set(t, e);
                            } else {
                                s.set(t, []);
                                let e = s.get(t);
                                e.push(l);
                                s.set(t, e);
                            }
                        }
                        let i = (new Date).getTime() - l;
                        console.log("wait: " + i),
                            window.setTimeout(function () {
                                n(r),
                                    UI.SuccessMessage("get incoming page: " + o.length)
                            }, 200 - i)
                    }
                    ,
                    error: e => {
                        t(e)
                    }
                }) : (UI.SuccessMessage("done"),
                    e(s))
            }(r)
        }
    )
}

function httpGet(e) {
    var t = new XMLHttpRequest;
    return t.open("GET", e, !1),
        t.send(null),
        t.responseText
}

function extractSingleCoord(text, n) {
    try {
        return text.match(/[0-9]{3}\|[0-9]{3}/)[n]
    } catch (e) {
        return text;
    }
}

// Constants
var travelTimePerUnit = 3.75;
// in minutes
var tradersSendingFrequency = 20;
// in minutes

// Function to calculate the distance between two coordinates
function calculateDistance(coord1, coord2) {
    const [x1, y1] = coord1.split('|').map(Number);
    const [x2, y2] = coord2.split('|').map(Number);
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// Function to Calculate the average planned throughput
function averagePlannedThroughput(villagesData, allRoutes) {
    calcPlannedResPerH(villagesData, allRoutes)
    const sumThroughputValues = villagesData.reduce((sum, village) => sum + village.acutalResPErH, 0);
    //console.log("Average Throughput to per Hour: " + Math.round(averageThroughput));
    return sumThroughputValues / villagesData.length - 1;
}

// Function to calculate the average throughput per hour for 1 trader on a route
function calculateAverageThroughputPerHourPerTrader(distance) {
    const timeRequired = Math.ceil(distance * travelTimePerUnit / tradersSendingFrequency) * tradersSendingFrequency;
    return Math.floor(60 / timeRequired * 1000);
}

var villMap = new Map();

function recalcRoutes(village) {
    const resPH = village.routes.reduce((sum, route) => sum + route.merchants * route.resPerH, 0);
    village.plannedResPerH = resPH
    village.acutalResPErH = village.plannedResPerH - village.receivedResPerH;
}


function calcPlannedResPerH(villages, allRoutes) {
    villages.forEach(village => {
            recalcRoutes(village);
        }
    );
}

// Function to generate all possible routes from one village to another
function generateRoutes(villages, centralVillage) {
    const routes = [];

    villages.forEach(sourceVillage => {
            // Initialize if not present
            // Initialize an empty array for routes from this village
            sourceVillage.routes = [];
            // Add resPerH to destination village as receivedResPerH
            sourceVillage.receivedResPerH = 0;
            sourceVillage.plannedResPerH = 0;
            sourceVillage.acutalResPErH = 0;
            sourceVillage.improvementPossible = true;
            //sourceVillage.merchants = 235;
            //for testing
            villages.forEach(destinationVillage => {
                    // Check if the destination is closer than the source
                    let route;
                    if (sourceVillage.distanceToCentral > destinationVillage.distanceToCentral) {
                        const sDistance = calculateDistance(sourceVillage.coord, destinationVillage.coord);
                        const cDistance = calculateDistance(destinationVillage.coord, centralVillage.coord);
                        const resPH = calculateAverageThroughputPerHourPerTrader(sDistance);

                        // Create a route object
                        route = {
                            source: sourceVillage.id,
                            destination: destinationVillage.id,
                            sDistance: sDistance,
                            // Rename distance to sDistance
                            cDistance: cDistance,
                            resPerH: resPH,
                            merchants: 0,
                            distance: sDistance,
                            // Initialize plannedTraders
                            dcoord: destinationVillage.coord,
                            scoord: sourceVillage.coord,
                            launchMerchants: 0,
                        };

                        // Add route to the routes list of the source village
                        sourceVillage.routes.push(route);

                        // Push the route to the global routes array
                        routes.push(route);
                        // Add the resPerH of the direct route to the village as originalResPerH, also allocate all initial traders
                        if (route.destination === centralVillage.id) {
                            sourceVillage.directRoute = route;
                            sourceVillage.originalResPerH = route.resPerH;
                            route.merchants = sourceVillage.merchants_total;
                        }
                    }
                }
            );

        }
    );

    return routes;
}

function allocateTraders(villages, centralVillage, allRoutes) {
    centralVillage.improvementPossible = false;
    const maxIterations = 1000000;
    // You can adjust this based on your needs
    let iteration = 0;
    let improvementPossible = true;

    while (improvementPossible && iteration < maxIterations) {
        console.group("Iteration " + (iteration + 1));
        // Calculate average throughput
        const averageThroughput = averagePlannedThroughput(villages, allRoutes);
        let slowVillages = villages.filter((village) => {
                return village.id !== centralVillage.id && village.acutalResPErH < averageThroughput && village.directRoute.merchants > 0 && village.improvementPossible == true;
            }
        ).sort((a, b) => a.acutalResPErH - b.acutalResPErH);
        let nextSlowestResPerH = averageThroughput;
        if (slowVillages.length == 0) {
            improvementPossible = false;
            break;
        } else if (slowVillages.length > 1) {
            nextSlowestResPerH = Math.min(slowVillages[1].acutalResPErH, averageThroughput)
        }
        // Filter routes with a destination village that has a better acutalResPErH and sort it by that value
        let slowVillage = slowVillages[0];
        console.log("Slowest = " + Math.abs(slowVillage.acutalResPErH) + " -next-> " + Math.abs(nextSlowestResPerH));
        let betterRoutes = slowVillage.routes.filter(route => {
            return (route.destination !== centralVillage.id && villMap.get(route.destination).acutalResPErH > averageThroughput && route.resPerH > slowVillage.originalResPerH)
        }).sort((r1, r2) => {
                return r1.sDistance + r1.cDistance - r2.sDistance - r2.cDistance;
            }
        )

        if (betterRoutes.length) {
            let firstBestRoute = betterRoutes[0];
            let toleranceDistance = Math.ceil((firstBestRoute.sDistance + firstBestRoute.cDistance) * 10) / 10 + 2
            firstBestRoute = betterRoutes.filter(r => r.sDistance + r.cDistance <= toleranceDistance).sort((r1, r2) => r2.resPerH - r1.resPerH)[0];
            //firstBestRoute = betterRoutes.filter(r=>r.sDistance + r.cDistance <= toleranceDistance).sort((r1,r2)=>villMap.get(r2.destination).acutalResPErH - villMap.get(r1.destination).acutalResPErH )[0];

            let amountTraders = Math.min(Math.ceil((nextSlowestResPerH - slowVillage.acutalResPErH) / slowVillage.resPerHToCentral),Math.floor((villMap.get(firstBestRoute.destination).acutalResPErH-averageThroughput)/firstBestRoute.resPerH));
            amountTraders = amountTraders == 0 ? 5 : amountTraders;
            let improvement = Math.abs(firstBestRoute.resPerH * amountTraders - amountTraders * slowVillage.originalResPerH);
            let worsening = Math.abs(villMap.get(firstBestRoute.destination).acutalResPErH - firstBestRoute.resPerH * amountTraders);
            console.log(slowVillage.coord + " -> " + firstBestRoute.dcoord);
            console.log("Improvement = " + improvement + "   Worsening = " + worsening + "(" + -firstBestRoute.resPerH * amountTraders + ")");

            if(villMap.get(firstBestRoute.destination).acutalResPErH- firstBestRoute.resPerH * amountTraders<0) {
                debugger;
            }

            amountTraders = Math.min(amountTraders, slowVillage.directRoute.merchants);
            slowVillage.directRoute.merchants -= amountTraders;
            firstBestRoute.merchants += amountTraders;
            villages.filter(v => v.id == firstBestRoute.destination).forEach(v => v.receivedResPerH += amountTraders * firstBestRoute.resPerH);
        } else {
            slowVillage.improvementPossible = false
        }

        iteration++;
        console.groupEnd();
    }
    ;
}

async function start(middleVillage, group) {

    let centralCoordinates = null;
    let villagesData = []
    let transportData = null;
    let centralVillage = null;
    let allRoutes = [];

    centralCoordinates = middleVillage.trim();
    let {list_production: r, map_farm_usage: s} = await getDataProduction(group.id).catch(e => alert(e));
    let l = await getDataIncoming(group.id).catch(e => alert(e))
    villagesData = r;
    transportData = l;
    console.log("list_production", r),
        console.log("map_farm_usage", s),
        console.log("map_incoming", l),
        centralVillage = villagesData.filter(v => v.coord == centralCoordinates)[0];

    if(typeof centralVillage ==  'undefined') {
        UI.ErrorMessage("Mint Village not  in Group")
    } else {

        // Add resPerH to central village and plannedTrader to each village's data structure
        villagesData.forEach(village => {
            village.distanceToCentral = calculateDistance(village.coord, centralCoordinates);
            village.resPerHToCentral = calculateAverageThroughputPerHourPerTrader(village.distanceToCentral);
            villMap.set(village.id, village)
        }
        );


        allRoutes = await calc(allRoutes, centralVillage, villagesData);
        drawRoutes(allRoutes, centralVillage, villagesData);
        let e = generateLaunchList(villagesData, allRoutes, transportData)
        await createTable(e, null, villagesData, null)
    }
}

//await start('453|449', {id:0,name:"Deff"})

let beforeMap = new Map;
let afterMap = new Map;
let bCluster = [];
let aCluster = [];

async function calc(allRoutes, centralVillage, villagesData) {
    // Generate all possible routes
    allRoutes = generateRoutes(villagesData, centralVillage);

    const before = averagePlannedThroughput(villagesData, allRoutes);
    villagesData.forEach(village => {
        beforeMap.set(village.coord, village.acutalResPErH);
    }
    );

    // Call the function to allocate traders
    allocateTraders(villagesData, centralVillage, allRoutes);

    const after = averagePlannedThroughput(villagesData, allRoutes);
    villagesData.forEach(village => {
        afterMap.set(village.coord, village.acutalResPErH);
    }
    );

    villagesData.sort((a, b) => (a.acutalResPErH) - (b.acutalResPErH)).forEach(v => console.log(v.coord + ' : ' + afterMap.get(v.coord) + " <-- " + beforeMap.get(v.coord) + " = " + (afterMap.get(v.coord) - beforeMap.get(v.coord)) + " | " + v.distanceToCentral));

    console.log(villagesData);
    console.log(allRoutes.filter(r => r.merchants > 0));

    console.log("Average thourghput Before: " + before);
    console.log("Max:", Math.max(...beforeMap.values()));
    console.log("Min:", Math.min(...(new Map([...beforeMap].filter(([k, v]) => v > 0))).values()));

    console.log("Average thourghput After: " + after);
    console.log("Max:", Math.max(...afterMap.values()));
    console.log("Min:", Math.min(...(new Map([...afterMap].filter(([k, v]) => v > 0))).values()));

    bCluster = kMeansClusteringWithStatsForMap(beforeMap, 2);
    aCluster = kMeansClusteringWithStatsForMap(afterMap, 2);

    console.log("Clusters:", aCluster);

    return allRoutes;
}

function kMeansClusteringWithStatsForMap(inputMap, k) {
    // Extract values from the map
    var values = Array.from(inputMap.values());

    // Sort the values in ascending order
    values.sort(function (a, b) {
        return a - b;
    });

    // Initialize clusters with the first k values
    var clusters = values.slice(0, k).map(function (value) {
        return [value];
    });

    // Assign each remaining value to the cluster with the closest mean
    for (var i = k; i < values.length; i++) {
        var value = values[i];
        var closestClusterIndex = findClosestClusterIndex(value, clusters);
        clusters[closestClusterIndex].push(value);
    }

    // Calculate statistics for each cluster
    var clusterObjects = clusters.map(function (cluster, index) {
        return {
            keys: [],
            values: cluster,
            stats: {
                average: calculateMean(cluster),
                min: Math.min(...cluster),
                max: Math.max(...cluster)
            },
            index: index // Add cluster index for identification
        };
    });

    // Map keys to corresponding clusters and add stats
    inputMap.forEach(function (value, key) {
        var clusterIndex = findClosestClusterIndex(value, clusters);
        clusterObjects[clusterIndex].keys.push(key);
        clusterObjects[clusterIndex].values.push(value);
    });

    return clusterObjects;
}

function findClosestClusterIndex(value, clusters) {
    var minDistance = Number.MAX_SAFE_INTEGER;
    var closestIndex = 0;

    for (var i = 0; i < clusters.length; i++) {
        var clusterMean = calculateMean(clusters[i]);
        var distance = Math.abs(value - clusterMean);

        if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
        }
    }

    return closestIndex;
}

function calculateMean(array) {
    return array.reduce(function (sum, value) {
        return sum + value;
        }, 0) / array.length;
}

function shadeColor(color, percent) {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = Math.round(R)
    G = Math.round(G)
    B = Math.round(B)

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

const RGB_Linear_Shade = (p, c) => {
    var i = parseInt, r = Math.round, [a, b, c, d] = c.split(","), P = p < 0, t = P ? 0 : 255 * p,
        P = P ? 1 + p : 1 - p;
    return "rgb" + (d ? "a(" : "(") + r(i(a[3] == "a" ? a.slice(5) : a.slice(4)) * P + t) + "," + r(i(b) * P + t) + "," + r(i(c) * P + t) + (d ? "," + d : ")");
}

function RGB_Linear_Blend(p, c0, c1) {
    var i = parseInt
        , r = Math.round
        , P = 1 - p
        , [a, b, c, d] = c0.split(",")
        , [e, f, g, h] = c1.split(",")
        , x = d || h
        , j = x ? "," + (!d ? h : !h ? d : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ")") : ")";
    return "rgb" + (x ? "a(" : "(") + r(i(a[3] == "a" ? a.slice(5) : a.slice(4)) * P + i(e[3] == "a" ? e.slice(5) : e.slice(4)) * p) + "," + r(i(b) * P + i(f) * p) + "," + r(i(c) * P + i(g) * p) + j;
}

var textColor = "#ffffff"
if ("undefined" != typeof TWMap)
    var ogSpawnSector = TWMap.mapHandler.spawnSector;

function drawRoutes(routes, centralVillage, villagesData) {

    if("undefined" == typeof TWMap) {return 0;}
    routes = routes.filter(r => r.merchants > 0);
    $.getScript("https://shinko-to-kuma.com/scripts/mapSdk.js").done(function () {
        routes.forEach(r => {
            let color = r.destination != centralVillage.id ? '#FF0000' : '#00FF00'
            console.log('draw')
            const [sx, sy] = r.scoord.split('|');
            const [dx, dy] = r.dcoord.split('|');
            MapSdk.lines.push({
                x1: sx,
                y1: sy,
                x2: dx,
                y2: dy,
                styling: {
                    main: {
                        "strokeStyle": color,
                        "lineWidth": 2
                    },
                    mini: {
                        "strokeStyle": color,
                        "lineWidth": 2
                    }
                },
                drawOnMini: true,
                drawOnMap: true,
            });
        }
        );
        MapSdk.mapOverlay.reload();
        if ("undefined" != typeof TWMap)
            ogSpawnSector = TWMap.mapHandler.spawnSector;
        if ("undefined" != typeof TWMap) {
            console.log("map page"),
                document.getElementById("map_container").remove(),
                TWMap.mapHandler.spawnSector = ogSpawnSector;
            addInfoOnMap(villagesData)
            TWMap.init()
        }

    });

}

function addInfoOnMap(villages) {
    let actualRess = villages.map((i) => i.acutalResPErH).filter(v => v > 0);
    const max = Math.max(...actualRess);
    const min = Math.min(...actualRess);
    //const average = actualRess.reduce((pv, cv) => pv + cv, 0)/actualRess.length;
    const average = actualRess[actualRess.length / 2];

    let e = new Map;
    villages.forEach(village => {
        e.set(village.id + "", {
            label_cluster: 0,
            villageId: village.id + "",
            total_resources_get: village.plannedResPerH,
            total_resources_send: village.receivedResPerH,
            p: village.acutalResPErH <= average ? 0.8 : 0.2,
        });
    }
    )
    let n = !0;
    TWMap.mapHandler.spawnSector = function (o, a) {
        ogSpawnSector.call(TWMap.mapHandler, o, a),
            console.log("spawn area map"),
        1 == n && (n = !1,
            window.setTimeout(() => {
                let o = TWMap.map._visibleSectors;
                Object.keys(o).forEach(n => {
                    let a = o[n]._elements;
                    Object.keys(a).forEach(n => {
                        let o = a[n].id.match(/\d+/);
                        if (null != o && e.has(o[0])) {
                            let n = e.get(o[0]);
                            createMapInfo(n)
                        }
                    }
                    )
                }
                ),
                        n = !0
            }
                              , 50))
    }
}

function createMapInfo(e) {
    try {
        if (console.log("smartDraw"),
        null == document.getElementById(`info_extra${e.villageId}`)) {
            let n = "#00FF00"
            , o = "#FF0000"
            , a = document.getElementById(`map_village_${e.villageId}`)
            , r = document.getElementById(`map_village_${e.villageId}`).parentElement
            , s = a.style.left
            , l = a.style.top;
            for (; null != document.getElementById(`map_icons_${e.villageId}`);)
                document.getElementById(`map_icons_${e.villageId}`).remove();
            null != document.getElementById(`map_cmdicons_${e.villageId}_0`) && document.getElementById(`map_cmdicons_${e.villageId}_0`).remove(),
            null != document.getElementById(`map_cmdicons_${e.villageId}_1`) && document.getElementById(`map_cmdicons_${e.villageId}_1`).remove();
            let i = `\n                <div class="border_info" id="info_extra${e.villageId}" style="position:absolute;left:${s};top:${l};width:51px;height:36px;z-index:10; ${`background-color:${RGB_Linear_Shade(e.p, 'rgba(0,18,160,0.7)')};outline:${RGB_Linear_Shade(e.p, 'rgb(0,18,160)')} solid 2px`}"></div>\n                <center><font color="${textColor}"  class="shadow20" style="position:absolute;left:${s};top:${l};width:14px;height:14px;z-index:11;margin-left:0px;; font-size: 12px">nr:${e.label_cluster} </font></center>\n                <center><font color="${n}"  class="shadow20" style="position:absolute;left:${s};top:${l};width:14px;height:14px;z-index:11;margin-left:0px;margin-top:11px; font-size: 12px">${parseInt(e.total_resources_get / 1e3)}k </font></center>\n                <center><font color="${o}"  class="shadow20" style="position:absolute;left:${s};top:${l};width:14px;height:14px;z-index:11;margin-left:0px;margin-top:23px; font-size: 12px">${parseInt(e.total_resources_send / 1e3)}k </font></center>\n                `;
            $(i).appendTo(r)
        }
    } catch (e) {
    }
}

function generateLaunchList(villagesData, routes, transport) {
    let x = []; // single trades
    villagesData.forEach((village) => {
        // get min distribution multiplier
        let max = village.merchants;
        let res = [village.wood, village.stone, village.iron];
        let res_multiplier = res.map((x, i) => parseInt(x / [28, 30, 25][i]));
        res_multiplier.push(parseInt(max * 1000 / 83));
        let multiplier = Math.min(...res_multiplier);
        //filter best routes first.
        village.routes = village.routes.filter(r => r.merchants > 0).sort((r1, r2) => r2.resPerH - r1.resPerH);
        village.routes.forEach(route => {
            let ttoD = transport.get(route.dcoord);
            let ttoS = transport.get(route.scoord);
            let ttod = typeof ttoD != 'undefined' ? ttoD.filter(t => t.scoord == route.scoord).reduce((sum, mer) => {
                return sum + (typeof mer != 'undefined' ? mer : 0)
            }, 0) : 0;
            let ttos = typeof ttoS != 'undefined' ? ttoS.filter(t => t.scoord == route.dcoord).reduce((sum, mer) => {
                return sum + (typeof mer != 'undefined' ? mer : 0)
            }, 0) : 0;
            let freeMerchants = route.merchants - ttod - ttos;
            if (freeMerchants > 0 && multiplier > 11) {
                let rMulti = parseInt(freeMerchants * 1000 / 83)
                rMulti = Math.min(multiplier, rMulti)
                while (rMulti * 83 % 1000 < 900 && rMulti > 0) {
                    rMulti--;
                }
                let [c, m, u] = [28, 30, 25].map(x => x * rMulti);
                multiplier -= rMulti;
                route.merchants -= freeMerchants
                x.push({
                    total_send: c + m + u,
                    wood: c,
                    stone: m,
                    iron: u,
                    coord_origin: route.scoord,
                    name_origin: "haha",
                    id_destination: route.destination,
                    id_origin: route.source,
                    coord_destination: route.dcoord,
                    name_destination: villMap.get(route.destination).name,
                    distance: route.distance
                })
            }
        })
    });

    let A = new Map;
    for (let e = 0; e < x.length; e++) {
        let t = x[e].id_destination
        , n = x[e].id_origin
        , o = `resource[${n}][wood]`
        , a = `resource[${n}][stone]`
        , r = `resource[${n}][iron]`
        , s = {};
        if (A.has(t)) {
            let n = A.get(t);
            n.send_resources[o] = x[e].wood,
                n.send_resources[a] = x[e].stone,
                n.send_resources[r] = x[e].iron,
                n.total_send += x[e].total_send,
                n.total_wood += x[e].wood,
                n.total_stone += x[e].stone,
                n.total_iron += x[e].iron,
                n.distance = Math.max(n.distance, x[e].distance),
                A.set(t, n)
        } else
            s[o] = x[e].wood,
                s[a] = x[e].stone,
                s[r] = x[e].iron,
                A.set(t, {
                    target_id: t,
                    coord_destination: x[e].coord_destination,
                    name_destination: x[e].name_destination,
                    send_resources: s,
                    total_send: x[e].total_send,
                    total_wood: x[e].wood,
                    total_stone: x[e].stone,
                    total_iron: x[e].iron,
                    distance: x[e].distance
                });
    }
    let D = Array.from(A.entries()).map(e => e[1]);
    D.sort((e, t) => e.total_send > t.total_send ? -1 : e.total_send < t.total_send ? 1 : 0),
        console.log("list_launches_mass", D);
    return D;
}

//###########################################################################

var headerWood = "#001a33",
    headerWoodEven = "#002e5a",
    headerStone = "#3b3b00",
    headerStoneEven = "#626200",
    headerIron = "#1e003b",
    headerIronEven = "#3c0076",
    defaultTheme = '[["theme1",["#E0E0E0","#000000","#C5979D","#2B193D","#2C365E","#484D6D","#4B8F8C","50"]],["currentTheme","theme1"],["theme2",["#E0E0E0","#000000","#F76F8E","#113537","#37505C","#445552","#294D4A","50"]],["theme3",["#E0E0E0","#000000","#ACFCD9","#190933","#665687","#7C77B9","#623B5A","50"]],["theme4",["#E0E0E0","#000000","#181F1C","#60712F","#274029","#315C2B","#214F4B","50"]],["theme5",["#E0E0E0","#000000","#9AD1D4","#007EA7","#003249","#1F5673","#1C448E","50"]],["theme6",["#E0E0E0","#000000","#EA8C55","#81171B","#540804","#710627","#9E1946","50"]],["theme7",["#E0E0E0","#000000","#754043","#37423D","#171614","#3A2618","#523A34","50"]],["theme8",["#E0E0E0","#000000","#9E0031","#8E0045","#44001A","#600047","#770058","50"]],["theme9",["#E0E0E0","#000000","#C1BDB3","#5F5B6B","#323031","#3D3B3C","#575366","50"]],["theme10",["#E0E0E0","#000000","#E6BCCD","#29274C","#012A36","#14453D","#7E52A0","50"]]]',
    localStorageThemeName = "resBalancerTheme";
if (null != localStorage.getItem(localStorageThemeName)) {
    let e = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)));
    Array.from(e.keys()).forEach(t => {
        if ("currentTheme" != t) {
            let n = e.get(t);
            7 == n.length && (n.push(50),
                e.set(t, n))
        }
    }),
        localStorage.setItem(localStorageThemeName, JSON.stringify(Array.from(e.entries())))
}
var backgroundInput = "#000000",
    borderColor = "#C5979D",
    backgroundContainer = "#2B193D",
    backgroundHeader = "#2C365E",
    backgroundMainTable = "#484D6D",
    backgroundInnerTable = "#4B8F8C",
    widthInterface = 50,
    headerColorDarken = -50,
    headerColorAlternateTable = -30,
    headerColorAlternateHover = 30,
    backgroundAlternateTableEven = backgroundContainer,
    backgroundAlternateTableOdd = getColorDarker(backgroundContainer, headerColorAlternateTable);

async function main() {
    initializationTheme(),
        await $.getScript("https://dl.dropboxusercontent.com/s/i5c0so9hwsizogm/styleCSSGlobal.js?dl=0"),
        createMainInterface(),
        changeTheme()
}

function getColorDarker(e, t) {
    let n = e;
    3 === (n = n.replace(/^\s*#|\s*$/g, "")).length && (n = n.replace(/(.)/g, "$1$1"));
    let o = parseInt(n.substr(0, 2), 16),
    a = parseInt(n.substr(2, 2), 16),
    r = parseInt(n.substr(4, 2), 16);
    const s = (100 + t) / 100;
    return o = Math.round(Math.min(255, Math.max(0, o * s))),
        a = Math.round(Math.min(255, Math.max(0, a * s))),
        r = Math.round(Math.min(255, Math.max(0, r * s))),
        `#${("00" + o.toString(16)).slice(-2).toUpperCase()}${("00" + a.toString(16)).slice(-2).toUpperCase()}${("00" + r.toString(16)).slice(-2).toUpperCase()}`
}

function createMainInterface() {
    console.log("createInterface");
    let e = '\n    \n    <div id="div_container" class="scriptContainer" >\n        ' +
        '<div class="scriptHeader">\n' +
        '            <div style=" margin-top:10px;"><h2>Opti Mint Routes</h2></div>\n' +
        '            <div style="position:absolute;top:10px;right: 10px;"><a href="#" onclick="$(\'#div_container\').remove()"><img src="https://img.icons8.com/emoji/24/000000/cross-mark-button-emoji.png"/></a></div>\n' +
        '            <div style="position:absolute;top:8px;right: 35px;" id="div_minimize"><a href="#"><img src="https://img.icons8.com/plasticine/28/000000/minimize-window.png"/></a></div>\n' +
        '            <div style="position:absolute;top:10px;right: 60px;" id="div_theme"><a href="#" onclick="$(\'#theme_settings\').toggle()"><img src="https://img.icons8.com/material-sharp/24/fa314a/change-theme.png"/></a></div>\n' +
        '       </div>\n' +
        '        <div id="theme_settings"></div>\n\n' +
        '        <div id="div_body" style="height: 600px; overflow-y: auto">\n            <center>\n' +
        '                <table id="table_main"  class="scriptTable">\n' +
        '                    <tr>\n' +
        '                        <td>setting name</td>\n' +
        '                        <td>setting value</td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td>reserve warehouse</td>\n' +
        '                        <td>\n' +
        '                            <div style="display:flex;justify-content: center; align-items: center;   ">\n' +
        '                                <div><input type="number" id="nr_warehouse_reserve" class="scriptInput" placeholder="5" value="5"></div>\n' +
        '                                <div><a href="#" onclick="UI.InfoMessage(\'how many warehouse capacity do you want to keep home\',4000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width: 13px; height: 13px"/></a></div>\n' +
        '                            </div>\n' +
        '                        </td>\n' +
        '                    </tr> \n' +
        '                    <tr>\n' +
        '                        <td>request interval[min]</td>\n' +
        '                        <td>\n' +
        '                            <div style="display:flex;justify-content: center; align-items: center;">\n' +
        '                                <div><input type="number" id="nr_time_interval" class="scriptInput" min="5" placeholder="30" value="30"></div>\n' +
        '                                <div><a href="#" onclick="UI.InfoMessage(`Set to the frequency you will run this script to request resources`,15000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width: 13px; height: 13px"/></a></div>\n' +
        '                            </div>\n' +
        '                        </td>\n' +
        '                    </tr> \n\n' +
        '                    <tr>\n' +
        '                        <td>group id</td>\n' +
        '                        <td>\n' +
        '                            <div style="display:flex;justify-content: center; align-items: center;">\n' +
        `                                <div><input type="number" id="nr_group_id" class="scriptInput" placeholder="1" value='${game_data.group_id}'></div>\n` +
        '                                <div><a href="#" onclick="UI.InfoMessage(`the group id, can be found in the link adress`,20000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width: 13px; height: 13px"/></a></div>\n' +
        '                            </div>\n' +
        '                        </td>\n' +
        '                    </tr>\n\n' +
        '                    <tr>\n' +
        '                        <td>merchant travel time[min]</td>\n' +
        '                        <td>\n' +
        '                            <div style="display:flex;justify-content: center; align-items: center;">\n' +
        '                                <div><center><input type="number" id="nr_mtravel_time" class="scriptInput" placeholder="3.75" value="3.75"></div>\n' +
        '                                <div><a href="#" onclick="UI.InfoMessage(`minutes it takes a merchant to travel one field (example: 3.75)`,20000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width: 13px; height: 13px"/></a></div>\n' +
        '                            </div>\n' +
        '                        </td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td>mint village</td>\n' +
        '                        <td>\n' +
        '                            <div style="display:flex;justify-content: center; align-items: center;">\n' +
        '                                <div><center><input type="string" id="coord_mint_village" class="scriptInput" placeholder="xxx|yyy" value=""></div>\n' +
        '                                <div><a href="#" onclick="UI.InfoMessage(`coords of the mint village xxx|yyy`,20000)"><img src="https://dsen.innogamescdn.com/asset/dbeaf8db/graphic/questionmark.png" style="width: 13px; height: 13px"/></a></div>\n' +
        '                            </div>\n' +
        '                        </td>\n' +
        '                    </tr>\n' +
        '                </table>\n            </center>\n\n            <center>\n' +
        '                <input class="btn evt-confirm-btn btn-confirm-yes" type="button" onclick="go()" style="margin:10px" value="start">\n            </center>\n\n' +
        '            <div id="div_tables" hidden>\n' +
        '                <center><div id="table_stats" style="width:100%"></div></center><br>\n' +
        '                <center><div id="table_view" style="height:500px;width:100%;overflow:auto"></div></center>\n' +
        '            </div>\n' +
        '        </div>\n\n \n' +
        '        <div class="scriptFooter">\n            <div style=" margin-top:5px;"><h5>made by secundum</h5></div>\n        </div>\n    </div>';
    if ($("#div_container").remove(),
        $("#contentContainer").eq(0).prepend(e),
        $("#mobileContent").eq(0).prepend(e),
    "desktop" != game_data.device && $("#div_body").css("height", "500px"),
        $("#div_container").css("position", "fixed"),
        $("#div_container").draggable(),
    "pt_PT" == game_data.locale && $("#tr_merchant_capacity").show(),
        $("#div_minimize").on("click", () => {
            Math.ceil($("#div_container").width() / $("body").width() * 100) >= widthInterface ? ($("#div_container").css({
                width: "10%"
            }),
                $("#div_body").hide()) : ($("#div_container").css({
                    width: `${widthInterface}%`
                }),
                $("#div_body").show())
        }),
    null != localStorage.getItem(game_data.world + "settings_optiMint")) {
        let e = JSON.parse(localStorage.getItem(game_data.world + "settings_optiMint"));
        $("#div_container input[type=number],#div_container input[type=string]").each(function (t, n) {
            if(t==4 && null != localStorage.getItem(game_data.world+':'+game_data.group_id + "settings_optiMint")){
                this.value = JSON.parse(localStorage.getItem(game_data.world+':'+game_data.group_id + "settings_optiMint"));
            } else if (t==2) {
                this.value = game_data.group_id
            } else {
                this.value = e[t]
            }
        })

    }
    $("#div_container input[type=number],#div_container input[type=string]").on("click input change", () => {
        console.log("save settings");
        let e = [];
        $("#div_container input[type=number],#div_container input[type=string]").each(function (t, n) {
            var v = this.value;
            e.push(v)
            //save village according to current group
            if(t==4){
                localStorage.setItem(game_data.world+':'+game_data.group_id + "settings_optiMint",JSON.stringify(this.value));
            }
        });
        let t = JSON.stringify(e),
        n = localStorage.getItem(game_data.world + "settings_optiMint");
        console.log(t),
            console.log(n),
        t != n && localStorage.setItem(game_data.world + "settings_optiMint", t)
    })
}

function changeTheme() {
    let e = `\n    <h3 style="color:${textColor};padding-left:10px;padding-top:5px">after theme is selected run the script again<h3>\n    <table class="scriptTable" >\n        \n        <tr>\n            <td>\n                <select  id="select_theme">\n                    <option value="theme1">theme1</option>\n                    <option value="theme2">theme2</option>\n                    <option value="theme3">theme3</option>\n                    <option value="theme4">theme4</option>\n                    <option value="theme5">theme5</option>\n                    <option value="theme6">theme6</option>\n                    <option value="theme7">theme7</option>\n                    <option value="theme8">theme8</option>\n                    <option value="theme9">theme9</option>\n                    <option value="theme10">theme10</option>\n                </select>\n            </td>\n            <td>value</td>\n            <td >color hex</td>\n        </tr>\n        <tr>\n            <td>textColor</td>\n            <td style="background-color:${textColor}" class="td_background"></td>\n            <td><input type="text" class="scriptInput input_theme" value="${textColor}"></td>\n        </tr>\n        <tr>\n            <td>backgroundInput</td>\n            <td style="background-color:${backgroundInput}" class="td_background"></td>\n            <td><input type="text" class="scriptInput input_theme" value="${backgroundInput}"></td>\n        </tr>\n        <tr>\n            <td>borderColor</td>\n            <td style="background-color:${borderColor}" class="td_background"></td>\n            <td><input type="text" class="scriptInput input_theme" value="${borderColor}"></td>\n        </tr>\n        <tr>\n            <td>backgroundContainer</td>\n            <td style="background-color:${backgroundContainer}" class="td_background"></td>\n            <td><input type="text" class="scriptInput input_theme" value="${backgroundContainer}"></td>\n        </tr>\n        <tr>\n            <td>backgroundHeader</td>\n            <td style="background-color:${backgroundHeader}" class="td_background"></td>\n            <td><input type="text" class="scriptInput input_theme" value="${backgroundHeader}"></td>\n        </tr>\n        <tr>\n            <td>backgroundMainTable</td>\n            <td style="background-color:${backgroundMainTable}" class="td_background"></td>\n            <td><input type="text" class="scriptInput input_theme" value="${backgroundMainTable}"></td>\n        </tr>\n        <tr>\n            <td>backgroundInnerTable</td>\n            <td style="background-color:${backgroundInnerTable}" class="td_background"></td>\n            <td><input type="text" class="scriptInput input_theme" value="${backgroundInnerTable}"></td>\n        </tr>\n        <tr>\n            <td>widthInterface</td>\n            <td><input type="range" min="25" max="100" class="slider input_theme" id="input_slider_width" value="${widthInterface}"></td>\n            <td id="td_width">${widthInterface}%</td>\n        </tr>\n        <tr >\n            <td><input class="btn evt-confirm-btn btn-confirm-yes" type="button" id="btn_save_theme" value="Save"></td>\n            <td><input class="btn evt-confirm-btn btn-confirm-yes" type="button" id="btn_reset_theme" value="Default themes"></td>\n            <td></td>\n        </tr>\n\n    </table>\n    `;
    $("#theme_settings").append(e),
        $("#theme_settings").hide();
    let t = "",
    n = [],
    o = new Map;
    if ($("#select_theme").on("change", () => {
        null != localStorage.getItem(localStorageThemeName) && (t = $("#select_theme").find(":selected").text(),
            n = Array.from($(".input_theme")).map(e => e.value.toUpperCase().trim()),
            o = new Map(JSON.parse(localStorage.getItem(localStorageThemeName))),
            console.log(t),
            console.log(o),
            n = o.get(t),
            console.log(n),
            Array.from($(".input_theme")).forEach((e, t) => {
                e.value = n[t]
            }),
            Array.from($(".td_background")).forEach((e, t) => {
                e.style.background = n[t]
            }),
            o.set("currentTheme", t),
            localStorage.setItem(localStorageThemeName, JSON.stringify(Array.from(o.entries()))))
    }),
        $("#btn_save_theme").on("click", () => {
            n = Array.from($(".input_theme")).map(e => e.value.toUpperCase().trim()),
                t = $("#select_theme").find(":selected").text();
            for (let e = 0; e < n.length - 1; e++)
                if (null == n[e].match(/#[0-9 A-F]{6}/))
                    throw UI.ErrorMessage("wrong colour: " + n[e]),
                        new Error("wrong colour");
            null != localStorage.getItem(localStorageThemeName) && (o = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)))),
                o.set(t, n),
                o.set("currentTheme", t),
                localStorage.setItem(localStorageThemeName, JSON.stringify(Array.from(o.entries()))),
                console.log("saved colours for: " + t),
                UI.SuccessMessage(`saved colours for: ${t} \n run the script again`, 1e3)
        }),
        $("#btn_reset_theme").on("click", () => {
            localStorage.setItem(localStorageThemeName, defaultTheme),
                UI.SuccessMessage("run the script again", 1e3)
        }),
        $("#input_slider_width").on("input", () => {
            $("#td_width").text($("#input_slider_width").val() + "%")
        }),
    null != localStorage.getItem(localStorageThemeName)) {
        let e = (o = new Map(JSON.parse(localStorage.getItem(localStorageThemeName)))).get("currentTheme");
        document.querySelector("#select_theme").value = e
    }
}

function initializationTheme() {
    if (null != localStorage.getItem(localStorageThemeName)) {
        let e = new Map(JSON.parse(localStorage.getItem(localStorageThemeName))),
        t = e.get("currentTheme"),
        n = e.get(t);
        textColor = n[0],
            backgroundInput = n[1],
            borderColor = n[2],
            backgroundContainer = n[3],
            backgroundHeader = n[4],
            backgroundMainTable = n[5],
            backgroundInnerTable = n[6],
            widthInterface = n[7],
        "desktop" != game_data.device && (widthInterface = 98),
            backgroundAlternateTableEven = backgroundContainer,
            backgroundAlternateTableOdd = getColorDarker(backgroundContainer, headerColorAlternateTable),
            console.log("textColor: " + textColor),
            console.log("backgroundContainer: " + backgroundContainer)
    } else {
        localStorage.setItem(localStorageThemeName, defaultTheme);
        let e = new Map(JSON.parse(localStorage.getItem(localStorageThemeName))),
        t = e.get("currentTheme"),
        n = e.get(t);
        textColor = n[0],
            backgroundInput = n[1],
            borderColor = n[2],
            backgroundContainer = n[3],
            backgroundHeader = n[4],
            backgroundMainTable = n[5],
            backgroundInnerTable = n[6],
            widthInterface = n[7],
        "desktop" != game_data.device && (widthInterface = 98),
            backgroundAlternateTableEven = backgroundContainer,
            backgroundAlternateTableOdd = getColorDarker(backgroundContainer, headerColorAlternateTable)
    }
}

function sendResources(e, t) {
    let n = {
        village: e,
        ajaxaction: "call",
        h: window.csrf_token
    };
    TribalWars.post("market", n, t, function (e) {
        console.log(e),
            UI.SuccessMessage(e.success, 1e3)
    }, function (e) {
        console.log(e)
    })
}

async function createTable(e, t, n, o) {
    $("#div_tables").show()
    let a = `\n        <table  class="scriptTableAlternate">\n        <tr>\n            <td style="width:3%">nr</td>\n            <td style="width:35%">target</td>\n            <td><a href="#" id="sort_distance"><font color="${textColor}">max distance</font></a></td>\n            <td><a href="#" id="sort_total"><font color="${textColor}">total send</font></a></td>\n            <td class="hide_mobile"><a href="#" id="sort_wood"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/wood.png"/></a></td>\n            <td class="hide_mobile"><a href="#" id="sort_stone"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/stone.png"/></a></td>\n            <td class="hide_mobile"><a href="#" id="sort_iron"><img src="https://dsen.innogamescdn.com/asset/c2e59f13/graphic/buildings/iron.png"/></a></td>\n            <td>send</td>\n        </tr>`;
    for (let t = 0; t < e.length; t++) {
        let n = e[t].target_id
        , o = e[t].total_wood
        , r = e[t].total_stone
        , s = e[t].total_iron
        , l = (e[t].id_origin,
            JSON.stringify(e[t].send_resources));
        a += `\n            <tr id="delete_row" >\n                <td>${t + 1}</td>          \n                <td><a href="${game_data.link_base_pure}info_village&id=${e[t].target_id}"><font color="${textColor}">${e[t].name_destination}</font></a></td>\n                <td>${e[t].distance.toFixed(1)}</td>\n                <td>${formatNumber(e[t].total_send)}</td>\n                <td class="hide_mobile">${formatNumber(o)}</td>\n                <td class="hide_mobile">${formatNumber(r)}</td>\n                <td class="hide_mobile">${formatNumber(s)}</td>\n                <td><input class="btn evt-confirm-btn btn-confirm-yes btn_send" target_id="${n}" data='${l}'  type="button" value="send"></td>\n   \n            </tr>`
    }
    a += "\n        </table>",
        document.getElementById("table_view").innerHTML = a,
    "desktop" != game_data.device && $(".hide_mobile").hide(),
        $(".btn_send").on("click", async e => {
            if (0 == $(e.target).is(":disabled")) {
                let t = $(e.target).attr("target_id")
                , n = JSON.parse($(e.target).attr("data"));
                console.log(t, n),
                        $(".btn_send").attr("disabled", !0);
                let o = (new Date).getTime();
                sendResources(t, n);
                let a = (new Date).getTime() - o;
                window.setTimeout(() => {
                    $(e.target).closest("#delete_row").remove(),
                                $(".btn_send").attr("disabled", !1)
                }
                                  , 200 - a)
            }
        }
        );
    function statsRow(percentil) {
        const bValue = bCluster[1].values.sort((a,b)=>a-b)[Math.round(bCluster[1].values.length*percentil/100)]
        const aValue = aCluster[1].values.sort((a,b)=>a-b)[Math.round(aCluster[1].values.length*percentil/100)]
        return `\n        <tr>\n            <td colspan="2">${percentil+""}%</td>\n            <td>${formatNumber(bValue)}</td>\n            <td>${formatNumber(aValue)}</td>\n            <td>${formatNumber(aValue-bValue)}</td>\n       \n        </tr>`

    }
    let r = `\n        <table id="table_stats" class="scriptTable">\n
    <tr>\n<td><input class="btn evt-confirm-btn btn-confirm-yes" id="btn_result" type="button" value="results"></td>\n            <td><input class="btn evt-confirm-btn btn-confirm-yes" id="btn_cluster" type="button" value="clusters"></td>\n
    <td>before</td>\n            <td>after</td>\n            <td>change</td>\n        </tr>
    \n        <tr>\n            <td colspan="2">indicator good (bad) vil.</td>\n            <td>${bCluster[1].keys.length} (${bCluster[0].keys.length-1})</td>\n            <td>${aCluster[1].keys.length} (${aCluster[0].keys.length-1})</td>\n            <td>${aCluster[1].keys.length-bCluster[1].keys.length} </td>\n       \n        </tr>
    ${statsRow(5)} ${statsRow(10)} ${statsRow(20)} ${statsRow(30)}  </table>\n    `;
    document.getElementById("table_stats").innerHTML = r,
        $("#btn_result").on("click", () => {
            //createTableResults(n)
        }
        ),
        $("#btn_cluster").on("click", () => {
            //createTableClusters(o)
        }
        ),
        document.getElementById("sort_distance").addEventListener("click", () => {
            e.sort((e, t) => parseFloat(e.distance) > parseFloat(t.distance) ? 1 : parseFloat(e.distance) < parseFloat(t.distance) ? -1 : 0),
                    document.getElementById("table_stats").innerHTML = "",
                    createTable(e, t, n, o)
        }
        ),
        document.getElementById("sort_total").addEventListener("click", () => {
            e.sort((e, t) => e.total_send > t.total_send ? -1 : e.total_send < t.total_send ? 1 : 0),
                    document.getElementById("table_view").innerHTML = "",
                    createTable(e, t, n, o)
        }
        ),
        document.getElementById("sort_wood").addEventListener("click", () => {
            e.sort((e, t) => e.total_wood > t.total_wood ? -1 : e.total_wood < t.total_wood ? 1 : 0),
                    document.getElementById("table_view").innerHTML = "",
                    createTable(e, t, n, o)
        }
        ),
        document.getElementById("sort_stone").addEventListener("click", () => {
            e.sort((e, t) => e.total_stone > t.total_stone ? -1 : e.total_stone < t.total_stone ? 1 : 0),
                    document.getElementById("table_view").innerHTML = "",
                    createTable(e, t, n, o)
        }
        ),
        document.getElementById("sort_iron").addEventListener("click", () => {
            e.sort((e, t) => e.total_iron > t.total_iron ? -1 : e.total_iron < t.total_iron ? 1 : 0),
                    document.getElementById("table_view").innerHTML = "",
                    createTable(e, t, n, o)
        }
        ),
    document.getElementsByClassName("btn_send").length > 0 && document.getElementsByClassName("btn_send")[0].focus(),
        window.onkeydown = function (e) {
        13 == e.which && document.getElementsByClassName("btn_send").length > 0 && document.getElementsByClassName("btn_send")[0].click()
    }
}

function formatNumber(e) {
    return (new Intl.NumberFormat).format(e)
}

function go() {
    travelTimePerUnit = parseInt(document.getElementById("nr_mtravel_time").value);
    tradersSendingFrequency = parseFloat(document.getElementById("nr_time_interval").value);
    let whReserve = parseFloat(document.getElementById("nr_warehouse_reserve").value);
    let groupId = parseInt(document.getElementById("nr_group_id").value);
    let middleVilage = document.getElementById("coord_mint_village").value.trim();
    start(middleVilage, {id: groupId, name: "Ost"})
}


main()
