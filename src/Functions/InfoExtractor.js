import {createWorker} from 'tesseract.js';

export function turnOnCamera(){
    document.getElementById("cameraButton").click()
}

export function turnOffCamera(){

}

export function renderExpense(target){
    
    if (target.files) {
        if (target.files.length !== 0) {
            console.log("add")
            const file = target.files[0];
            const image = URL.createObjectURL(file);

            (async () => {
            const worker = await createWorker({
                logger: m => console.log(m), // Add logger here
              });
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const data = await worker.recognize(image);
            console.log(data);
            await worker.terminate();
            })();
        }
    }
}