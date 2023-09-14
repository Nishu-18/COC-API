const dotenv = require('dotenv').config();
const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const yourBearerToken = process.env.BEARER_TOKEN;
const config = {
    headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.get("/", function(req, res) {
    res.render("index");

})
app.post("/result", async function(req, res) {
        const ID = req.body.id

        const result = await axios.get(`https://api.clashofclans.com/v1/players/%23${ID}`, config);
        // console.log(result.data.name);
        // console.log(result.data);
        if (result.data.league === undefined && result.data.clan === undefined) {
            console.log("Player is not in a league and clan");
            res.render("result", {
                name: result.data.name,
                tag: result.data.tag,
                clan_name: "Player is not in a clan",
                thLevel: result.data.townHallLevel,
                league: "Player is not placed in a league",
                trophies: result.data.trophies,
                level: result.data.expLevel,
                capital: result.data.clanCapitalContributions,
                attack: result.data.attackWins,
                defense: result.data.defenseWins,
                war: result.data.warStars,
                dg: result.data.donations,
                dr: result.data.donationsReceived
            })
            return;

        }
        if (result.data.clan === undefined) {

            console.log("player is not in a clan");



            res.render("result", {
                name: result.data.name,
                tag: result.data.tag,
                clan_name: "Player is not in a clan",
                thLevel: result.data.townHallLevel,
                league_img: result.data.league.iconUrls.small,
                league: result.data.league.name,
                trophies: result.data.trophies,
                level: result.data.expLevel,
                capital: result.data.clanCapitalContributions,
                attack: result.data.attackWins,
                defense: result.data.defenseWins,
                war: result.data.warStars,
                dg: result.data.donations,
                dr: result.data.donationsReceived

            })
            return;



        }
        if (result.data.league === undefined) {
            console.log("Player is not in a league");
            res.render("result", {
                name: result.data.name,
                tag: result.data.tag,
                clan_name: result.data.clan.name,
                clan_logo: result.data.clan.badgeUrls.small,
                thLevel: result.data.townHallLevel,
                clanTag: result.data.clan.tag,
                league: "Player is not placed in any league",
                trophies: result.data.trophies,
                level: result.data.expLevel,
                capital: result.data.clanCapitalContributions,
                attack: result.data.attackWins,
                defense: result.data.defenseWins,
                war: result.data.warStars,
                dg: result.data.donations,
                dr: result.data.donationsReceived
            })
            return;

        } else {
            console.log(result.data.clan);
            console.log(result.data.league);
            res.render("result", {
                name: result.data.name,
                tag: result.data.tag,
                clan_name: result.data.clan.name,
                clan_logo: result.data.clan.badgeUrls.small,
                thLevel: result.data.townHallLevel,
                clanTag: result.data.clan.tag,
                league_img: result.data.league.iconUrls.small,
                league: result.data.league.name,
                trophies: result.data.trophies,
                level: result.data.expLevel,
                capital: result.data.clanCapitalContributions,
                attack: result.data.attackWins,
                defense: result.data.defenseWins,
                war: result.data.warStars,
                dg: result.data.donations,
                dr: result.data.donationsReceived
            })
        }





    })
    //Nishu 9JC2JUP8U
    //ry22qjcr









app.listen("3000", function(req, res) {
    console.log("server is running on port 3000");
})