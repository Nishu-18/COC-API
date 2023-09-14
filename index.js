import express from 'express';
import axios from 'axios';
import ejs from 'ejs';
import bodyParser from 'body-parser';
const app = express();
app.set("view engine", 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
const yourBearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImMyMjg3NjdjLWRhMGEtNGYxNC1hYjlhLTcwNjE0MDljODZlYiIsImlhdCI6MTY5MzkwMjI2NSwic3ViIjoiZGV2ZWxvcGVyLzIyODI1NmMwLTE5NjYtNDFlNy00NTZjLWEwOTE2NjkxNzMzYyIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjQ5LjM2LjE4My4yNiJdLCJ0eXBlIjoiY2xpZW50In1dfQ.-bagTcZh32TF5Mb1ri3wo38W7jl4iPDTdUT-twjUgeomaGjlLUhtEi_Gae2H4hXGxGWA7D2rXmc-fm_q5ZDIog";
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