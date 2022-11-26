export default function roll(sideNum, diceNum, rollNum) {

    let result = []

    for (var i = 0; i < rollNum; i++) {
        let roll = 0;
        for (var j = 0; j < diceNum; j++) {
            roll = roll + Math.floor(Math.random() * sideNum) + 1
        }
        result[i] = roll
    }

    return {
        sides : sideNum,
        dice : diceNum,
        rolls : rollNum,
        results : result
    }
}
