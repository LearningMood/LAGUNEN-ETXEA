function ParagrapheCenter({ texte}) {
    return (
        <p className="description txt-center" dangerouslySetInnerHTML={{ __html: texte }} />
    )
}
export default ParagrapheCenter;