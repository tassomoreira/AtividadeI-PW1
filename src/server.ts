import { NextFunction, Request, Response } from "express";
import { v4 as uuid } from "uuid";

import app from "./app";
import PetshopType from "./types/petShopType";

const PORT = 3000;

const petshops:PetshopType[] = [];

const isCnpjFormatValid = (cnpj:string) => {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/0001-\d{2}$/;
    return cnpjRegex.test(cnpj);
}

const isCnpjUnique = (cnpj: string) => {
    return petshops.every(petshop => petshop.cnpj !== cnpj);
};

const checkExistsUserAccount = (req:Request, res:Response, next:NextFunction) => {
    const { cnpj } = req.headers;

    if(cnpj === undefined) {
        res.status(400).json({ error: "Informe o CNPJ no header da requisição corretamente." });
        return;
    }

    if(!isCnpjFormatValid(cnpj as string)) {
        res.status(400).json({ error: "O CNPJ informado não está no formato correto (XX.XXX.XXX/0001-XX)." });
        return;
    }
    
    const petshop = petshops.find(petshop => petshop.cnpj === cnpj);

    if(petshop === undefined) {
        res.status(404).json({ error: "Não foi possível encontrar petshop informado." });
        return;
    }

    req.petshop = petshop;

    next;
}

app.post("/petshops", (req:Request, res:Response) => {
    try {
        const { name, cnpj } = req.body;

        if(!isCnpjFormatValid(cnpj)) {
            res.status(400).json({ error: "O CNPJ informado não está no formato correto (XX.XXX.XXX/0001-XX)." });
            return;
        }

        if(!isCnpjUnique(cnpj)) {
            res.status(400).json({ error: "Já existe um petshop com o CNPJ informado." });
            return;
        }

        const petshop:PetshopType = {
            id: uuid(),
            name,
            cnpj,
            pets: []
        }

        petshops.push(petshop);

        res.status(201).json(petshop);
    } catch(e) {
        console.error("Erro ao criar petshop: " + e);
    }
});

app.post("/pets", checkExistsUserAccount, (req:Request, res:Response) => {
    try {
        const { name, type, description, deadline_vaccination } = req.body;
        const petshop = req.petshop;

        

        

    } catch(e) {

    }
});

app.listen(PORT, () => console.log("Server running on port", PORT));