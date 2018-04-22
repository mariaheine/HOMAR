import React, { Component } from "react";

import { Card, CardText, CardTitle, CardBody } from 'reactstrap';

import 'bootstrap/dist/css/bootstrap.css';
import "./../../../styles/mobileStyles.css";

class Manifest1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeParagraph: '1'
    };
  }

  Paragraph(props) {
    return <div>{props.content}</div>;
  }

  render() {
    return (
      <Card>
          {Paragraph1}
      </Card>
    );
  }
}

const Paragraph1 = 
<div>
  <p>
    Beznadziejnie pospolite wydarzenie wyciekło spod zamkniętych drzwi, eskaluje po mediach społecznościowych, zalewając wasze dotykowe, nasycone i żywe ekrany. Przemoc seksualna roi się w sypialniach, w neuronach, w algorytmach, na ulicach, wszyscy o tym wiedzą. Czujnik oświetlenia sam dostosowuje jasność ekranu do warunków zewnętrznych, a powłoka antyrefleksyjna dodatkowo go zabezpiecza i zapewnia najlepszą widoczność w warunkach natężenia światła. Oglądamy dzień zerowy, słyszysz, jak wypowiedzieliśmy wojnę tej samej, smutnej historii opowiadanej od zbyt dawna.
  </p>
  <p>
    Patriarchat nie sprowadza się do patologicznych zachowań jednostek. „Dymek-oprawca" i „Dymińska-ofiara" wprowadzą nas w dzień świstaka redukowania polityki do dramatu osobistych namiętności. Patriarchat to wszechogarniająca machina petryfikacji rzeczywistości w obwodach powracających agresji, przemocy, gwałtu. W żłobieniach jego matrycy snują się wyssane z mocy i wyczerpane awatary, które łączy natężenie bezsilności na osi dynamiki wiskotycznej. Martwe tkanki patriarchatu odkładają się na adresach ip, adresach pocztowych, adresach url, adresach fizycznych, adresach publicznych. Do każdego trzeba innych taktyk i technik przystosowania środowiska, by mogło nareszcie po raz pierwszy w tym eonie przejść w fazę hipertrofii. Przełączymy się do innego świata tylko działając wspólnie. Bądźmy web crawlerami indeksującymi resztki z fantazji o naturalnym, bezpośrednim świecie, rozpisanym na binaryzm kobieta/mężczyzna. Twórzmy warunki cieplarniane, zmieniajmy toksyczną oikonomię, stawajmy się koprofagami i nekrofagami. Jeśli system prawny używa nekrofauny w kryminalistyce – my składajmy jaja w świeżym mięsie, jeszcze zanim zostanie poddane obróbce estetycznej i sprzedane na kilogramy. Poświęcamy nasze larwy w rytuale doprowadzenia gnijącej kultury gwałtu do całkowitego rozkładu. Pomyślmy o tych wszystkich minerałach, jakie przedostaną się do ziemi po dezintegracji.
  </p>
</div>

export default Manifest1;
