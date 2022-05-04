const express = require("express")

const app = express()
const port = process.env.PORT || 8080;

const db = require("./database.js")

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api", (req, res) => {
    console.log("Home")
    res.send("Welcome to our Cars API")
})

app.get("/api/records", (req, res, next) => {
    var sql = "select * from records"
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

app.get("/api/records/car_id/:car_id", (req, res, next) => {
    var sql = "select * from records where car_id = ?"
    var params = [req.params.car_id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": row
        })
    });
});
app.get("/api/records/make/:make", (req, res, next) => {
    var sql = "select * from records where make = ?"
    var params = [req.params.make]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.json({
            "message": "success",
            "data": rows
        })
    });
});

//GET METHODS
// app.get("/api/allCars", (req, res)=>{
//     console.log("ALL CARS")
//     res.send("Send all car data, owner info, all class results")
// })
// app.get("/api/records", (req, res)=>{
//     const name = req.query.name
//     res.send({
//         'name' : name
//     });
// });

// app.get("/api/modelName", (req, res)=>{

//     res.send("Send all cars of this model")
// })



// POST METHODS - Express Routes
// Add a single record into database

app.post("/api/records", (req, res, next) => {
    var errors = []
    if (!req.body.car_id) {
        errors.push("No car id specified");
    }    
    if (errors.length) {
        res.status(400).json({ "error": errors.join(",") });
        return;
    }
    var data = {
        timestamp : req.body.timestamp,
        email : req.body.email,
        name : req.body.name,
        year : req.body.year,
        make : req.body.make,
        model : req.body.model,
        car_id : req.body.car_id,
        judge_id : req.body.judge_id,
        judge_name : req.body.judge_name,
        racer_turbo : req.body.racer_turbo,
        racer_supercharged : req.body.racer_supercharged,
        racer_performance : req.body.racer_performance,
        racer_horsepower : req.body.racer_horsepower,
        car_overall : req.body.car_overall,
        engine_modifications : req.body.engine_modifications,
        engine_performance : req.body.engine_performance,
        engine_chrome : req.body.engine_chrome,
        engine_detailing : req.body.engine_detailing,
        engine_cleanliness : req.body.engine_cleanliness,
        body_frame_undercarriage : req.body.body_frame_undercarriage,
        body_frame_suspension : req.body.body_frame_suspension,
        body_frame_chrome : req.body.body_frame_chrome,
        body_frame_detailing : req.body.body_frame_detailing,
        body_frame_cleanliness : req.body.body_frame_cleanliness,
        mods_paint : req.body.mods_paint,
        mods_body : req.body.mods_body,
        mods_wrap : req.body.mods_wrap,
        mods_rims : req.body.mods_rims,
        mods_interior : req.body.mods_interior,
        mods_other : req.body.mods_other,
        mods_ice : req.body.mods_ice,
        mods_aftermarket : req.body.mods_aftermarket,
        mods_wip : req.body.mods_wip,
        mods_overall : req.body.mods_overall
    }
    var sql = 'INSERT INTO records (Timestamp,Email,Name,Year,Make,Model,Car_ID,Judge_ID,Judge_Name,Racer_Turbo,Racer_Supercharged,Racer_Performance,Racer_Horsepower,Car_Overall,Engine_Modifications,Engine_Performance,Engine_Chrome,Engine_Detailing,Engine_Cleanliness,Body_Frame_Undercarriage,Body_Frame_Suspension,Body_Frame_Chrome,Body_Frame_Detailing,Body_Frame_Cleanliness,Mods_Paint,Mods_Body,Mods_Wrap,Mods_Rims,Mods_Interior,Mods_Other,Mods_ICE,Mods_Aftermarket,Mods_WIP,Mods_Overall) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    var params = [data.timestamp,data.email,data.name,data.year,data.make,data.model,data.car_id,data.judge_id,data.judge_name,data.racer_turbo,data.racer_supercharged,data.racer_performance,data.racer_horsepower,data.car_overall,data.engine_modifications,data.engine_performance,data.engine_chrome,data.engine_detailing,data.engine_cleanliness,data.body_frame_undercarriage,data.body_frame_suspension,data.body_frame_chrome,data.body_frame_detailing,data.body_frame_cleanliness,data.mods_paint,data.mods_body,data.mods_wrap,data.mods_rims,data.mods_interior,data.mods_other,data.mods_ice,data.mods_aftermarket,data.mods_wip,data.mods_overall]
    db.run(sql, params, function (err, result) {
        if (err) {
            res.status(400).json({ "error": err.message })
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id": this.lastID
        })
    });
})
app.patch("/api/records/:car_id", (req, res, next) => {
    var data = {
        timestamp : req.body.timestamp,
        email : req.body.email,
        name : req.body.name,
        year : req.body.year,
        make : req.body.make,
        model : req.body.model,
        car_id : req.body.car_id,
        judge_id : req.body.judge_id,
        judge_name : req.body.judge_name,
        racer_turbo : req.body.racer_turbo,
        racer_supercharged : req.body.racer_supercharged,
        racer_performance : req.body.racer_performance,
        racer_horsepower : req.body.racer_horsepower,
        car_overall : req.body.car_overall,
        engine_modifications : req.body.engine_modifications,
        engine_performance : req.body.engine_performance,
        engine_chrome : req.body.engine_chrome,
        engine_detailing : req.body.engine_detailing,
        engine_cleanliness : req.body.engine_cleanliness,
        body_frame_undercarriage : req.body.body_frame_undercarriage,
        body_frame_suspension : req.body.body_frame_suspension,
        body_frame_chrome : req.body.body_frame_chrome,
        body_frame_detailing : req.body.body_frame_detailing,
        body_frame_cleanliness : req.body.body_frame_cleanliness,
        mods_paint : req.body.mods_paint,
        mods_body : req.body.mods_body,
        mods_wrap : req.body.mods_wrap,
        mods_rims : req.body.mods_rims,
        mods_interior : req.body.mods_interior,
        mods_other : req.body.mods_other,
        mods_ice : req.body.mods_ice,
        mods_aftermarket : req.body.mods_aftermarket,
        mods_wip : req.body.mods_wip,
        mods_overall : req.body.mods_overall
    }
    db.run(
        `UPDATE records set 
           Timestamp = COALESCE(?,timestamp), 
           Email = COALESCE(?,email), 
           Name = COALESCE(?,name),  
           Year = COALESCE(?,year), 
           Make = COALESCE(?,make), 
           Model = COALESCE(?,model), 
           Car_ID = COALESCE(?,car_id), 
           Judge_ID = COALESCE(?,judge_id), 
           Judge_Name = COALESCE(?,judge_name), 
           Racer_Turbo = COALESCE(?,racer_turbo), 
           Racer_Supercharged = COALESCE(?,racer_supercharged), 
           Racer_Performance = COALESCE(?,racer_performance), 
           Racer_Horsepower = COALESCE(?,racer_horsepower), 
           Car_Overall = COALESCE(?,car_overall), 
           Engine_Modifications = COALESCE(?,engine_modifications), 
           Engine_Performance = COALESCE(?,engine_performance), 
           Engine_Chrome = COALESCE(?,engine_chrome), 
           Engine_Detailing = COALESCE(?,engine_detailing), 
           Engine_Cleanliness = COALESCE(?,engine_cleanliness),  
           Body_Frame_Undercarriage = COALESCE(?,body_frame_undercarriage),  
           Body_Frame_Suspension = COALESCE(?,body_frame_suspension), 
           Body_Frame_Chrome = COALESCE(?,body_frame_chrome), 
           Body_Frame_Detailing = COALESCE(?,body_frame_detailing),  
           Body_Frame_Cleanliness = COALESCE(?,body_frame_cleanliness),  
           Mods_Paint = COALESCE(?,mods_paint), 
           Mods_Body = COALESCE(?,mods_body),  
           Mods_Wrap = COALESCE(?,mods_wrap), 
           Mods_Rims = COALESCE(?,mods_rims), 
           Mods_Interior = COALESCE(?,mods_interior), 
           Mods_Other = COALESCE(?,mods_other), 
           Mods_ICE = COALESCE(?,mods_ice), 
           Mods_Aftermarket = COALESCE(?,mods_aftermarket), 
           Mods_WIP = COALESCE(?,mods_wip), 
           Mods_Overall = COALESCE(?,mods_overall)
           WHERE Car_ID = ?`,
           [data.timestamp,data.email,data.name,data.year,data.make,data.model,data.car_id,data.judge_id,data.judge_name,data.racer_turbo,data.racer_supercharged,data.racer_performance,data.racer_horsepower,data.car_overall,data.engine_modifications,data.engine_performance,data.engine_chrome,data.engine_detailing,data.engine_cleanliness,data.body_frame_undercarriage,data.body_frame_suspension,data.body_frame_chrome,data.body_frame_detailing,data.body_frame_cleanliness,data.mods_paint,data.mods_body,data.mods_wrap,data.mods_rims,data.mods_interior,data.mods_other,data.mods_ice,data.mods_aftermarket,data.mods_wip,data.mods_overall, req.params.car_id],
           function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                // changes: this.changes
            })
    });
})





