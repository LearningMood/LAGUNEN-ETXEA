import { useEffect, useState } from "react";

export default function Nav({ sections }) {
  const [isSticky, setSticky] = useState(false);
  // State pour savoir si le menu est ouvert ou non
  const [isOpen, setIsOpen] = useState(false);

  // Fonction pour gérer le clic sur le burger
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Inverse l'état ouvert/fermé
  };
  // console.log("Dans Nav " , sections);


  useEffect(() => {
    const handleScroll = () => {
        if (window.scrollY > 100) { 
            setSticky(true);
        } else {
            setSticky(false);
        }
    };

    window.addEventListener('scroll', () => {
      const nav = document.querySelector('nav');
      const offsetTop = nav.offsetTop;
    
      if (window.scrollY > offsetTop) {
        nav.classList.add('sticky');
        document.body.style.paddingTop = `${nav.offsetHeight}px`; // Compense la hauteur de la nav
      } else {
        nav.classList.remove('sticky');
        document.body.style.paddingTop = 0; // Enlève l'espacement quand la nav redevient normale
      }
    });
}, []);

  return (
    <nav className={isSticky ? 'sticky' : ''}>

      <div id="burger-menu" className={`burger-menu ${isOpen ? 'toggle' : ''}`} onClick={toggleMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
      </div>

      <ul className={`main-nav ${isOpen ? 'nav-active' : ''}`}>
      {sections.map((section, index)=> (
        <li key={index}>
          <a href={`#${section.id}`} onClick={toggleMenu}>{section.label}</a>
        </li>
      ))}
      </ul>
    </nav>
  );
}

// export default function Nav({ sections }) {
//   return (
//     <nav>
//       <ul>
//         {sections.map(s => (
//           <li key={s.id}>
//             <a href={`#${s.id}`}>{s.label}</a>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }