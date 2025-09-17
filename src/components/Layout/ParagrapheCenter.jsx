function ParagrapheCenter({ texte }) {
    return (
        <div className="bloc-description">
            <p className="description" dangerouslySetInnerHTML={{ __html: texte }} />
        </div>
    )
}
export default ParagrapheCenter;