import { Question } from '../models/Question';

export interface Control {
    control_id: string;
    title: string; 
    description: string; 
    questions: Question[];
}