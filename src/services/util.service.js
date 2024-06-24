// import { CLOUD_NAME, UPLOAD_PRESET } from "../../dist/pass.js"

import { httpService } from './http.service.js'

export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    loadFromStorage,
    saveToStorage,
    animateCSS,
    debounce,
    getAssetSrc,
    getRandomColor,
    uploadImgToCloudinary,
    timeDifference,
    timeDifferenceLong,
    isHebrew,
    isMobile,
    rgbToHex,
    setTimesFormChanges,
    setTimesChangeToTimestamp
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

// In our utilService
function animateCSS(el, animation) {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`

        el.classList.add(`${prefix}animated`, animationName)

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }
        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function getAssetSrc(name) {
    return new URL(`/src/assets/img/${name}.png`, import.meta.url).href
}

function getRandomColor() {
    const color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
    return color;
}

async function uploadImgToCloudinary(ev, gameId, isAdminUpload = false, fileName = 'image') {
    const mediaType = ev.target.files[0].type

    let type
    if (mediaType.includes('image')) {
        type = 'image'
    } else if (mediaType.includes('video')) {
        type = 'video'
    }

    var url = isAdminUpload ? "Media/upload" : "Media/UploadAnonymous"

    try {
        const base64Str = await getFileAsBase64(ev);
        var media = await httpService.post(url, {
            "base64Data": base64Str,
            "name": fileName,
            "gameId": gameId || "d752efce-17e0-4d2a-8627-08dc644c8fa4"
        })
        return media
    } catch (err) {
        console.error(err)
    }
}

async function getFileAsBase64(event) {
    const file = event.target.files[0];
    if (!file) return;
    var data = await getBase64(file);
    var cleanedData = getTextAfterBase64(data);
    return cleanedData;
}

async function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (e) => reject(e)
    })
}

function getTextAfterBase64(text) {
    const startIndex = text.indexOf("base64,") + 7; // Add 7 to skip "base64,"
    return text.substring(startIndex);
}

async function uploadImgToCloudinaryFront(ev) {
    const mediaType = ev.target.files[0].type

    let type
    if (mediaType.includes('image')) {
        type = 'image'
    } else if (mediaType.includes('video')) {
        type = 'video'
    }

    // Sending a post method request to Cloudinarys API
    var url = isAdminUpload ? "Media/upload" : "Media/UploadAnonymous"
    try {
        const res = await fetch(UPLOAD_URL, {
            method: 'POST',
            body: FORM_DATA,
        })
        const { url } = await res.json()

        const media = {
            type: mediaType,
            url
        }

        return media
    } catch (err) {
        console.error(err)
    }
}

function timeDifference(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + 's';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + 'm';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + 'h';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + 'd';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + 'm';
    } else {
        return Math.round(elapsed / msPerYear) + 'y';
    }
}
function timeDifferenceLong(current, previous) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}

function isHebrew(txt) {
    const hebrewLeters = 'אבגדהוזחטיכלמנסעפצקרשת'
    const parts = txt.split('')
    return parts.some(letter => hebrewLeters.includes(letter))
}

function isMobile() {
    return !(window.innerWidth > 700)
}


function rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
}

function setTimesFormChanges(game) {

    changeTimestampToTime(game, game.gameStartTimestamp, game.gameEndTimestamp)

    if (game.activityProgressType === 'onTime') {
        if (game.gameType === 'activities') {
            game.activities.forEach((activity, i) => {
                changeTimestampToTime(activity, activity.activityStartTimestamp, activity.activityEndTimestamp)
            })
        } else {
            game.stages.forEach(stage => {
                changeTimestampToTime(stage, stage.stageStartTimestamp, stage.stageEndTimestamp)

                stage.activities.forEach(activity => {
                    changeTimestampToTime(activity, activity.activityStartTimestamp, activity.activityEndTimestamp)
                })
            })
        }
    }
}

// adit
function changeTimestampToTime(object, startTimestamp, endTimestamp) {
    changeTsToFormattedDate(startTimestamp, object, 'dateStart', 'timeStart')
    changeTsToFormattedDate(endTimestamp, object, 'dateEnd', 'timeEnd')
}

// adit
function changeTsToFormattedDate(ts, object, key1, key2) {
    if (ts) {
        const d = new Date(ts)
        object[key1] = d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate())
        object[key2] = pad(d.getHours()) + ':' + pad(d.getMinutes())
    } else {
        object[key1] = ''
        object[key2] = ''
    }
}

// adit
function pad(num) {
    return num < 10 ? '0' + num : num
}

// add

function changeFormattedTimeToTs(obj, key1, key2) {
    var startTimestamp = new Date(obj.dateStart + ' ' + obj.timeStart).getTime()
    var endTimestamp = new Date(obj.dateEnd + ' ' + obj.timeEnd).getTime()
    obj[key1] = startTimestamp || null
    obj[key2] = endTimestamp || null

    //// delete obj[dateStart]
    //// delete obj[timeStart]
    //// delete obj[dateEnd]
    //// delete obj[timeEnd]
}

function setTimesChangeToTimestamp(game) {
    console.log('setTimesChangeToTimestamp')
    changeFormattedTimeToTs(game, 'gameStartTimestamp', 'gameEndTimestamp')

    if (game.activityProgressType === 'onTime') {
        if (game.gameType === 'activities') {
            game.activities.forEach(activity => {
                changeFormattedTimeToTs(activity, 'activityStartTimestamp', 'activityEndTimestamp')
            })
        } else {
            game.stages.forEach(stage => {
                changeFormattedTimeToTs(stage, 'stageStartTimestamp', 'stageEndTimestamp')
                stage.activities.forEach(activity => {
                    changeFormattedTimeToTs(activity, 'activityStartTimestamp', 'activityEndTimestamp')
                })
            })
        }
    }
}