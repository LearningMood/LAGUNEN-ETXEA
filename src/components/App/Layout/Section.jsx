function Section ({children, id}) {
    return (
        <section id={id}>
            <div className="wrapper">
                {children}
            </div>
        </section>
    )
}
export default Section;