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
                <h2>Pour contacter {contact || "nous" }:</h2>


                {mailHref && (
                    <a href={mailHref} className="hyperlien" aria-label={`Contacter ${contact || "nous" } par mail à ${email}`} target="_blank">
                        {email}
                    </a>
                )}

                {telHref && (
                    <a href={telHref} className="hyperlien" aria-label={`Appeler ${telephone}`}>
                        {telephone}
                    </a>
                )}

                {adresse && <p>{adresse}</p>}

                {/* © {new Date().getFullYear()} {contact || "Lagunen Etxea"} */}

            </div>
        </footer>
    );
}