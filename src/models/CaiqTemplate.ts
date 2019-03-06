import { Domain } from "../models/Domain";

export interface CaiqTemplate {
    id: number;
    self: string;
    created_at: string;
    updated_at: string;
    template_version: string;
    specification_name: string;
    specification_url: string;
    domains: Domain[];
}