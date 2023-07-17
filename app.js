const express=require("express");
const  bodyParser =require("body-parser");
const https=require("https");
const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.post("/",(req,res)=>
{
    let firstname=req.body.first_name;
    let lastname=req.body.last_name;
    let email=req.body.email;
   
    let data={
        members: [
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                FNAME:firstname,
                LNAME:lastname
                }
            }
        ]
    }

    const options={
        method:"POST",
        auth:"aswath:a3d9a2c05813ab80dbf83a87cfd78a0a-us21"
    }
        
    let jsondata=JSON.stringify(data);
    const url='https://us21.api.mailchimp.com/3.0/lists/0e9d79ee98'; 

    const request=https.request(url,options,function(response){
        if(response.statusCode==200)
        {
            res.sendFile(__dirname+"/sucess.html");
        }
        else
             res.sendFile(__dirname+"/failure.html")
    })

  

request.write(jsondata);
request.end();


})


app.get("/",function(req,res)
{
    res.sendFile(__dirname+"/signup.html");
})

app.post("/failure", function(req,res)
{
    res.redirect("/");
})


app.listen(process.env.PORT||3000,function(){
    console.log("the port 3000 is activated");
})