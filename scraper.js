const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require ("fs");
const config = require('./resources/config.json');

async function main() {
    const result = await request.get("https://deadbydaylight.gamepedia.com/Perks");
    const $ = cheerio.load(result);
    const scrapedData = [];
    var i = 0;
    var fuck;
    let promise = new Promise((resolve, reject)=>{
        $("#mw-content-text > div > table > tbody > tr").each((index,element) =>{
            
            const tds = $(element).find("td");
            const ths = $(element).find("th");
            const img = $(element).find("img");
            
            const imgSrc = $(img[0]).attr('src');
            const name = $(ths[1]).text();
            const char = $(ths[2]).text();
            const des = $(tds[0]).text();
            if(name === "" || name === "Name" || char.includes("Killer") || char.includes("Survivors")){
                return true;
            }else if(name.includes("A Nurse's Calling")){
                const tableRow = {imgSrc, name, char, des};
                scrapedData.push(tableRow);
                fuck = i;
            }else{
                i++;
                const tableRow = {imgSrc, name, char, des};
                scrapedData.push(tableRow);
            }
    
    
        });
        resolve(scrapedData);
    });
    fs.writeFile('perks.json', JSON.stringify(scrapedData, null, 2), function(error){
        if(error){
            console.log('File Write: Error \n' + error);
        }else{
            console.log('File Write: Success')
        }
    });
    fs.readFile('./resources/config.json', function (err, data) {
        var json = JSON.parse(data);
        console.log(typeof json);
        json["survPerks"] = fuck;
        console.log(json);
        fs.writeFile("./resources/config.json", JSON.stringify(json, null, 2), function(err){
            if(err) console.log('File Config Write: Error \n' + err);
            else console.log('File Config Write: Success');
        })
    })
}
 
main();