import { Entry } from "../models/Entry"; 

export interface Registry {
    self: string; 
    cloud_services: Entry[];
}