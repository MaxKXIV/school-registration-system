import * as fs from 'fs';
import {parse} from 'csv-parse';
import sql from 'mssql';
import dotenv from 'dotenv';
dotenv.config()

const names=[];
const file = './name_dataset/CA_200000.csv';
const parser = parse({delimiter:','});

async function connect(){
    const config = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_NAME,
        options:{
            encrypt: false,
            trustServerCertificate: true
        }
    };
    try {
        await sql.connect(config);
        const result = await sql.query`select * from students`
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}

//Do this when something readable is passed into the parser
parser.on('readable',()=>{
    let name;
    const regex = /^[a-zA-Z]+$/;//true on only aA-zZ charaters
    //pushes name to the list of names
    while((name = parser.read())!==null){
        //removes all names that are not alphabetic
        if(!regex.test(name[0])||!regex.test(name[1])){
            continue;
        }
        //removes all names without a gender
        if(name[2]!==''){
            //Adds the active status to the name
            const nameWithActive = name.slice(0,3);
            nameWithActive.push(0);
            names.push(nameWithActive);
        }
    }
});

//Do this when parser errors
parser.on('error',(error)=>{
    console.log(error);
});
//Do this when parser finishes
parser.on('end',()=>{
    console.log(names);
});
//Creates a strem to pipe into the parser 
// fs.createReadStream(file).pipe(parser);

connect();