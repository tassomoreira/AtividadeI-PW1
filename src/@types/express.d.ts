import PetshopType from "../types/petShopType";

declare global {
    namespace Express {
        interface Request {
        petshop?:PetshopType;
        }
    }
}