#!/usr/bin/env node
import minimist from 'minimist';
import express from 'express';
import roll from "./lib/roll.js";


const arg = minimist(process.argv.slice(2));
const app = express();
app.use(express.urlencoded({extended:true})); 
const port = arg.port || 5000;

//undedined 
app.get('*', (req,res) => { res.status(404).send('404 NOT FOUND').end(); });

//status 200
app.get('/app/', (req,res)=> {res.status(200).send('200 OK'); });

//defaut endpoint
app.get('/app/roll/', (req,res) => {res.setHeader('Content-Type', 'application/json');
	res.status(200).send(roll(6,2,1)); });

//sides endpoint
app.get('/app/roll/:sides/', (req, res) => { 
	res.setHeader('Content-Type','application/json');
	res.status(200).send(roll(parseInt(req.params.sides),2,1)); });

//sides & roll endpoint
app.get('/app/roll/:sides/:dice/', (req,res) => {
	res.setHeader('Content-Type', 'application/json');
	res.status(200).send(roll(parseInt(req.params.sides), parseInt(req.params.dice), 1)); });

//all specified endpoint
app.get('/app/roll/:sides/:dice/:rolls/', (req, res, next) => {
	res.setHeader('Content-Type', 'application/json'); 
	res.status(200).send(roll(parseInt(req.params.sides), parseInt(req.params.dice), parseInt(req.params.rolls))); });

//posting response
app.post('/app/roll/', (req, res) =>{
    const sides = parseInt(req.body.sides);
    const dice = parseInt(req.body.dice);
    const rolls = parseInt(req.body.rolls);
    res.send(roll(sides, dice, rolls));         })

app.listen(port);
