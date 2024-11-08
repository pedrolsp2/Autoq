module.exports = {
    sanitizeString: (string) => {
        // Substitui os caracteres perigosos por hífen (-)
        let sanitizedString = string.replace(/[`'\/\\]/g, '-')

        // Remove todos os caracteres inválidos, exceto letras, números, hífens e underscores
        sanitizedString = sanitizedString.replace(/[^a-zA-Z0-9-_\.]/g, '')

        return sanitizedString
    },

    getFileExtension: (fileName) => {
        let regex = /(?:\.([^.]+))?$/
        let match = regex.exec(fileName)
        let extension = match ? match[1] : ''
        return extension
    },

    capitalize: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
    },

    getWordByIndex: (phrase, separator = ' ', index) => {
        return phrase.split(separator)[index]
    },

    getFirstWord: (phrase, separator = ' ') => {
        return phrase.split(separator)[0]
    },

    getLastWord: (phrase, separator = ' ') => {
        const wordArray = phrase.split(separator)

        return wordArray[wordArray.length - 1]
    },

    getWordCount: (phrase, separator = ' ') => {
        return phrase.split(separator).length
    },
}
