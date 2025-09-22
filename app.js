#!/usr/bin/node
// made by WACIQ
// date 23 sep 2022
const process = require("process");
const fs = require('fs');
const prompt = require("prompt-sync")();

// typewriter effect
function typeWrite(text, delay = 30) {
    return new Promise(resolve => {
        let i = 0;
        function printChar() {
            if (i < text.length) {
                process.stdout.write(text[i]);
                i++;
                setTimeout(printChar, delay);
            } else {
                process.stdout.write("\n");
                resolve();
            }
        }
        printChar();
    });
}

// animated banner with moving "flashing" effect
async function banner() {
    const bannerLines = [
        "\033[31;1m███╗   ███╗██╗   ██╗██╗  ████████╗██╗   ██╗ ██████╗ ███╗   ███╗",
        "\033[31;1m████╗ ████║██║   ██║██║  ╚══██╔══╝██║   ██║██╔════╝ ████╗ ████║",
        "\033[36;1m██╔████╔██║██║   ██║██║     ██║   ██║   ██║██║  ███╗██╔████╔██║",
        "\033[36;1m██║╚██╔╝██║██║   ██║██║     ██║   ██║   ██║██║   ██║██║╚██╔╝██║",
        "\033[33;1m██║ ╚═╝ ██║╚██████╔╝███████╗██║   ╚██████╔╝╚██████╔╝██║ ╚═╝ ██║",
        "\033[33;1m╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝    ╚═════╝  ╚═════╝ ╚═╝     ╚═╝",
        "\033[35;1m                 WACIQ — Gmail Generator",
        "\033[0m"
    ];

    for (const line of bannerLines) {
        await typeWrite(line, 5);
        // flash effect: repeat printing the line quickly 2-3 times
        for (let i = 0; i < 2; i++) {
            process.stdout.write("\r" + line);
            await new Promise(r => setTimeout(r, 50));
            process.stdout.write("\r" + " ".repeat(line.length));
            await new Promise(r => setTimeout(r, 50));
        }
        process.stdout.write("\r" + line + "\n");
    }
}

// check valid gmail
function checkG(gmail){
    var regX = /[a-zA-Z0-9]+@gmail.com/gm;
    return !!gmail.match(regX);
}

// main
(async () => {
    await banner();
    let gMail = prompt("[~] Enter a gmail: " );
    if (checkG(gMail)){
        let count = prompt("[~] Enter the number of mails you want? ");
        const data = fs.readFileSync('./optn.txt', {encoding:'utf8', flag:'r'});
        var dataA = data.split("\n");

        if (dataA.length < count){
            console.log("\033[31;1mPlease provide a smaller number\033[0m");
        } else {
            for(let i = 0; i < count; i++){
                var gmailA = gMail.split("@");
                await typeWrite(`\033[32;1m${gmailA[0]}+${dataA[i].trim()}@${gmailA[1]}\033[0m`, 20);
            }
        }
    } else {
        console.log("\033[31;1mPlease provide a valid gmail\033[0m");
    }
})(); 