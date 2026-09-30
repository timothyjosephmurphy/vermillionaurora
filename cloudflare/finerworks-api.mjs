export const PRINT_PROVIDER='finerworks';

export function finerworksEnvironment(env,requireKeys=true) {
  if(requireKeys&&(!env.FINERWORKS_WEB_API_KEY||!env.FINERWORKS_APP_KEY))throw Error('FinerWorks credentials are not configured');
  return env.PAYPAL_MODE==='sandbox'?'test':'live';
}

export async function finerworksRequest(env,path,body,method='POST') {
  finerworksEnvironment(env,true);
  if(!/^\/v3\/[a-z0-9_]+$/.test(path))throw Error('Invalid FinerWorks API request');
  const response=await fetch(`https://v2.api.finerworks.com${path}`,{
    method,
    headers:{
      'Content-Type':'application/json',
      'web_api_key':env.FINERWORKS_WEB_API_KEY,
      'app_key':env.FINERWORKS_APP_KEY
    },
    signal:AbortSignal.timeout(20000),
    ...(body===undefined?{}:{body:JSON.stringify(body)})
  });
  let data;try{data=await response.json();}catch{throw Error('FinerWorks returned an unreadable response');}
  if(!response.ok||data?.status?.success===false){
    const error=Error(data?.status?.message||`FinerWorks request needs review (${response.status})`);
    error.status=response.status;error.referenceId=data?.status?.reference_id||null;throw error;
  }
  return data;
}
