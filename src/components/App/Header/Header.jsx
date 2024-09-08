import Bandeau from './Bandeau';

function Header() {
  return (
    <header>
      <div className="bandeau--intro">
        <h1 className="bandeau-titre">Lagunen Etxea</h1>
        <p className="bandeau-infos">Bienvenue entre océan &amp; montagnes...</p>
      </div>
      <Bandeau />
    </header>
  );
}
export default Header;
