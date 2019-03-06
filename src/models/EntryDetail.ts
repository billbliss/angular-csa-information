import { RegistryEntry } from "../models/RegistryEntry";

export interface EntryDetail {
    id: number;
    name: string;
    self: string;
    description: string;
    organization_description:string;
    created_at: string;
    updated_at: string;
    registry_entries: RegistryEntry[];
}