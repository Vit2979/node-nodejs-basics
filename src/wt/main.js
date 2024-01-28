import * as os from 'os';
import { Worker } from 'worker_threads';

export const performCalculations = async () => {
  const CPUCores = os.cpus();
  const promiseArray = CPUCores.map((core, index) => {
    let obj = {
      status: '',
      data: null,
    };
    
    const worker = new Worker('./worker.js', {
      workerData: 10 + index,
    });
    
    return new Promise(resolve => {
      worker.on('message', msg => {
        obj.status = 'resolved';
        obj.data = msg;
        resolve(obj);
      });
      
      worker.on('error', err => {
        obj.status = 'error';
        resolve(obj);
      });
    });
  });

  const outputArray = await Promise.all(promiseArray);
  console.log(outputArray);
};

performCalculations();