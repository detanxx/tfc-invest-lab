import {build} from 'esbuild';
import {spawnSync} from 'node:child_process';
import {unlinkSync} from 'node:fs';
const target=new URL('./.lab-tests.cjs',import.meta.url).pathname;
await build({entryPoints:[new URL('./lab.test.ts',import.meta.url).pathname],bundle:true,platform:'node',format:'cjs',packages:'external',outfile:target});
const result=spawnSync(process.execPath,['--test',target],{stdio:'inherit'});unlinkSync(target);process.exitCode=result.status??1;
