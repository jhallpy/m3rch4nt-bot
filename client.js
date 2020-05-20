/*if (!fs.existsSync('./perks.json')){
    console.log('shit')
    let exec = require('child_process').exec;
    exec('node scraper.js',
    (error, stdout, stderr) =>{
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
        if (error !== null){
            console.log(`exec error ${error}`);
        }
    })*/
const ipcRenderer = require('electron').ipcRenderer;
const btnClick = document.getElementById('startstop');

btnClick.addEventListener('click', () =>{
    ipcRenderer.send('btnClick');
});
function change(){
    console.log($('#startstop').text());
    if($('#startstop').text()==="Start"){
        $('#startstop')
            .html('Stop')
            .addClass('btn-danger')
            .removeClass('btn-success')
            .prop('disabled', true);
        setTimeout(()=>{
            $('#startstop').prop('disabled', false);
        }, 5000);    
    }else{
        $('#startstop')
        .html('Start')
        .addClass('btn-success')
        .removeClass('btn-danger')
        .prop('disabled', true);
        setTimeout(()=>{
            $('#startstop').prop('disabled', false);
        }, 5000);      
    }
}