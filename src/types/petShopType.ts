import PetType from "./petType"

type PetshopType = {
    id:string;
    name:string;
    cnpj:string;
    pets:PetType[];
}

export default PetshopType;