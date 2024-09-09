function Section ({children, id, wrapperSup}) {
    return (
        <section id={id}>
            <div className={`wrapper ${wrapperSup ? wrapperSup : ''}`}>
                {children}
            </div>
        </section>
    )
}
export default Section;