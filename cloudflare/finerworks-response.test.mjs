import {test} from 'node:test';
import assert from 'node:assert/strict';
import {finerworksFailureDetails} from './finerworks-response.mjs';
test('only approved diagnostic fields survive; keys and emails are redacted',()=>{
 const data={status:{success:false,status_code:400,reference_id:'test-reference',message:'No records, secret/key person@example.org',debug:{key:'secret/key'}},media_types:[],account:{private:true}};
 const result=finerworksFailureDetails('/v3/list_media_types',data,['secret/key']);
 assert.equal(result.providerStatusCode,400);assert.equal(result.providerSuccess,false);assert.equal(result.responseShape.media_types,'array:0');
 assert.equal(result.providerMessage,'No records, [redacted] [email redacted]');
 assert.doesNotMatch(JSON.stringify(result),/secret\/key|person@example|"debug"|"account"/);
});
test('missing, null and unexpected success values do not become successful',()=>{
 for(const data of [null,{},[],{status:null},{status:{success:'true'}}])assert.equal(finerworksFailureDetails('/v3/list_media_types',data).providerSuccess,null);
});
