import { config } from 'dotenv';
config();

import {Flow} from 'genkit';
import {run} from 'genkit/dev';

const flows: Flow[] = [];

import('@/ai/flows/analyze-medical-report').then(module => {
  for (const key in module) {
    if (module[key] instanceof Flow) {
      flows.push(module[key]);
    }
  }
});

import('@/ai/flows/symptom-checker').then(module => {
  for (const key in module) {
    if (module[key] instanceof Flow) {
      flows.push(module[key]);
    }
  }
});

run({
  flows,
});
