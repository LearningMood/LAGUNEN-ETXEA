export default function Footer({ data = {} }) {
    const email = data.email?.toString().trim();
    const telephone = data.telephone?.toString().trim();
    const contact = data.contact?.toString().trim();   // ex: “Lagunen Etxea” ou “Guillaume”
    const adresse = data.adresse?.toString().trim();

    // construit un tel: propre (garde uniquement + et chiffres)
    const telHref = telephone ? `tel:${telephone.replace(/[^\d+]/g, "")}` : null;

    // mailto avec sujet par défaut
    const subject = encodeURIComponent("Demande d'informations – Lagunen Etxea");
    const mailHref = email ? `mailto:${email}?subject=${subject}` : null;

    return (
        <footer id="contact" className="bottom">
            <div className="line line--center line--start">
                <h2>Pour nous contacter :</h2>


                {mailHref && (
                    <p className="border--tiret"><a href={mailHref} aria-label={`Écrire à ${contact || "nous"}`} target="_blank">
                        Écrire à {contact || email}
                    </a></p>
                )}

                {telHref && (
                    <p className="border--tiret"><a href={telHref} aria-label={`Appeler ${telephone}`}>
                        {telephone}
                    </a></p>
                )}

                {adresse && <p>{adresse}</p>}

                {/* © {new Date().getFullYear()} {contact || "Lagunen Etxea"} */}

            </div>
        </footer>
    );
}