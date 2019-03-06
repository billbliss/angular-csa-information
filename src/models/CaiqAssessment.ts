import { Response } from "../models/Response";

export interface CaiqAssessment {
    id: number;
    self: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
    template_url: string;
    responses: Response[];
}