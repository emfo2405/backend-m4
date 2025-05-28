## Moment 4 
Jag har skapat ett API för att kunna hantera inloggning och validering av inloggningsuppgifter.

### Anslutning till API
Inställningar för att ansluta till API finns i .env-sample-filen där användarnamn, lösenord och host ska fyllas i. 

### Installera databas
För att komma igång med installationen av databasen klonas filerna ner och de paket som behövs för att köra koden installeras med npm install. Sedan är det första steget för att initiera databasen att köra install.js som skapar en tabell som ser ut så här:
| Tabellnamn  | id | username | password | email | account_created |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| users  | SERIAL PRIMARY KEY  | VARCHAR(255) NOT NULL  | VARCHAR(255) NOT NULL  | VARCHAR(100) NOT NULL  | DATE DEFAULT CURRENT_TIMESTAMP  |

### Hur man använder API:et 
Det finns olika sätt att använda API:et för att nå det, nedan finns en tabell över vilka metoder som kan användas och vad de innebär. 

| Metod  | Ändpunkt | Beskrivning | 
| ------------- | ------------- | ------------- |
| GET  | /api/register  | Hämtar alla inlägg i databasen |
| GET  | /api/secret  | Låter en användare med giltig token se hemligt innehåll på sidan |
| POST  | /api/register  | Lägger till en ny användare i databasen |
| POST  | /api/login  | Loggar in en användare som är sparad i databasen och sparar även dess token |


Ett objekt som lägger till korrekt information om användare är uppbyggt så här:
```
{
  "username": "Användarnamn",
  "password": "Lösenord",
  "email": "epost@epost.se",
}
```
