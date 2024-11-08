const NotFound = () => {
    return (
        <div className="absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <span className="mb-4 text-9xl">404</span>
            <h1 className="mb-8">A página solicitada não foi encontrada.</h1>
            <h3>Possíveis motivos:</h3>
            <ul>
                <li>URL inválida</li>
                <li>...</li>
            </ul>
        </div>
    )
}

export default NotFound
