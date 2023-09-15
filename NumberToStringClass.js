class NumberToTextConverter {
    constructor() {
        this.currencyNames = {
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

        this.ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
        this.tens = ["", "Ten", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    }

    convertNumberToText(number, currencyCode) {
        const numberText = number.toFixed(2).toString();

        const digitCount = numberText.length;
        if (digitCount > 15) {
            return "Number is too big";
        }

        const wholePart = Math.floor(number);
        const fractionPart = Math.round((number - wholePart) * 100);

        let text = "";

        if (wholePart !== 0) {
            text += this.convertNumberToTextRecursive(wholePart) + " " + this.currencyNames[currencyCode]['name'] + " ";
        }

        if (fractionPart !== 0) {
            text += this.convertNumberToTextRecursive(fractionPart) + (fractionPart > 0 ? " " + this.currencyNames[currencyCode]['subunit'] : " Zero " + this.currencyNames[currencyCode]['subunit']);
        } else {
            text += "Zero " + this.currencyNames[currencyCode]['subunit'];
        }

        if (text === "") {
            text = "Zero " + this.currencyNames[currencyCode]['name'];
        }

        return text;
    }

    convertNumberToTextRecursive(number) {
        if (number === 0) {
            return "Zero";
        } else if (number < 10) {
            return this.ones[number];
        } else if (number < 20) {
            const value = "Ten " + this.convertNumberToTextRecursive(number - 10);
            return number === 10 ? "Ten" : value;
        } else if (number < 100) {
            const tensDigit = Math.floor(number / 10);
            const onesDigit = number % 10;

            let text = this.tens[tensDigit];
            if (onesDigit > 0) {
                text += " " + this.ones[onesDigit];
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
                text = this.ones[hundreds] + " Hundred";
            }

            if (remainder > 0) {
                text += " " + this.convertNumberToTextRecursive(remainder);
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
                text = this.convertNumberToTextRecursive(thousands) + " Thousand";
            }

            if (remainder > 0) {
                text += " " + this.convertNumberToTextRecursive(remainder);
            }

            return text;
        } else if (number < 1000000000) {
            const millions = Math.floor(number / 1000000);
            const remainder = number % 1000000;
            let text = this.convertNumberToTextRecursive(millions) + " Million";

            if (remainder > 0) {
                text += " " + this.convertNumberToTextRecursive(remainder);
            }

            return text;
        } else if (number < 1000000000000) {
            const billions = Math.floor(number / 1000000000);
            const remainder = number % 1000000000;
            let text = this.convertNumberToTextRecursive(billions) + " Billion";

            if (remainder > 0) {
                text += " " + this.convertNumberToTextRecursive(remainder);
            }

            return text;
        } else {
            return "";
        }
    }
}