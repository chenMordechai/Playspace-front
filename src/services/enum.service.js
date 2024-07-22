function getActivityProgressType(activityProgressType) {
    switch (activityProgressType) {
        case 'open':
            return "משחק פתוח"
        case 'onTime':
            return 'משחק לפי זמנים'
        case 'onProgress':
            return 'משחק לפי התקדמות'
        default:
            return 'משחק רגיל'
    }
}

function getActivityType(activityType) {
    switch (activityType) {
        case "multiple":
            return "אמריקאית"
        case  "open":
            return "שאלה פתוחה"
        case  "yesno":
            return "שאלת כן / לא"
        case  "typing":
            return "שאלת פתוחה"
        default:
            return "שאלה רגילה"
    }
}

export const enumService = {
    getActivityProgressType,
    getActivityType
}