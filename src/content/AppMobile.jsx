import React, { Component } from "react";
import { TabContent, TabPane, Row, Col, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import "./../styles/mobileStyles.css";

// na razie nie uzywane, calosc jest w jednym komponencie, wiem ze syf ale nie ma czasu inaczej
import Manifest from "./mobile/Manifest";

class AppMobile extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: false,
      activeParagraph: '0'
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  toggleParagraph(paragraph) {
    if (this.state.activeParagraph !== paragraph) {
      this.setState({
        activeParagraph: paragraph
      });
    }
  }

  render() {

    return (
      <div>
        <Navbar color="faded" light>
          <NavbarBrand className="mr-auto">
            <h1>HOMAR</h1>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" >
            <h1 className="title">Manifest: Xeno-seksualność nadchodzi z przyszłości</h1>
          </NavbarToggler>
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink onClick={() => { this.toggleParagraph('1'); this.toggleNavbar() }}><p className="title">[≡] 〆(・⺫・‶)</p></NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => { this.toggleParagraph('2'); this.toggleNavbar() }}><p className="title">=͟͟͞͞( •̀д•́)))</p></NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => { this.toggleParagraph('3'); this.toggleNavbar() }}><p className="title">ಠ_ರೃ</p></NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={() => { this.toggleParagraph('4'); this.toggleNavbar() }}><p className="title">＼`•̀益•́´／</p></NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
        <TabContent activeTab={this.state.activeParagraph}>
          <TabPane tabId="0">
            <Row>
              <Col sm="12">
                {Paragraph0}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">                
                {Paragraph1}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col sm="12">
                {Paragraph2}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
            <Row>
              <Col sm="12">
                {Paragraph3}
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="4">
            <Row>
              <Col sm="12">
                {Paragraph4}
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

const Paragraph0 = 
<div className="content">
  <h1 className="content">0.0</h1>
  <h1 className="content">choose ur weapon</h1>  
</div>

const Paragraph1 = 
<div className="content">
  <h1 className="content">[≡] 〆(・⺫・‶)</h1>
  <p className="content">
    Xeno-polska nadchodzi z przyszłości. Wszystkie potęgi i siły ujemnego sprzężenia zwrotnego połączyły się w (re)produkcji przewidywalnych skutków i konsekwencji: Łobodziński i Dymek, Opinia Bieżąca i Wysokie Obcasy, Tygodnik Powszechny i Dwutygodnik oraz tysiące botów z jedyną funkcją crtl+c ctrl+v  - wszyscy oni, agenci®™ i agencje®™ stabilizujące zaistniałe zdarzenie w retoryce protokołów rozpisanych reakcyjnymi siatkami domykającymi nowotworzące 0 w ramach ekonomii dwójkowej wymiany.
  </p>
  <p className="content">
    Prawicowy działacz kpi z molestowanej feministki: „Czy ta Pani sama siebie nie traktuje przedmiotowo?". Media zwlekają z zajęciem stanowiska „do czasu ogłoszenia wyroku” – ryzyko, jakie niesie wykroczenie z konformistycznego sceptycyzmu, zagraża ich fantazji o pozycji bezstronnego opiniotwórcy. Dwojaki wniosek wypływa z tego faktu. To, co wyalienowane, jest już przez wszystkie siły uznane za potęgę. Czas już najwyższy, abyśmy, my z prefiksem xeno-, wyłożyły otwarcie wobec całego świata obcy punkt widzenia, odległe cele, nieznane dążenia i bajce o złym dysekwilibrium przeciwstawili manifest 0-dodatniej seksualności dla xeno-polski. Napisałyśmy go z przyszłości i przeszłości, nierównomiernie dystrybuowanych poprzez układy, figury, materiały i wyobrażenia, których wielość składa się na każdy świat. Użyliśmy wszystkiego, co było udostępnione, ściągnięte, spiracone. Tego, co najbliższe, i tego, co najdalsze. Zebrałyśmy się z najróżniejszych zakątków kompleksu czasoprzestrzennego, by wyłoniła się alienomantyczna technopleksja anty-patriarchatu, oznaczona tagami: akceleracja roztopu, cienie 3D proxyself, psot-klubowa memetyczna amplifikacja, zombie tri🅱🅱y, propagacja hiperstycyjnych nośników, ekrany AI-lubrykacji, blockchain libidinalny, enkrypcyjny kamuflaż, ambientalny biohacking, voodoo antyhumanizm, komputozofia, syntetyczny feminizm, kognitywny freeganizm, XF-szczepienie, dyssypacyjna proliferacja, crustacean love, lesbijski wampiryzm, spirotemporalny demonizm, bakteryjny khattak, efektywny neo-nihilizm, transbionika, inteligentny wetware, zakażenie hy45r, wirusowa amnezja, cyberinsurekcja, schizotaktyka, pulpomutacja, neotropia, elo wale wiadro.
  </p>
  <p className="content">
    Nie potrzebujemy nie-przedmiotów, nie-wyalienowanych całości wpisanych w naturalne procesy wymiany i reprodukcji. Jesteśmy wyalienowane i to kochamy - to, czego potrzebujemy i czego żądamy, to wyjście z bagna bezpośredniości skazującego nas na pustą lubrykację "naturalnego" porządku wymiany ekonomiczno-afektywnej, w którym zajmujemy dziurawe miejsce mówiących, lecz w ostatniej instancji niemych ofiar. Nie tyle pragniemy rozpuścić się w roztworze jednorodnej zasady, by nigdy więcej już nie wypowiedzieć „ja”, ile zanurzyć w plastycznolepkich płynach, w których przestaje mieć znaczenie, co i czy mówi „ja”. Każde pozna swoje. Nie jesteśmy już sobą.
  </p>  
  <p className="content">
    To, co z jednej perspektywy stało się katastrofą, z innej wkracza jako pozytywna przyszłość, nieuchronna jak kropla paku węglowego, której prędkość opadania zależy od temperatury układu. Postulujemy cyberdodatniość – to znaczy: nieprzewidziane linie wyjścia poza cyberujemne struktury kontroli i równowagi, otwarcie kodu źródłowego na wielość Zewnętrznych zmian i interwencji.
  </p>  
</div>

const Paragraph2 = 
<div className="content">
  <h1 className="content">=͟͟͞͞( •̀д•́)))</h1>
  <p className="content">
    Beznadziejnie pospolite wydarzenie wyciekło spod zamkniętych drzwi, eskaluje po mediach społecznościowych, zalewając wasze dotykowe, nasycone i żywe ekrany. Przemoc seksualna roi się w sypialniach, w neuronach, w algorytmach, na ulicach, wszyscy o tym wiedzą. Czujnik oświetlenia sam dostosowuje jasność ekranu do warunków zewnętrznych, a powłoka antyrefleksyjna dodatkowo go zabezpiecza i zapewnia najlepszą widoczność w warunkach natężenia światła. Oglądamy dzień zerowy, słyszysz, jak wypowiedzieliśmy wojnę tej samej, smutnej historii opowiadanej od zbyt dawna.
  </p>
  <p className="content">
    Patriarchat nie sprowadza się do patologicznych zachowań jednostek. „Dymek-oprawca" i „Dymińska-ofiara" wprowadzą nas w dzień świstaka redukowania polityki do dramatu osobistych namiętności. Patriarchat to wszechogarniająca machina petryfikacji rzeczywistości w obwodach powracających agresji, przemocy, gwałtu. W żłobieniach jego matrycy snują się wyssane z mocy i wyczerpane awatary, które łączy natężenie bezsilności na osi dynamiki wiskotycznej. Martwe tkanki patriarchatu odkładają się na adresach ip, adresach pocztowych, adresach url, adresach fizycznych, adresach publicznych. Do każdego trzeba innych taktyk i technik przystosowania środowiska, by mogło nareszcie po raz pierwszy w tym eonie przejść w fazę hipertrofii. Przełączymy się do innego świata tylko działając wspólnie. Bądźmy web crawlerami indeksującymi resztki z fantazji o naturalnym, bezpośrednim świecie, rozpisanym na binaryzm kobieta/mężczyzna. Twórzmy warunki cieplarniane, zmieniajmy toksyczną oikonomię, stawajmy się koprofagami i nekrofagami. Jeśli system prawny używa nekrofauny w kryminalistyce – my składajmy jaja w świeżym mięsie, jeszcze zanim zostanie poddane obróbce estetycznej i sprzedane na kilogramy. Poświęcamy nasze larwy w rytuale doprowadzenia gnijącej kultury gwałtu do całkowitego rozkładu. Pomyślmy o tych wszystkich minerałach, jakie przedostaną się do ziemi po dezintegracji.
  </p>  
</div>

const Paragraph3 = 
<div className="content">
  <h1 className="content">ಠ_ರೃ</h1>
  <p className="content">
    Patriarchat nie ma płci. Patriarchat narzuca binarność płci, organizuje wyzysk afektywny, ujarzmia za pomocą traumy. Świat po patriarchacie też nie ma płci. Xenofeministyczna utopia xxx. Wolność nie jest dana, stanowi technologiczny efekt nieustannego abstrahowania z zastanych warunków, komponowania praktyk i procedur wpinających wspólnoty w ucieczkowe obiegi, przechodzące przez stacje ulokowane w odległych galaktykach. Wirus wolności replikuje się w ciałach wytrąconych z równowagi.
  </p>
</div>

const Paragraph4 = 
<div className="content">
  <h1 className="content">＼`•̀益•́´／</h1>
  <p className="content">
    W języku miłości zaprogramowanym w kodzie „niebezpiecznych związków”, szlachetności cierpienia i autentyczności ekstremalnych emocji dialektyka płci wyraża funkcję militarną, której sekwencjonowanie w modelu wojny domowej gwarantuje, że nikt nie wyjdzie z patriarchatu cało. Od prymatu orgazmu-ejakulacji, który zakłada ciało uwięzione od triggeru do triggeru, nad eksperymentowaniem z „innymi czynnościami seksualnymi" i wyprawą za wirtualnymi strefami erogennymi, po cyberujemne gry miłosne skompresowane do zdobywania poprzez reprodukcję odgórnych wytrychów sztuki uwodzenia, w których wzorce atrakcyjności przekazywane zostają w formularzu kopiuj-wklej centralnie planowanej intymności. Zerwijmy w końcu z tożsamością seksualną, z jej wielowiekowym systemem irygacji opartym na zmurszałych, sypiących się studniach pragnienia. Spójrzmy na ponadczasowe role seksualne, jak oprawca-ofiara, jak łowczy-zwierzyna, ojciec-matka, genialny_umysł-opiekunka, przebiegły_gracz-rozhisteryzowana_wiedźma...
  </p>
</div>

export default AppMobile;
