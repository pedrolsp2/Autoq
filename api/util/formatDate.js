const padZero = (valor) => {
    return valor < 10 ? `0${valor}` : valor
}

module.exports = {
    formatDate: (dateString, sql = true) => {
        if (!dateString) return ''
        const dataHora = new Date(dateString)
        const ano = dataHora.getFullYear()
        const mes = padZero(dataHora.getMonth() + 1)
        const dia = padZero(dataHora.getDate())
        const hora = padZero(dataHora.getUTCHours())
        const minutos = padZero(dataHora.getMinutes())
        return sql
            ? `${ano}-${mes}-${dia} ${hora}:${minutos}`
            : `${dia}-${mes}-${ano} ${hora}:${minutos}`
    },
}
