import 'bootstrap/dist/css/bootstrap.min.css';
import button from './button';
import h1 from './h1';
import kortti from './kortti';
import toinenKortti from './toinenKortti';
import { runInThisContext } from 'vm';
import { shuffle } from 'lodash';
import card from './card';
import veikkaa from './veikkaa';

const molemmatKortit = (omak, vastk) => `<div>
<table>
<td>
   ${yksiKortti(omak)} 
   </td>
   <td>
   ${yksiKortti(vastk)} 
   </td>
   </table>
   </div>`;

const yksiKortti = ({ name, version, ...statistics }) => `<table>
    <th>${name}@${version}</th>
     ${Object.entries(statistics)
    .map(([prop, value]) => `<tr><td>${prop}</td><td>${value}</td></tr>`)
    .join('')}
    </table>`;

class App {
  constructor(root) {
    this.root = root;
    this.state = {
      counter: 0
    };
    this.setState();
    this.fetchTopPackages();
    //tila: valitse, näytä, jatka, loppu
    //vuoro: oma, vastus
  }
  fetchTopPackages() {
    fetch('/api/top-packages.json')
      .then(response => response.json())
      .then(topPackages => this.setState({
        topPackages
      }))
      .then(() => this.sotke())
      .then(() => this.haeKortit())
  }
  sotke() {
    this.setState({ topPackages: shuffle(this.state.topPackages) });
    let lkm = this.state.topPackages.length / 2; // oletetaan että on jaolilnen 2
    this.setState({
      pelaaja: this.state.topPackages.slice(lkm)
    });
    this.setState({
      vastus: this.state.topPackages.slice(0, lkm)
    });
    if (Math.random > 0.5) this.setState({ omavuoro: true })
    else this.setState({ omavuoro: false });

    // console.log("pelaaja:", this.state.pelaaja);
    // console.log("vastus:", this.state.vastus);
  }

  haeKortit() {
    let [omakortti, ...loput] = this.state.pelaaja;
    let [vastkortti, ...loput2] = this.state.vastus;
    console.log('haeKortit() oma :', omakortti)
    console.log('haeKortit() vast:', vastkortti)
    console.log(Object.keys(omakortti));
    console.log(Object.values(omakortti));
    let k = Object.keys(omakortti);
    let v = Object.values(omakortti);
    let j = k.length
    for (let i = 0; i < j; i++) {
      console.log(k[i], ":", v[i]);
    }
    this.setState({ omakortti })
    this.setState({ vastkortti })
    this.setState({ tila: "valitse" })
  }

  setState(nextState) {
    this.state = {
      ...this.state,
      ...nextState
    };
    this.root.innerHTML = this.render();
  }
  increase() {
    this.setState({
      counter: this.state.counter + 1
    });
    this.setState({ omavuoro: true });
  }
  decrease() {
    this.setState({
      counter: this.state.counter - 1
    });
    this.setState({ omavuoro: false });
  }

  siirra(from, to) {
    to.push(from[0]);
    to.push(to[0]);
    to.shift()
    from.shift()
    if (from.length>0)
      this.haeKortit()
    else
      this.lopetaPeli()
  }

  lopetaPeli() {
    this.setState({ tila: "loppu" })
    console.log("peli päättyi.",
      (this.state.pelaaja.length > 0 ? "voitit!" : "hävisit tällä kertaa")
    )
  }

  palaa(muuttuja) {
    this.setState({ muuttuja })
    this.setState({ tila: "näytä" })
  }

  pelaa(muuttuja) {
    function parempiKortti(muuttuja) {
      var o = app.state.omakortti[muuttuja];
      var v = app.state.vastkortti[muuttuja];
      //console.log("parempiKortti:", "a:", a, " b:", b, " muuttuja:", muuttuja);
      switch (muuttuja) {
        case "dependencies":
        case "openIssues":
        case "openPullRequests":
          return (o <= v) // pienempi parempi
          break;
      }
      // isompi parempi
      return (o >= v)
    }
    this.setState({tila: "jatka"})
    if (parempiKortti(muuttuja)) {
      this.siirra(this.state.vastus, this.state.pelaaja)   // oma voitto, kortti vastus -> oma
      this.increase()
    } else {
      this.siirra(this.state.pelaaja, this.state.vastus)   // vastustajalle
      this.decrease()
    }
    console.log("pelaa(",muuttuja,")")
    this.setState({tila: "valitse"})
  }

  render() {
    // pelin logiikan voi kirjoittaa tänne renderiin
    // state -objektissa on pelin koko tilanne tallessa
    console.log("render().tila:", this.state.tila)
    // console.log("render.pelaaja:", this.state.pelaaja);
    // console.log("render.vastus:", this.state.vastus);
    if (!this.state.omakortti) return;
    if (!this.state.vastkortti) return;

    let str = `
    <div class="container-fluid">
    ${h1('top-packages.json -peli')}
    <div>tilanne: ${this.state.counter}</div>
    </div>`
    switch (this.state.tila) {
      case "valitse":
        if (this.state.omavuoro)
          str += ` ${kortti(this.state.omakortti)} `
        else
          str += ` ${veikkaa(this.state.vastkortti)} `
        break;
      case "näytä":
        str += `<div>${this.state.muuttuja}</div>
        ${button(`app.pelaa("${this.state.muuttuja}")`, "jatka")} 
        ${molemmatKortit(this.state.omakortti, this.state.vastkortti)}`
        break;
      case "loppu":
        str += `<h1>peli päättyi.</h1>`
        str += (this.state.pelaaja.length > 0 ? `Voitit!` : `hävisit tällä kertaa`) 
        str += `
        ${button(`app.fetchTopPackages()`, "uusi peli")} 
        </div>`
        break;
    }
    if (this.state.tila === "loppu") console.log("str:", str)

    return str;
  }
}

// Moduulitiedoston sisällä muuttujat eivät ole globaaleja. Asetetaan globaali
// `app`-muuttuja, jotta HTML-koodista voidaan kutsua sen metodeja.
global.app = new App(document.getElementById('root'));


/*
Pelin säännöt
.Kortit (/api/top-packages.json-tiedostossa oleva taulukko) sekoitetaan ja 
jaetaan 2 pakkaan
.Pelaajalle näytetään oman pakan ylin kortti
.Pelaajan tehtävä on veikata kortista tietoa, joka on parempi kuin vastapelaajan (tietovastusen) kortissa
.Suurempi arvo on parempi näissä kentissä
..dependents
..downloadsLastMonth
..maintenance
..popularity
..quality
..releases

.Pienempi arvo on parempi näissä kentissä
..dependencies
..openIssues
..openPullRequests

Kun pelaaja on klikkaa valitsemaansa tietoa
Jos arvot ovat yhtäsuuret
Näytetään ilmoitus
Pelaaja veikkaa uudelleen

Jos arvot ovat erisuuret
 Ohjelma näyttää molemmat kortit, kumpi pelaaja voitti kierroksen ja “Jatka”- / “Aloita alusta”-painikkeen

Kun pelaaja klikkaa “Jatka”-painiketta, molemmat kortit menevät voittaneen pelaajan pakan pohjalle

Jos molemmilla pelaajilla on kortteja jäljellä, pelataan uusi kierros

Peli päättyy kun toiselta pelaajalta loppuvat kortit
*/