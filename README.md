# FullStackOsa7
FullStack 2018 -MOOC-kurssin osan 7 tehtävien ratkaisut.

## Deployment internetiin

Deployasin sovelluksen internettiin. Laitoin backendin Herokuun, pyörii osoitteessa https://samuli-backend.herokuapp.com/

Fronttikoodin laitoin sen sijaan oman kotisivutilani alle osoitteeseen http://www.samulivirtanen.fi/bloglist . Ajattelin että olisi kiva että on suoraan omien sivujen alla jos haluaa jollekin esitellä. Jouduin tekemään tämän artikkelin mukaisia muutoksia koodiin: https://medium.com/@svinkle/how-to-deploy-a-react-app-to-a-subdirectory-f694d46427c1 ja tein noille muutoksille oman branchin. 

Sovellukseen voi kirjautua tunnuksilla *samuli / salainen*

### 7.3 yksittäisen käyttäjän näkymä osa, 2

*Merkkaa tämä tehtävä tehdyksi jos toteuttamasi yksittäisen käyttäjän näkymä toimii oikein myös siinä tilanteessa että menet urliin suoraan tai refreshaat selaimen ollessasi käyttäjän näkymässä.* 

Tämä ei nyt toimi netissä olevassa versiossa, koska serveri koettaa hakea uutta urlia. Teen varmaan jossain vaiheessa omat kotisivut jollekin modernimmalle palvelimelle, mutta nyt en käyttänyt enempää aikaa sen säätämiseen että urlit toimisivat reloadin kanssa. Lokaalisti buildattuna toimii kuitenkin juuri kuten tehtävänannossa pyydettiin, ja varmaan toimisi jos pistäisi herokuun myös frontin, esim siten miten kurssimateriaalissa neuvottiin.
