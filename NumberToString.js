function convertNumberToText(number, currencyCode) {
    const currencyNames = {
        'TL': {
            'name': 'Türk Lirası',
            'subunit': 'Kuruş'
        },
        'EUR': {
            'name': 'Euro',
            'subunit': 'Cent'
        },
        'USD': {
            'name': 'Dollar',
            'subunit': 'Cent'
        },
        'GBP': {
            'name': 'Sterlin',
            'subunit': 'Pence'
        }
    };

    const numberText = number.toFixed(2).toString();

    const digitCount = numberText.length;
    if (digitCount > 15) {
        return "Number is too big";
    }

    const wholePart = Math.floor(number);
    const fractionPart = Math.round((number - wholePart) * 100);

    let text = "";

    if (wholePart !== 0) {
        text += convertNumberToTextInternal(wholePart) + " " + currencyNames[currencyCode]['name'] + " ";
    }

    if (fractionPart !== 0) {
        text += convertNumberToTextInternal(fractionPart) + (fractionPart > 0 ? " " + currencyNames[currencyCode]['subunit'] : " Zero " + currencyNames[currencyCode]['subunit']);
    } else {
        text += "Zero " + currencyNames[currencyCode]['subunit'];
    }

    if (text === "") {
        text = "Zero " + currencyNames[currencyCode]['name'];
    }

    return text;
}

function convertNumberToTextInternal(number) {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
    const tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

    if (number === 0) {
        return "Zero";
    } else if (number < 10) {
        return ones[number];
    } else if (number < 20) {
        const value = "Ten " + convertNumberToTextInternal(number - 10);
        return number === 10 ? "Ten" : value;
    } else if (number < 100) {
        const tensDigit = Math.floor(number / 10);
        const onesDigit = number % 10;

        let text = tens[tensDigit];
        if (onesDigit > 0) {
            text += " " + ones[onesDigit];
        }

        return text;
    } else if (number === 100) {
        return "One Hundred";
    } else if (number < 1000) {
        const hundreds = Math.floor(number / 100);
        const remainder = number % 100;
        let text = "";

        if (hundreds === 1) {
            text = "One Hundred";
        } else if (hundreds > 1) {
            text = ones[hundreds] + " Hundred";
        }

        if (remainder > 0) {
            text += " " + convertNumberToTextInternal(remainder);
        }

        return text;
    } else if (number === 1000) {
        return "One Thousand";
    } else if (number < 1000000) {
        const thousands = Math.floor(number / 1000);
        const remainder = number % 1000;
        let text = "";

        if (thousands === 1) {
            text = "One Thousand";
        } else if (thousands > 1) {
            text = convertNumberToTextInternal(thousands) + " Thousand";
        }

        if (remainder > 0) {
            text += " " + convertNumberToTextInternal(remainder);
        }

        return text;
    } else if (number < 1000000000) {
        const millions = Math.floor(number / 1000000);
        const remainder = number % 1000000;
        let text = convertNumberToTextInternal(millions) + " Million";

        if (remainder > 0) {
            text += " " + convertNumberToTextInternal(remainder);
        }

        return text;
    } else if (number < 1000000000000) {
        const billions = Math.floor(number / 1000000000);
        const remainder = number % 1000000000;
        let text = convertNumberToTextInternal(billions) + " Billion";

        if (remainder > 0) {
            text += " " + convertNumberToTextInternal(remainder);
        }

        return text;
    } else {
        return "";
    }
}

const number = 111111111111;
const currencyCode = 'EUR';
const text = convertNumberToText(number, currencyCode);
console.log(text);