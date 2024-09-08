function TitreSection({ titre, sup }) {
    return (
        // <div className="titre titre-section">
        <div className="titre-encadre">
            <div className="filet"></div>
            <h2 className={`titre ${sup}`}>{titre}</h2>
            <div className="filet"></div>
        </div>
    )
}
export default TitreSection;