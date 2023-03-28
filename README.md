
# Peer2Peer-Bot
De discord bot van Studievereniging Peer2Peer

[![main](https://github.com/Studievereniging-Peer2Peer/Discord-Bot/actions/workflows/main.yml/badge.svg)](https://github.com/Studievereniging-Peer2Peer/Discord-Bot/actions/workflows/main.yml)

## Aan de slag
```
cp .env.example .env
npm install
```

Dit project maakt gebruik van Prisma ORM om naar een Postgres database te lezen en te schrijven. Hiervoor is het noodzakelijk dat de connectiestring goed ingesteld staat zoals
`postgresql://root:postgres@localhost:5432/example`. Meer informatie vind je [hier](https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-details).

Om de bot te testen heb je een Discord Client ID en een Discord Token nodig. Daarover vind je [hier](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot) meer.

Vervolgens moet je de bot nog toevoegen aan een (test)server. Hoe je dat doet vind je [hier](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#bot-invite-links).

Aangezien de bot geschreven is in Typescript, moet de broncode eerst gebuild worden:
```
npm run build
```

De server kan gestart worden met het volgende commando
```
npm run start
```
