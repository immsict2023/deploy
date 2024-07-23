const validator = require('validator');
const xss = require('xss');

class InputSanitizer {
    static sanitizeString(input) {
        if (typeof input === 'string' && input.length > 0) {
        return validator.escape(input);
        }
        return null;
    }

    static sanitizeHTML(input) {
        if (typeof input === 'string' && input.length > 0) {
        return xss(input);
        }
        return null;
    }

    static sanitizeEmail(input) {
        if (typeof input === 'string' && input.length > 0) {
        return validator.normalizeEmail(input);
        }
        return null;
    }

    /*
    static sanitizeURL(input) {
        if (typeof input === 'string' && validator.isURL(input)) {
        return input;
        }
        return null;
    }
    */

    static sanitizeNumber(input) {
        const sanitizedNumber = validator.toInt(input);
        return isNaN(sanitizedNumber) ? null : sanitizedNumber;
    }

    static sanitizeInput(input, type) {
        switch (type) {
        case 'string':
            return InputSanitizer.sanitizeString(input);
        case 'html':
            return InputSanitizer.sanitizeHTML(input);
        case 'email':
            return InputSanitizer.sanitizeEmail(input);
        /*
            case 'url':
            return InputSanitizer.sanitizeURL(input);
        */
        case 'number':
            return InputSanitizer.sanitizeNumber(input);
        default:
            return null;
        }
    }
}

module.exports = InputSanitizer;
