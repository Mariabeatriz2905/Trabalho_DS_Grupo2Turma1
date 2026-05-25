import { Router, Request, Response } from "express";
import { getObservationsFromFhir, getPatientFromFhir } from "../services/fhir.service";
import { autenticar } from "../middleware/auth.middleware";

const routes = Router();

routes.get("/observations", autenticar, async (req: Request, res: Response) => {
    try {
        const code = typeof req.query["code"] === "string" ? req.query["code"] : "8310-5";
        const patient = typeof req.query["patient"] === "string" ? req.query["patient"] : undefined;

        const observations = await getObservationsFromFhir(code, patient);
        res.json(observations);
    } catch (error: any) {
        res.status(500).json({ erro: "Erro ao consultar servidor FHIR.", detalhe: error.message });
    }
});

routes.get("/patients/:id", autenticar, async (req: Request, res: Response) => {
    try {
        const patient = await getPatientFromFhir(req.params["id"] as string);
        res.json(patient);
    } catch (error: any) {
        res.status(404).json({ erro: error.message });
    }
});

export default routes;