import { Control } from "../models/Control";

export interface Domain {
    domain_id: string;
    title: string;
    controls: Control[];
}