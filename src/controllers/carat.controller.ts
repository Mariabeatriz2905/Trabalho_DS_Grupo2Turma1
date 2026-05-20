import { Request, Response } from "express";
import { CaratService } from "../services/carat.services";

export class CaratController {
    private service = new CaratService();

    // Têm de ser funções normais (ou do tipo async) que recebem req e res
    async criar(req: Request, res: Response): Promise<any> {
        // o teu código atual...
    }

    async listar(req: Request, res: Response): Promise<any> {
        // o teu código atual...
    }
}