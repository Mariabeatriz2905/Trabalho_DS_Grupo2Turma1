import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const JWT_SECRET = "piac_secret_2026";

export interface AuthRequest extends Request {
    utilizador?: {
        id: number;
        email: string;
        perfil: "utente" | "medico" | "administrador";
    };
}

export function autenticar(req: AuthRequest, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ erro: "Token de autenticação não fornecido." });
        return;
    }

    const token = authHeader.split(" ")[1]!;

    try {
        const payload = jwt.verify(token, JWT_SECRET) as any as{
            id: number;
            email: string;
            perfil: "utente" | "medico" | "administrador";
        };
        req.utilizador = payload;
        next();
    } catch {
        res.status(401).json({ erro: "Token inválido ou expirado." });
    }
}

export function autorizar(...perfis: string[]) {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.utilizador || !perfis.includes(req.utilizador.perfil)) {
            res.status(403).json({ erro: "Acesso proibido. Não tem permissão para este recurso." });
            return;
        }
        next();
    };
}