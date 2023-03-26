import jsQR from "jsqr";
import {Html5Qrcode} from "html5-qrcode"
import { useCallback } from "react";

export function turnOnCamera(){
    document.getElementById("cameraButton").click()
}

export function turnOffCamera(){

}

export function renderExpense(e,callback){
   let code = ""
    console.log(e.target.files[0])
    let width = 0 , height = 0
    const img = new Image()
    const url = URL.createObjectURL(e.target.files[0])
    img.onload = function(){
        const nc = document.createElement("canvas");
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext('2d')
        const nctx = nc.getContext('2d')

        canvas.width = 640; // destination canvas size
        canvas.height = canvas.width * this.height / this.width;
        let cur = {
            width: Math.floor(this.width * 0.5),
            height: Math.floor(this.height * 0.5)
          }

          nc.width = cur.width;
          nc.height = cur.height;

          nctx.drawImage( img, 0, 0, cur.width, cur.height ); 

        while(cur.width *0.5 > 640){
            cur = {
                width: Math.floor(cur.width * 0.5),
                height: Math.floor(cur.height * 0.5)
              };
              nctx.drawImage(nc, 0, 0, cur.width * 2, cur.height * 2, 0, 0, cur.width, cur.height);
        }
        ctx.drawImage(nc, 0, 0, cur.width, cur.height, 0, 0, canvas.width, canvas.height);
        const imgdata = ctx.getImageData(0,0, canvas.width, canvas.height);
        code = jsQR(imgdata.data, canvas.width, canvas.height);
        URL.revokeObjectURL(url)
        console.log("fuck")
        //document.getElementsByClassName("main")[0].appendChild(canvas)

        callback(decodeQR(code?.data || ""))
    }
    e.target.value = null
    img.src = url
}

function decodeQR(code){
    try{
        const item = {}
        const arr = code.split("\n")
        item.company = arr[0]
        item.address = arr[1]
        item.vat = arr[2]
        item.date = arr[3]
        item.total = arr[4]
        item.items = []
        let a = 0
        for(let i=5;i<arr.length;i=i+2){
            item.items[a] = {}
            item.items[a].name = arr[i]
            const cost = arr[i+1].split(" ")
            item.items[a].quantity = cost[0] 
            item.items[a].price = cost[1]
            item.items[a].vat = cost[2] || 0
            a++
        }
        return item
    }catch(e){
        console.log(e)
        return {}
    }
}