app.post("/api/records111", (req, res) => {
    const email = req.query.email
    const name = req.query.name
    const year = req.query.year
    const make = req.query.make
    const model = req.query.model
    const car_id = req.query.car_id
    const judge_id = req.query.judge_id
    const judge_name = req.query.judge_name
    const racer_turbo = req.query.racer_turbo
    const racer_supercharged = req.query.racer_supercharged
    const racer_performance = req.query.racer_performance
    const racer_horsepower = req.query.racer_horsepower
    const car_overall = req.query.car_overall
    const engine_modifications = req.query.engine_modifications
    const engine_performance = req.query.engine_performance
    const engine_chrome = req.query.engine_chrome
    const engine_detailing = req.query.engine_detailing
    const engine_cleanliness = req.query.engine_cleanliness
    const body_frame_undercarriage = req.query.body_frame_undercarriage
    const body_frame_suspension = req.query.body_frame_suspension
    const body_frame_chrome = req.query.body_frame_chrome
    const body_frame_detailing = req.query.body_frame_detailing
    const body_frame_cleanliness = req.query.body_frame_cleanliness
    const mods_paint = req.query.mods_paint
    const mods_body = req.query.mods_body
    const mods_wrap = req.query.mods_wrap
    const mods_rims = req.query.mods_rims
    const mods_interior = req.query.mods_interior
    const mods_other = req.query.mods_other
    const mods_ice = req.query.mods_ice
    const mods_aftermarket = req.query.mods_aftermarket
    const mods_wip = req.query.mods_wip
    const mods_overall = req.query.mods_overall

    res.send({
        'email': email,
        'name': name,
        'year': year,
        'make': make,
        'model': model,
        'car_id': car_id,
        'judge_id': judge_id,
        'judge_name': judge_name,
        'Racer_turbo': racer_turbo,
        'Racer_supercharged': racer_supercharged,
        'Racer_performance': racer_performance,
        'Racer_horsepower': racer_horsepower,
        'Car_overall': car_overall,
        'Engine_modifications': engine_modifications,
        'Engine_performance': engine_performance,
        'Engine_chrome': engine_chrome,
        'Engine_detailing': engine_detailing,
        'engine_cleanliness': engine_cleanliness,
        'Body_Frame_undercarriage': body_frame_undercarriage,
        'Body_Frame_suspension': body_frame_suspension,
        'Body_Frame_chrome': body_frame_chrome,
        'Body_Frame_detailing': body_frame_detailing,
        'Body_Frame_cleanliness': body_frame_cleanliness,
        'Mods_paint': mods_paint,
        'Mods_body': mods_body,
        'Mods_wrap': mods_wrap,
        'Mods_rims': mods_rims,
        'Mods_interior': mods_interior,
        'Mods_other': mods_other,
        'Mods_ice': mods_ice,
        'Mods_aftermarket': mods_aftermarket,
        'Mods_wip': mods_wip,
        'Mods_overall': mods_overall

    });
});


// Add a multiple records into database

// PUT -> Update a existing record

app.listen(port)
console.log('Server started at http://localhost:' + port);
